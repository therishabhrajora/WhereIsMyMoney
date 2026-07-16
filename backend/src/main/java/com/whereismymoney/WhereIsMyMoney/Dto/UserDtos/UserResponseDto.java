package com.whereismymoney.WhereIsMyMoney.Dto.UserDtos;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private long id;
    private String email;
    private String role;
    
}
