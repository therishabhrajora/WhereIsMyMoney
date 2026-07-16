package com.whereismymoney.WhereIsMyMoney.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whereismymoney.WhereIsMyMoney.Entities.User;
import com.whereismymoney.WhereIsMyMoney.Entities.UserMessage;

@Repository
public interface UserMessageRepo extends JpaRepository<UserMessage,Long>{

    List<UserMessage> findByUser(User currentUser);

}
