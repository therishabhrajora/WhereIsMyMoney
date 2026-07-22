package com.whereismymoney.WhereIsMyMoney.Services;

import java.nio.file.attribute.UserPrincipal;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.AuthResponseDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserLoginDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserRegisterDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserResponseDto;
import com.whereismymoney.WhereIsMyMoney.Entities.PasswordResetToken;
import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Repositories.PasswordTokenRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserRepo;
import com.whereismymoney.WhereIsMyMoney.config.JwtUtil;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private PasswordTokenRepo tokenRepo;
    private EmailService emailService;

    UserService(UserRepo userRepo, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil, PasswordTokenRepo tokenRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.tokenRepo = tokenRepo;
        this.emailService = emailService;
    }

    Logger logger = LoggerFactory.getLogger(UserService.class);

    public ResponseEntity<UserResponseDto> registerUser(UserRegisterDto registerDto) {
        logger.info("====Register=======" + registerDto.getEmail() + "===========");
        // String id=UUID.randomUUID().toString();
        if (userRepo.findByEmail(registerDto.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = User.builder()
                .email(registerDto.getEmail())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .role(registerDto.getRole() != null ? registerDto.getRole() : "ROLE_USER")
                .build();
        User savedUser = userRepo.save(newUser);

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(savedUser.getId()) // Populated cleanly from the database sequence engine
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDto);
    }

    public ResponseEntity<Object> getById(long id2) {
        logger.info("==========" + id2 + "===========");

        Optional<User> userOptional = userRepo.findById(id2);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return ResponseEntity.ok(userResponseDto);

    }

    public ResponseEntity<?> login(UserLoginDto loginDto) {
        try {
            logger.info("====Login======" + loginDto.getEmail() + "===========");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepo.findByEmail(userDetails.getUsername());

            String token = jwtUtil.generateToken(userDetails);

            AuthResponseDto responsePayload = AuthResponseDto.builder()
                    .token(token)
                    .email(user.getEmail())
                    .role(user.getRole())
                    .build();

            return ResponseEntity.ok(responsePayload);

        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Authentication failed: Invalid email or password configuration.");
        }
    }

    @Transactional
    public String createResetPassswordLink(String email) {
        String cleanEmail = email.replace("\"", "").trim();
        User user = userRepo.findByEmail(cleanEmail);
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);   
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        tokenRepo.deleteByUser(user);
        tokenRepo.save(resetToken);
        // String frontendResetUrl = "http://localhost:5173/reset-password?token=" +
        // token;
        String frontendResetUrl = "https://moneyspendwise.netlify.app/reset-password?token=" + token;
        return frontendResetUrl;
    }

    public ResponseEntity<?> resetPassword(Map<String, String> payload) {

        String email = payload.get("email");
        User user = userRepo.findByEmail(email);

        if (user == null) {

            throw new IllegalArgumentException("No user found with email: " + email);
        }
        try {

            String resetLink = createResetPassswordLink(email);
            emailService.sendResetPasswordEmail(email, resetLink);
            logger.info("Reset password link generated for email {}: {}", email, resetLink);
            return ResponseEntity.ok().body(Map.of("message", "Reset link generate successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to securely deliver message text."));
        }

    }

    public ResponseEntity<?> updatePasswordUsingToken(String token, String rawNewPassword) {
        // 1. Look up the tracking token in your table repository
        Optional<PasswordResetToken> tokenOpt = tokenRepo.findByToken(token);

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("error", "Invalid or unrecognized recovery token link."));
        }

        PasswordResetToken resetToken = tokenOpt.get();

        // 2. Validate token timestamp expiration limit constraints
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            tokenRepo.delete(resetToken); // Clean up the stale token row
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("error", "This reset link has expired. Please request a new one."));
        }

        // 3. Extract the linked User and secure their new plain password using BCrypt
        User user = resetToken.getUser();
        String secureHashPassword = passwordEncoder.encode(rawNewPassword);
        user.setPassword(secureHashPassword);
        userRepo.save(user); // Commits the newly hashed string to the SQL profile entity

        // 4. Burn the token so it can never be used or hijacked again
        tokenRepo.delete(resetToken);

        return ResponseEntity.ok(java.util.Map.of("message", "Credentials successfully updated in database."));
    }

}
