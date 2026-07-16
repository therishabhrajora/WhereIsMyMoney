package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    public ResponseEntity<?> getAllRecords(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is missing");
        }
        String userEmail = authentication.getName();
        User currentUser = userRepo.findByEmail(userEmail);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
        }

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

        System.out.println("=============================="+all);

        return ResponseEntity.ok(all);
    }

    public ResponseEntity<?> addRecord(Authentication authentication, Record record) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is missing");
        }
        String userEmail = authentication.getName();
        User currentUser = userRepo.findByEmail(userEmail);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
        }
        record.setUser(currentUser);
        Record savedRecord = recordRepo.save(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    public ResponseEntity<Record> updateRecord(Long id, Record recordDetails) {
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
        existingRecord.setMonth(recordDetails.getMonth());
        existingRecord.setYear(recordDetails.getYear());

        Record updatedRecord = recordRepo.save(existingRecord);
        return ResponseEntity.ok(updatedRecord);
    }

    public ResponseEntity<String> deleteRecordById(Long id) {
        if (!recordRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found.");
        }

        recordRepo.deleteById(id);
        return ResponseEntity.ok("Record deleted successfully.");

    }
}