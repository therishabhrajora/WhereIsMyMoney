package com.whereismymoney.WhereIsMyMoney.Services;

import java.lang.System.LoggerFinder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.DoubleStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Entities.UserMessage;
import com.whereismymoney.WhereIsMyMoney.Repositories.RecordRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserMessageRepo;
import com.whereismymoney.WhereIsMyMoney.Repositories.UserRepo;

@Service
public class RecordService {
    private final RecordRepo recordRepo;
    private final UserRepo userRepo;
    private final UserMessageRepo userMessageRepo;

    // Constructor Injection
    public RecordService(RecordRepo recordRepo, UserRepo userRepo, UserMessageRepo userMessageRepo) {
        this.recordRepo = recordRepo;
        this.userRepo = userRepo;
        this.userMessageRepo = userMessageRepo;
    }

    Logger logger = LoggerFactory.getLogger(RecordService.class);

    public ResponseEntity<?> getAllRecords() {

        String userEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        if (userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is missing");
        }
        User currentUser = userRepo.findByEmail(userEmail);

        List<Record> records = recordRepo.findByUser(currentUser);
        List<UserMessage> userMessages = userMessageRepo.findByUser(currentUser);

        List<Object> all = new ArrayList<>();
        all.addAll(records);
        all.addAll(userMessages);

        all.sort((obj1, obj2) -> {
            Long time1 = (obj1 instanceof Record) ? ((Record) obj1).getId() : ((UserMessage) obj1).getId();
            Long time2 = (obj2 instanceof Record) ? ((Record) obj2).getId() : ((UserMessage) obj2).getId();
            return time1.compareTo(time2);
        });
        // logger.info("=========="+"GetRecords"+all.getFirst()+"===========");

        return ResponseEntity.ok(all);
    }

    public ResponseEntity<?> addRecord(Record record) {
        logger.info("addrecord===" + record.getId() + "===========");

        String userEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        System.out.println("email=====" + userEmail);
        if (userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is missing");
        }

        User currentUser = userRepo.findByEmail(userEmail);
        System.out.println("email=====" + userEmail);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
        }
        record.setUser(currentUser);
        System.out.println(record);
        Record savedRecord = recordRepo.save(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    public ResponseEntity<Record> updateRecord(Long id, Record recordDetails) {
        logger.info("update======" + id + "===========");

        Optional<Record> recordOptional = recordRepo.findById(id);

        if (recordOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Record existingRecord = recordOptional.get();

        // Update all transaction fields
        existingRecord.setExpense(recordDetails.getExpense());
        existingRecord.setIncome(recordDetails.getIncome());
        existingRecord.setCategory(recordDetails.getCategory());
        existingRecord.setReason(recordDetails.getReason());
        existingRecord.setHashtags(recordDetails.getHashtags());
        existingRecord.setDate(recordDetails.getDate());
        Record updatedRecord = recordRepo.save(existingRecord);
        return ResponseEntity.ok(updatedRecord);
    }

    public ResponseEntity<String> deleteRecordById(Long id) {
        logger.info("deleteRecord======" + id + "===========");

        if (!recordRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found.");
        }

        recordRepo.deleteById(id);
        return ResponseEntity.ok("Record deleted successfully.");

    }

    public Double getCategoryExpense(String category) {
        return recordRepo.findAll().stream()
                .filter(r -> r != null && r.getCategory() != null && r.getCategory().equalsIgnoreCase(category))
                .mapToDouble(r -> r.getExpense() + r.getIncome())
                .sum();
    }

    public Object ppredictFutureExpense(String expense, String income) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'ppredictFutureExpense'");
    }

    public Double getMonthlySavings(String date) {
        LocalDate d = LocalDate.parse(date);
        return recordRepo.findAll().stream()
                .filter(r -> r.getDate() != null) // Avoid NullPointerException
                .filter(r -> r.getDate().getYear() == d.getYear() &&
                        r.getDate().getMonth() == d.getMonth())
                .mapToDouble(r -> r.getExpense() + r.getIncome()) // Extract the double value from your records
                .sum();
    }

    public Map<String, Object> getRecordSummary() {
        List<Record> records = recordRepo.findAll();
        HashMap<String, Object> map = new HashMap<>();
        double expenses = records.stream().mapToDouble(Record::getExpense).sum();
        double incomes = records.stream().mapToDouble(Record::getIncome).sum();
        double totalBalance = incomes + expenses;

        map.put("totalRecords", records.size());
        map.put("totalBalance", totalBalance);
        map.put("totalIncome", incomes);
        map.put("totalExpenses", Math.abs(expenses));
        return map;

    }

    public String predictFutureExpense() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'predictFutureExpense'");
    }

    public List<Record> getRecentRecords(int limit) {
        List<Record> records = recordRepo.findAll().stream().sorted(Comparator.comparing(Record::getDate)).toList()
                .reversed();
        return records;
    }

    public List<Record> getRecordsByDateRange(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return recordRepo.findAll().stream()
                .filter(r -> r.getDate() != null && r.getDate().isAfter(start) && r.getDate().isBefore(end))
                .toList();
    }

    public List<Record> searchRecords(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return recordRepo.findAll(); // Return everything if search token is empty
        }

        return recordRepo.findAll().stream()
                .filter(Objects::nonNull) // Ensure safe context elements
                .filter(r -> r.getCategory() != null) // Shield from NullPointerException
                .filter(r -> r.getCategory().toLowerCase().contains(keyword.toLowerCase())) // Case-insensitive matching
                .toList(); // Collect stream back into a List (Java 16+)
    }

    public void clearAllRecords() {
        recordRepo.deleteAll();
    }
}