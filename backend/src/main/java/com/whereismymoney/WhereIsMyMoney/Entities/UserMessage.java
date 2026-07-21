package com.whereismymoney.WhereIsMyMoney.Entities;


import java.time.LocalDate;

import com.whereismymoney.WhereIsMyMoney.config.FinancialStringDataConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMessage {
    @Id
    private long id;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = FinancialStringDataConverter.class)
    private String message;

    @Column(name = "message_date", nullable = false)
    private LocalDate date;

    

    @Column(name = "type", nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
