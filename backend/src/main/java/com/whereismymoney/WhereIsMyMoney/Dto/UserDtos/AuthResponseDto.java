package com.whereismymoney.WhereIsMyMoney.Dto.UserDtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDto {
    private String token;
    private String email;
    private String role;
    private String type = "Bearer";
}
