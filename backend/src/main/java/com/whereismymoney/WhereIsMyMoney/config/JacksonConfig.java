package com.whereismymoney.WhereIsMyMoney.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Prevents the specific crash mentioned in your stacktrace
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        return mapper; // Registers the missing bean
    }
}
