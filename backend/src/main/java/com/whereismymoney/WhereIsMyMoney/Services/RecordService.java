package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import com.whereismymoney.WhereIsMyMoney.Repositories.RecordRepo;

@Service
public class RecordService {
    private final RecordRepo recordRepo;

    // Constructor Injection
    public RecordService(RecordRepo recordRepo) {
        this.recordRepo = recordRepo;
    }

    public ResponseEntity<List<Record>> getAllRecords() {
        List<Record> all = recordRepo.findAll();
        return ResponseEntity.ok(all);
    }

    public ResponseEntity<Record> addRecord(Record record) {
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