package com.whereismymoney.WhereIsMyMoney.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whereismymoney.WhereIsMyMoney.Entities.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long>{

    User findByEmail(String email);
    
}
