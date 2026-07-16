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
}
