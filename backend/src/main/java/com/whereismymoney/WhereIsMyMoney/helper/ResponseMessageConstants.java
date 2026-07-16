package com.whereismymoney.WhereIsMyMoney.helper;

public class ResponseMessageConstants {
    // General
    public static final String SUCCESS = "Operation completed successfully.";
    public static final String FAILED = "Operation failed.";
    public static final String UNAUTHORIZED = "You are not authorized to perform this action.";
    public static final String FORBIDDEN = "Access is forbidden.";
    public static final String BAD_REQUEST = "Invalid request. Please check your input.";
    public static final String INTERNAL_SERVER_ERROR = "Something went wrong. Please try again later.";

    // User-related
    public static final String USER_REGISTERED = "User registered successfully.";
    public static final String USER_ALREADY_EXISTS = "User already exists.";
    public static final String USER_NOT_FOUND = "User not found.";
    public static final String LOGIN_SUCCESS = "Login successful.";
    public static final String LOGIN_FAILED = "Invalid username or password.";

    // Token / Auth
    public static final String TOKEN_EXPIRED = "JWT token has expired.";
    public static final String TOKEN_INVALID = "Invalid JWT token.";
    public static final String TOKEN_MISSING = "Authorization token is missing.";

    // CRUD Operations
    public static final String CREATE_SUCCESS = "Created successfully.";
    public static final String UPDATE_SUCCESS = "Updated successfully.";
    public static final String DELETE_SUCCESS = "Deleted successfully.";
    public static final String NOT_FOUND = "Resource not found.";

    // File Uploads
    public static final String FILE_UPLOAD_SUCCESS = "File uploaded successfully.";
    public static final String FILE_UPLOAD_FAILED = "File upload failed.";
    public static final String FILE_NOT_FOUND = "Requested file not found.";

    private ResponseMessageConstants() {
    }
}
