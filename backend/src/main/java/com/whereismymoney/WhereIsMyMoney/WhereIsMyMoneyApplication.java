package com.whereismymoney.WhereIsMyMoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

// @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class, SecurityAutoConfiguration.class })
@SpringBootApplication
@EnableScheduling
public class WhereIsMyMoneyApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhereIsMyMoneyApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
