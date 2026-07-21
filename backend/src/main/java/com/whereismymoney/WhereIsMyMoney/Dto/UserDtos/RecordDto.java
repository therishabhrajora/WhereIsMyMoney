package com.whereismymoney.WhereIsMyMoney.Dto.UserDtos;

import java.util.List;

import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDto {

    private Double expense;
    private Double income;
    private String category;
    private String reason;
    private String type;
    private List<String> hashTags;

}