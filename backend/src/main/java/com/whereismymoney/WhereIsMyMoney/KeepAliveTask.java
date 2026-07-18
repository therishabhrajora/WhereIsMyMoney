package  com.whereismymoney.WhereIsMyMoney;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

@Component
public class KeepAliveTask {

    // 3600000 milliseconds = 1 hour
    @Scheduled(fixedRate = 500000)
    public void keepAlive() {
        System.out.println("Keep-alive task executed.");
        // Add your keep-alive logic here (e.g., database ping or HTTP call)
    }
}
