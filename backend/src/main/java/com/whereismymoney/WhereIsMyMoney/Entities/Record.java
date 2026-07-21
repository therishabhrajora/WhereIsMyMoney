package com.whereismymoney.WhereIsMyMoney.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.whereismymoney.WhereIsMyMoney.config.FinancialAmountConverter;
import com.whereismymoney.WhereIsMyMoney.config.FinancialStringDataConverter;

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
    @Convert(converter = FinancialAmountConverter.class)
    private Double expense;

    @Column(nullable = false)
   @Convert(converter = FinancialAmountConverter.class)
    private Double income;

    @Column(nullable = false, length = 100)
    @Convert(converter = FinancialStringDataConverter.class)
    private String category;

    @Column(length = 255)
    @Convert(converter = FinancialStringDataConverter.class)
    private String reason;

    // Maps your raw string array cleanly into an independent sub-relational
    // metadata table
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "record_hashtags", joinColumns = @JoinColumn(name = "record_internal_id"))
    @Column(name = "hashtag")
    @Convert(converter = FinancialStringDataConverter.class)
    private List<String> hashtags;

    @Column(name = "record_date", nullable = false)
    private LocalDate date;

    @Column(name = "type", nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore // Creates a user_id foreign key column in your records table
    private User user;
}
