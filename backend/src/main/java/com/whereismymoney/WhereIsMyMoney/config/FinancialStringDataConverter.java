package com.whereismymoney.WhereIsMyMoney.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

@Converter
public class FinancialStringDataConverter implements AttributeConverter<String, String> {

    // Use a secure key stored in your system environment variables
    private final TextEncryptor encryptor = Encryptors.text("your-secret-key", "deadbeef");

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute == null ? null : encryptor.encrypt(attribute);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData == null ? null : encryptor.decrypt(dbData);
    }
}
