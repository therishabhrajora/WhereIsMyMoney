package com.whereismymoney.WhereIsMyMoney.Services.tools;

import com.whereismymoney.WhereIsMyMoney.Services.RecordService;
import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseTools {

    private final RecordService recordService;

    public ExpenseTools(RecordService recordService) {
        this.recordService = recordService;
    }

    // @Tool(description = "Saves or adds a new financial transaction record (expense or income) to the user's account.")
    // public ResponseEntity<?> saveRecord(Record record) {
    //     ResponseEntity<?> saved = recordService.addRecord(record);
    //     return saved;
    // }

    @Tool(description = "Updates an existing financial record details in the system using its unique record ID.")
    public String updateRecord(Long id, Record updatedRecord) {
        recordService.updateRecord(id, updatedRecord);
        return "Successfully updated record ID: " + id;
    }

    @Tool(description = "fetch all records of user")
    public ResponseEntity<?> getAllRecords(){
        return recordService.getAllRecords();
    }
    @Tool(description = "Deletes a financial record from the system permanently using its unique record ID.")
    public String deleteRecordById(Long id) {
        recordService.deleteRecordById(id);
        return "Successfully deleted record ID: " + id;
    }

    @Tool(description = "Retrieves a structural summary of all financial records, totals, and balances.")
    public Map<String, Object> getRecordSummary() {
        return recordService.getRecordSummary();
    }

    @Tool(description = "Retrieves the total amount spent within a specific financial category (e.g., 'Groceries', 'Food & Dining').")
    public Double getCategoryExpense(String category) {
        return recordService.getCategoryExpense(category);
    }

    @Tool(description = "Calculates the user's monthly savings based on total recorded income and total expenses.")
    public Double getMonthlySavings(String date) {
        return recordService.getMonthlySavings(date);
    }

    @Tool(description = "Predicts future expenses for upcoming months using historical transactional spending data.")
    public String predictFutureExpense() {
        return recordService.predictFutureExpense();
    }

    @Tool(description = "Fetches the absolute latest transactions added by the user (useful for answering questions like 'What did I buy today?').")
    public List<Record> getRecentTransactions(int limit) {
        return recordService.getRecentRecords(limit);
    }

    @Tool(description = "Retrieves all transaction logs recorded between a specific start and end date sequence.")
    public List<Record> getTransactionsByDateRange(String startDate, String endDate) {
        return recordService.getRecordsByDateRange(startDate, endDate);
    }

    @Tool(description = "Finds records by searching for keywords inside transaction descriptions (e.g., searching 'Netflix' or 'Uber').")
    public List<Record> searchRecordsByDescription(String keyword) {
        return recordService.searchRecords(keyword);
    }

    @Tool(description = "Clears all transaction data logs for the authenticated user account to start fresh.")
    public String clearAllUserRecords() {
        recordService.clearAllRecords();
        return "All records successfully wiped.";
    }
}
