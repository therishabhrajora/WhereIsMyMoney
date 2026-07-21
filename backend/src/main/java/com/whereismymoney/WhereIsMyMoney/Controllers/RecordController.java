package com.whereismymoney.WhereIsMyMoney.Controllers;

import com.whereismymoney.WhereIsMyMoney.Entities.Record;
import com.whereismymoney.WhereIsMyMoney.Services.RecordService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    private final RecordService recordService;

    // Constructor Injection
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    // 1. Get All Records -> Maps to Endpoints.getRecords
    @GetMapping
    public ResponseEntity<?> getAllRecords() {
        ResponseEntity<?> allRecords = recordService.getAllRecords();
        return allRecords;
    }

    // 2. Add New Record -> Maps to Endpoints.addRecord
    @PostMapping("/add")
    public ResponseEntity<?> addRecord(Authentication authentication, @RequestBody Record record) {
        // Since your entity uses the client-side timestamp 'id' as the primary key
        // (@Id),
        // save() will insert it directly without auto-increment collisions.
        System.out.println(record);
        ResponseEntity<?> record2 = recordService.addRecord(record);
        return record2;
    }

    // 3. Update Record -> Maps to Endpoints.updateRecord(id)
    @PutMapping("/update/{id}")
    public ResponseEntity<Record> updateRecord(@PathVariable Long id, @RequestBody Record recordDetails) {
        ResponseEntity<Record> updateRecord = recordService.updateRecord(id, recordDetails);
        return updateRecord;
    }

    // 4. Delete Record -> Maps to Endpoints.deleteRecord(id)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable Long id) {
        ResponseEntity<String> deleteRecordById = recordService.deleteRecordById(id);
        return deleteRecordById;
    }
}
