package com.whereismymoney.WhereIsMyMoney.Entities;

import jakarta.persistence.Column;
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
    private String message;
    @Column(name = "message_date", nullable = false)
    private Integer date;

    @Column(name = "message_month", nullable = false)
    private Integer month;

    @Column(name = "message_year", nullable = false)
    private Integer year;

    @Column(name = "type", nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
