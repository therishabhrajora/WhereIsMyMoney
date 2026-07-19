package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;

import org.jspecify.annotations.Nullable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whereismymoney.WhereIsMyMoney.Entities.Categories;
import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import com.whereismymoney.WhereIsMyMoney.Repositories.CategoryRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.RecordRepo;

@Service
public class GeminiService {

        private final ChatClient chatClient;
        private final ObjectMapper objectMapper;
        private final CategoryRepo categoryRepo;
        private final CatEgoryService catEgoryService;
        private final RecordRepo recordRepo;

        GeminiService(ChatClient.Builder chatClientBuilder, ObjectMapper objectMapper, CategoryRepo categoryRepo,
                        CatEgoryService catEgoryService, RecordRepo recordRepo) {
                MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
                                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                                .maxMessages(10)
                                .build();
                this.chatClient = chatClientBuilder
                                .defaultSystem("""
                                                You are an elite personal finance AI agent named MoneyBot.
                                                Help users manage budgets, analyze expenses, and provide smart saving tips.
                                                Keep your answers concise, practical, and under 3 sentences.
                                                """)
                                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                                .build();
                this.objectMapper = objectMapper;
                this.categoryRepo = categoryRepo;
                this.catEgoryService = catEgoryService;
                this.recordRepo = recordRepo;
        }

        public String getChatResponse(String userPrompt, String conversationId) {
                List<String> allCategories = catEgoryService.getAllCategories();
                Record record = new Record();
                Record r = record.builder()
                                .category("")
                                .expense(0.0)
                                .income(0.0)
                                .reason("")
                                .type("record")
                                .user(null)
                                .build();
                String recordString = null;
                try {
                        recordString = objectMapper.writeValueAsString(r);
                        String catString = objectMapper.writeValueAsString(allCategories);
                        String systemInstructions = """
                                        convert it into json object like given format and only give raw json object string back, do not inlcude markdown backticks or any other  text if any category not match in givern category list then create new one category of that and store them.
                                        """;
                        String prompt = userPrompt + " " + systemInstructions + " " + recordString + " " + catString;

                        @Nullable
                        String content = this.chatClient.prompt()
                                        .user(prompt)
                                        .advisors(advisorSpec -> advisorSpec.param("chat_memory_conversation_id",
                                                        conversationId))
                                        .call()
                                        .content();

                        JsonNode node = objectMapper.readTree(content);
                        String category = node.get("category").asText();
                        String s = new String(category);

                        if (!allCategories.contains(s)) {
                                Categories c = new Categories();
                                c.setCategory(category);
                                categoryRepo.save(c);
                        }

                        return content;

                } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        return "Error coccured";
                }

        }

        public String analyzeExpenses(String conversationId) {
                List<Record> allRecord = recordRepo.findAll();
                String expenseDataJson = null;
                try {
                        expenseDataJson = objectMapper.writeValueAsString(allRecord);
                } catch (JsonProcessingException e) {
                        e.printStackTrace();
                }
                String analysisPrompt = "Analyze this monthly expense history and provide exactly 3 actionable saving tips: "
                                + expenseDataJson;
                return this.chatClient.prompt()
                                .user(analysisPrompt)
                                .advisors(advisorSpec -> advisorSpec.param("chat_memory_conversation_id",
                                                conversationId))
                                .call()
                                .content();
        }
}
