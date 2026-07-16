package com.whereismymoney.WhereIsMyMoney.Dto.UserDtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegisterDto {
    private String email;
    private String password;
    private String role;


}
