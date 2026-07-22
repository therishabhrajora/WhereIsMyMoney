package com.whereismymoney.WhereIsMyMoney.Services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // Automatically reads your existing API key environment variable from Render
    @Value("${SPRING_SENDGRID_API_KEY}")
    private String sendGridApiKey;

    public void sendResetPasswordEmail(String toEmail, String resetLink) {
        // 1. Define your verified SendGrid single sender identity address
        Email from = new Email("YOUR_VERIFIED_SENDGRID_EMAIL@gmail.com");
        Email to = new Email(toEmail);
        String subject = "ExpenseTrackr — Reset Your Password";
        
        // 2. Format a professional email body layout text message
        String messageBody = """
                Hello,

                We received a request to reset the password linked to this email address on ExpenseTrackr.

                To choose a new password, please click the secure link below:
                %s

                Note: This recovery link is strictly private and expires automatically in 15 minutes.
                If you did not request this change, you can safely ignore this email message.

                Best regards,
                The ExpenseTrackr Security Team
                """.formatted(resetLink);

        Content content = new Content("text/plain", messageBody);
        Mail mail = new Mail(from, subject, to, content);

        // 3. Initialize SendGrid over a standard secure web port (443) instead of SMTP
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            // Fires an HTTP API web call that bypasses Render cloud firewalls natively
            Response response = sg.api(request);
            
            System.out.println("SendGrid Web API status response code: " + response.getStatusCode());
        } catch (Exception ex) {
            System.err.println("SendGrid Web API execution failed: " + ex.getMessage());
            throw new RuntimeException("Failed to successfully route transaction email.");
        }
    }
}
