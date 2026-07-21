package com.whereismymoney.WhereIsMyMoney.Controllers;


import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.Message;
import com.whereismymoney.WhereIsMyMoney.Services.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Allows your frontend app to connect without CORS errors
public class ChatController {

    private final GeminiService geminiService;

    ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> processChatMessage(@RequestBody Message request) {
        System.out.println(request.getId());
        System.out.println(request.getMessage());
        // Calls your GeminiService which handles memory and category checking
        String aiResponseJson = geminiService.getChatResponse(
            request.getMessage(), 
            request.getId()
        );
        
        // Returns the raw JSON string straight to the frontend
        return ResponseEntity.ok(aiResponseJson);
    }
}
