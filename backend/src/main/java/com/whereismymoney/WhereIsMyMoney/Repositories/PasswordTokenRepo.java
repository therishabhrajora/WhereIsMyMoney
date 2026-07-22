package com.whereismymoney.WhereIsMyMoney.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whereismymoney.WhereIsMyMoney.Entities.PasswordResetToken;
import com.whereismymoney.WhereIsMyMoney.Entities.User;


@Repository
public interface PasswordTokenRepo extends JpaRepository<PasswordResetToken,Long> {

    User deleteByUser(User user);

    Optional<PasswordResetToken> findByToken(String token);

}
