package com.whereismymoney.WhereIsMyMoney.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whereismymoney.WhereIsMyMoney.Entities.Categories;

@Repository
public interface CategoryRepo extends JpaRepository<Categories,Long> {
    
}
