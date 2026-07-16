package com.whereismymoney.WhereIsMyMoney.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whereismymoney.WhereIsMyMoney.Entities.UserMessage;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserMessageRepo;
import com.whereismymoney.WhereIsMyMoney.Services.UserMessageService;
import com.whereismymoney.WhereIsMyMoney.Services.UserService;

@RestController
@RequestMapping("/api/user-message")
public class UserMessageController {
    private final UserMessageService userMessageService;

    UserMessageController(UserMessageService userMessageService) {
        this.userMessageService = userMessageService;
    }

    @GetMapping()
    public ResponseEntity<?> getAllUserMessage(Authentication authentication) {
        ResponseEntity<?> allUserMessage = userMessageService.getAllUserMessage(authentication);
        return allUserMessage;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUserMessage(Authentication authentication, @RequestBody UserMessage userMessage) {
        System.out.println("==================================="+userMessage);
        ResponseEntity<?> userMessage2 = userMessageService.addUserMessage(authentication, userMessage);
        return userMessage2;
    }
}
