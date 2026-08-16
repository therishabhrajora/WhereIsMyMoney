package com.whereismymoney.WhereIsMyMoney.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KeepAliveTask {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveTask.class);
    private final RestTemplate restTemplate = new RestTemplate();

    // Runs automatically every 10 minutes (600,000 milliseconds)
    @Scheduled(fixedRate =900000)
    public void pingServerAutomatically() {
        try {
            // Replace this with your actual live production URL path
            String serverUrl = "https://whereismymoney-87yj.onrender.com/"; 
            
            logger.info("============== Keep-Alive Ping Initiated ==============");
            String response = restTemplate.getForObject(serverUrl, String.class);
            logger.info("Keep-Alive Status Response: " + response);
            
        } catch (Exception e) {
            logger.error("Keep-Alive Ping failed, but server is still awake: " + e.getMessage());
        }
    }
}
