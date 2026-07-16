package com.whereismymoney.WhereIsMyMoney.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "records")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Record {
    @Id
    @Column(name = "client_record_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private Double expense;

    @Column(nullable = false)
    private Double income;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(length = 255)
    private String reason;

    // Maps your raw string array cleanly into an independent sub-relational
    // metadata table
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "record_hashtags", joinColumns = @JoinColumn(name = "record_internal_id"))
    @Column(name = "hashtag")
    private List<String> hashtags;

    @Column(name = "record_date", nullable = false)
    private Integer date;

    @Column(name = "record_month", nullable = false)
    private Integer month;

    @Column(name = "record_year", nullable = false)
    private Integer year;
}
