package com.whereismymoney.WhereIsMyMoney.Services;

import java.util.Date;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetPasswordEmail(String toEmail, String resetLink) {
        try{
 SimpleMailMessage message = new SimpleMailMessage();

        // Match the email sender account declared in application.properties
        message.setFrom("rishabhrajora20@gmail.com");
        message.setTo(toEmail);
        message.setSubject("ExpenseTrackr — Reset Your Password");
        message.setSentDate(new Date());
        // Format a clear, professional email body layout
        message.setText("""
                Hello,

                We received a request to reset the password linked to this email address on ExpenseTrackr.

                To choose a new password, please click the secure link below:
                %s

                Note: This recovery link is strictly private and expires automatically in 15 minutes.
                If you did not request this change, you can safely ignore this email message.

                Best regards,
                The ExpenseTrackr Security Team
                """.formatted(resetLink));

        // Dispatch payload through Gmail's network threads
        System.out.println(message);
        mailSender.send(message);
        }catch(Exception e){
            System.out.println(e);

        }
       
    }
}
