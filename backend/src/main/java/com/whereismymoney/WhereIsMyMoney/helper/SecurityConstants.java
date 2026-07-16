package com.whereismymoney.WhereIsMyMoney.helper;

public class SecurityConstants {
    public static final String JWT_SECRET = "your-256-bit-secret-your-256-bit-secret";
    public static final long JWT_EXPIRATION_MS = 86400000; // 24 hours
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    private SecurityConstants() {
    }
}
