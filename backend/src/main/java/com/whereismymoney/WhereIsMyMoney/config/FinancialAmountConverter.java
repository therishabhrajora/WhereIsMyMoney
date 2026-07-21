package com.whereismymoney.WhereIsMyMoney.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

@Converter
public class FinancialAmountConverter implements AttributeConverter<Double, String> {

    private final TextEncryptor encryptor = Encryptors.text("my-super-secret-key", "12345678");

    @Override
    public String convertToDatabaseColumn(Double attribute) {
        if (attribute == null) {
            return null;
        }
        // Convert Double to String, then encrypt it
        return encryptor.encrypt(String.valueOf(attribute));
    }

    @Override
    public Double convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        
        // Smart check: If it's old plain text data in the database, parse it directly
        boolean isHex = dbData.matches("^[0-9a-fA-F]+$");
        boolean isEvenLength = (dbData.length() % 2 == 0);

        if (isHex && isEvenLength) {
            try {
                String decrypted = encryptor.decrypt(dbData);
                return Double.valueOf(decrypted);
            } catch (Exception e) {
                return Double.valueOf(dbData);
            }
        }
        
        return Double.valueOf(dbData);
    }
}
