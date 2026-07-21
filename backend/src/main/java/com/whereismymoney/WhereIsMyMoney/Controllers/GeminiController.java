package com.whereismymoney.WhereIsMyMoney.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.Message;
import com.whereismymoney.WhereIsMyMoney.Services.GeminiService;
import com.whereismymoney.WhereIsMyMoney.Entities.*;
import com.whereismymoney.WhereIsMyMoney.Entities.Record;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {
    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public Record chat(@RequestBody Message message) {
        System.out.println("Message: " + message.getMessage() + " | Session: " + message.getId());
        return geminiService.addRecord(message.getMessage(), message.getId());
    }

    @GetMapping("/analyze/{id}")
    public String analyzeData(@PathVariable String id) {
        return geminiService.analyzeExpenses(id);
    }
}
