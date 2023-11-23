package com.doantotnghiep.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ResponseException extends Exception {
    public String timestamp;
    public String message;
    public HttpStatus status;
    public Integer statusCode;
    public ResponseException(String message, HttpStatus status, Integer statusCode) {
        super(message);
        this.timestamp = java.time.LocalDateTime.now().toString();
        this.message = message;
        this.status = status;
        this.statusCode = statusCode;
    }

    public String getTimestamp() {
        return timestamp;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public Integer getStatusCode() {
        return statusCode;
    }
}
