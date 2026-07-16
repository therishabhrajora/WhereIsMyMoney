package com.whereismymoney.WhereIsMyMoney.Services;

import java.nio.file.attribute.UserPrincipal;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.AuthResponseDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserLoginDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserRegisterDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserResponseDto;
import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserRepo;
import com.whereismymoney.WhereIsMyMoney.config.JwtUtil;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    UserService(UserRepo userRepo, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    private long id = -1;

    public ResponseEntity<UserResponseDto> registerUser(UserRegisterDto registerDto) {
        // String id=UUID.randomUUID().toString();

        if (userRepo.findByEmail(registerDto.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = User.builder()
                .id(id++)
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

}
