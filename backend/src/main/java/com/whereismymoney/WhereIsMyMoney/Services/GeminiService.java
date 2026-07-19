package com.whereismymoney.WhereIsMyMoney.Services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

        private final ChatClient chatClient;
        String[] category = new String[] {
                        "Food & Dining",
                        "Transportation & Fuel",
                        "Groceries",
                        "Rent & Mortgage",
                        "Utilities & Bills",
                        "Subscriptions & SaaS",
                        "Entertainment & Gaming",
                        "Shopping & Clothes",
                        "Medical & Healthcare",
                        "Insurance Payments",
                        "Monthly Salary",
                        "Freelance & Gigs",
                        "Investments & Dividends",
                        "Business Profits",
                        "Side Hustle & Sales"
        };

        GeminiService(ChatClient.Builder chatClientBuilder) {
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
        }

        public String getChatResponse(String userPrompt, String conversationId) {
                System.out.println("============ " + userPrompt + " [Session ID: " + conversationId + "]");
                String prompt = """
                                                        %s
                                                         convert it into json object like const newRecord = {
                                                              expense: number < 0 ? Math.abs(number) : 0,
                                                              income: number > 0 ? number : 0,
                                                              category:  {
                                                "Food & Dining",
                                                "Transportation & Fuel",
                                                "Groceries",
                                                "Rent & Mortgage",
                                                "Utilities & Bills",
                                                "Subscriptions & SaaS",
                                                "Entertainment & Gaming",
                                                "Shopping & Clothes",
                                                "Medical & Healthcare",
                                                "Insurance Payments",
                                                "Monthly Salary",
                                                "Freelance & Gigs",
                                                "Investments & Dividends",
                                                "Business Profits",
                                                "Side Hustle & Sales"
                                },
                                                              reason: cleanReason,
                                                              hashtags: hashtags && hashtags !== ""
                                                                  ? Array.isArray(hashtags)
                                                                    ? hashtags
                                                                    : [hashtags]
                                                                  : [],
                                                            }; and only give raw JSON object string back, do not include markdown backticks or any other text if any category not match craete new one category of that and store them .
                                                        """
                                .formatted(userPrompt, category);

                System.out.println(prompt);

                return this.chatClient.prompt()
                                .user(prompt)
                                .advisors(advisorSpec -> advisorSpec.param("chat_memory_conversation_id",
                                                conversationId))
                                .call()
                                .content();

        }

        public String analyzeExpenses(String expenseDataJson) {
                String analysisPrompt = "Analyze this monthly expense history and provide exactly 3 actionable saving tips: "
                                + expenseDataJson;
                return this.chatClient.prompt()
                                .user(analysisPrompt)
                                .call()
                                .content();
        }
}
