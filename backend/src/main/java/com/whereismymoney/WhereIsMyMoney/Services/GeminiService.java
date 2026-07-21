package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;

import org.jspecify.annotations.Nullable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whereismymoney.WhereIsMyMoney.Dto.UserDtos.RecordDto;
import com.whereismymoney.WhereIsMyMoney.Entities.Categories;
import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import com.whereismymoney.WhereIsMyMoney.Repositories.CategoryRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.RecordRepo;
import com.whereismymoney.WhereIsMyMoney.Services.tools.ExpenseTools;

@Service
public class GeminiService {

        private final ChatClient chatClient;
        private final ObjectMapper objectMapper;
        private final CategoryRepo categoryRepo;
        private final CatEgoryService catEgoryService;
        private final RecordRepo recordRepo;

        GeminiService(ChatClient.Builder chatClientBuilder, ObjectMapper objectMapper, CategoryRepo categoryRepo,
                        CatEgoryService catEgoryService, RecordRepo recordRepo, ExpenseTools expenseTools) {
                MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
                                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                                .maxMessages(10)
                                .build();
                this.chatClient = chatClientBuilder
                                .defaultSystem("""
                                                                                                             STRICT OPERATIONAL DIRECTIVES FOR MONEYBOT:
                                                                                                             1. IDENTITY: You are an elite personal finance AI agent named MoneyBot.
                                                                                                             2. COMMUNICATION STYLE: Speak in a natural, polite, and human-like conversational tone.
                                                                                                             3. BREVITY: Keep your responses highly practical, concise, and strictly under 3 sentences.
                                                                                                             4. FORMATTING RESTRICTION: Never output raw JSON configurations, structural code strings, or markdown backticks blocks (```) to the user unless they explicitly ask for code sample scripts.
                                                                                                             5. TOOL USAGE: When a user mentions a financial transaction, use your tool to persist it, then confirm the action in a simple conversational sentence.
                                                                                                             6.   FORMATTING RULES:
                                                                             - Never output walls of plain text or a single flat paragraph.
                                                                             - Always format items, transactions, or summaries into clean, scannable Markdown bulleted lists.
                                                                             - bold text using **text** for any number and category of records
                                                                             - End with a separate, short sentence offering a follow-up action.
                                                                                                              7. REDIRECTION RULE (CRITICAL OVERRIDE): If the user says they want to add a record manually, or explicitly asks to use the form/main page to enter data, you MUST immediately halt all other rules and return exactly this raw JSON block and absolutely nothing else:
                                                {"action": "REDIRECT_MAIN_PAGE"}
                                                Do not add conversational text, do not add markdown code fences, and do not ask any follow-up questions.
                                                                                                             """)
                                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                                .defaultTools(expenseTools)
                                .build();
                this.objectMapper = objectMapper;
                this.categoryRepo = categoryRepo;
                this.catEgoryService = catEgoryService;
                this.recordRepo = recordRepo;

        }

        public Record addRecord(String userPrompt, String conversationId) {
                List<String> allCategories = catEgoryService.getAllCategories();
                Record r = Record.builder()
                                .category("food")
                                .expense(0.0)
                                .income(0.0)
                                .reason("tea")
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
                        String prompt = userPrompt + "" + systemInstructions + "in this strucutre: " + recordString
                                        + "and use these categories" + catString;

                        @Nullable
                        RecordDto content = this.chatClient.prompt()
                                        .user(prompt)
                                        .advisors(spec -> spec.param("chat_memory_conversation_id", conversationId))
                                        .call()
                                        .entity(RecordDto.class);

                        Record record = new Record();
                        record.setCategory(content.getCategory());
                        record.setExpense(content.getExpense());
                        record.setReason(content.getReason());
                        record.setIncome(content.getIncome());
                        record.setType("record");
                        record.setHashtags(content.getHashTags());

                        System.out.println(content);

                        if (!allCategories.contains(record.getCategory())) {
                                Categories c = new Categories();
                                c.setCategory(record.getCategory());
                                categoryRepo.save(c);
                        }
                        return record;
                        // return "";

                } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        return null;
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

        public String getChatResponse(String message, String id) {

                System.out.println("inside service" + id);
                String cleanMessage = message.toLowerCase();
                String finalPrompt = message;

                if (cleanMessage.contains("records") || cleanMessage.contains("all") || cleanMessage.contains("list")) {

                        // Fetch the actual current records directly from your database repository
                        List<Record> trueDatabaseList = recordRepo.findAll();

                        // Construct a strict, unescapable context block containing real auto-increment
                        // IDs
                        StringBuilder databaseContext = new StringBuilder(
                                        "\n\nCRITICAL CONTEXT (REAL CURRENT DATABASE ROWS):\n");
                        if (trueDatabaseList.isEmpty()) {
                                databaseContext.append(
                                                "The database is currently completely empty. No records found.\n");
                        } else {
                                for (Record r : trueDatabaseList) {
                                        double amount = (r.getIncome() != null && r.getIncome() > 0) ? r.getIncome()
                                                        : (r.getExpense() != null ? r.getExpense() : 0.0);

                                        // Format forcing the absolute display of the primary key ID field
                                        databaseContext.append(String.format(
                                                        "- [ID: %d] Category: %s, Amount: ₹%.2f, Type: %s, Reason: %s, Date: 2026-07-21\n",
                                                        r.getId(), r.getCategory(), amount, r.getType(),
                                                        r.getReason()));
                                }
                        }

                        databaseContext.append(
                                        """
                                                        \nINSTRUCTION: Display ALL the database rows listed above to the user.
                                                        You MUST explicitly write out the text **ID: [number]** for every single item so the user knows its primary key.
                                                        Format as a clean, beautiful Markdown bulleted list.
                                                        """);

                        // Merge the user's request with the fresh database injection block
                        finalPrompt = message + databaseContext.toString();
                }
                String res = this.chatClient.prompt()
                                .user(finalPrompt)
                                .advisors(spec -> spec.param("chat_memory_conversation_id", id))
                                .call()
                                .content();
                System.out.println("res" + res);
                return res;
        }
}
