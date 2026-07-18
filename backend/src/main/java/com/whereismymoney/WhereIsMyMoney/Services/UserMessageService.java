package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Entities.UserMessage;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserMessageRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserRepo;

@Service
public class UserMessageService {

    private UserRepo userRepo;
    private UserMessageRepo userMessageRepo;

    UserMessageService(UserRepo userRepo, UserMessageRepo userMessageRepo) {
        this.userRepo = userRepo;
        this.userMessageRepo = userMessageRepo;
    }
    Logger logger=LoggerFactory.getLogger(UserMessageService.class);
    public ResponseEntity<?> getAllUserMessage(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user is missing");
        }

        String userEmail = authentication.getName();
        User currentUser = userRepo.findByEmail(userEmail);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
        }

        List<UserMessage> all = userMessageRepo.findByUser(currentUser);
        logger.info("usermessage======="+all.getFirst()+"===========");

        return ResponseEntity.ok(all);
    }

    public ResponseEntity<?> addUserMessage(Authentication authentication, UserMessage userMessage) {
        logger.info("addMessage======="+userMessage.getId()+"===========");
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user is missing");
        }

        String userEmail = authentication.getName();
        User currentUser = userRepo.findByEmail(userEmail);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
        }
        userMessage.setUser(currentUser);

        UserMessage userMessage2 = userMessageRepo.save(userMessage);
        
        return ResponseEntity.ok(userMessage2.builder()
                .id(userMessage2.getId())
                .message(userMessage2.getMessage())
                .date(userMessage2.getDate())
                .month(userMessage2.getMonth())
                .type(userMessage2.getType())
                .year(userMessage2.getYear())
                .build());

    }

}
