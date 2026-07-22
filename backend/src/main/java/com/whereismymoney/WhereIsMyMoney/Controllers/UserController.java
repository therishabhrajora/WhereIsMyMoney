package com.whereismymoney.WhereIsMyMoney.Controllers;

import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.AuthResponseDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserLoginDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserRegisterDto;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.UserResponseDto;
import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserRepo;
import com.whereismymoney.WhereIsMyMoney.Services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepo userRepo;
    private final UserService userService;

    UserController(UserService userService, UserRepo userRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserRegisterDto registerDto) {
        ResponseEntity<UserResponseDto> registerUser = userService.registerUser(registerDto);
        return registerUser;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable long id) {
        ResponseEntity<Object> responseDto = userService.getById(id);
        return responseDto;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto loginDto) {
        ResponseEntity<?> login = userService.login(loginDto);
        return login;
    }

    @PostMapping("/forgot-password")
    public void resetForgotPassword(@RequestBody Map<String, String> payload) {
        userService.resetPassword(payload);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> handlePasswordUpdate(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String newPassword = payload.get("newPassword");

        if (token == null || newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing token or password details."));
        }

        try {
            userService.updatePasswordUsingToken(token, newPassword.trim());
            return ResponseEntity.ok(Map.of("message", "Password updated successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
