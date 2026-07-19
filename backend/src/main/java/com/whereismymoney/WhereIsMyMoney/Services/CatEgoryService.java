package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.whereismymoney.WhereIsMyMoney.Entities.Categories;
import com.whereismymoney.WhereIsMyMoney.Repositories.CategoryRepo;

@Service
public class CatEgoryService {

    private final CategoryRepo categoryRepo;

    CatEgoryService(CategoryRepo categoryRepo){
        this.categoryRepo=categoryRepo;
    }

    public List<String> getAllCategories(){
        return categoryRepo.findAll().stream().map(Categories::getCategory).toList();
    }
}
