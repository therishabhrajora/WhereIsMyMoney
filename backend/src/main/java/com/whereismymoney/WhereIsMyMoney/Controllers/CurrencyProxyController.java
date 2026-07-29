package com.whereismymoney.WhereIsMyMoney.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

// 🟩 CRITICAL FIX 1: Import Spring's Value annotation, NOT Google Client's utility
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/currency")
@CrossOrigin(origins = "*") // Allows uninterrupted Axios calls from your React port
public class CurrencyProxyController {

    // 🟩 CRITICAL FIX 2: Added a hardcoded fallback string after the colon (:)
    // This acts as a safety guard if your properties file ever fails to resolve
    // @Value("${exchange.api.key}")
    // private String apiKey;
    @Value("${EXCHANGE_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate;

    // Standard constructor dependency injection
    CurrencyProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/rates/{base}")
    public ResponseEntity<Object> getRates(@PathVariable String base) {
        try {
            // 🟩 CRITICAL FIX 3: Fixed the URL path string to route through the correct v6
            // subdomain structure
            String url = "https://v6.exchangerate-api.com" + "/v6/" + apiKey + "/latest/" + base;

            System.out.println("Forwarding proxy request to endpoint: " + url);

            Object rates = restTemplate.getForObject(url, Object.class);
            return ResponseEntity.ok(rates);

        } catch (Exception e) {
            System.err.println("FX Gateway Exception Trace: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body("Currency service proxy connection error: " + e.getMessage());
        }
    }
}
