package com.doantotnghiep.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandle extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ResponseException.class)
    public ResponseEntity<Object> handleException(ResponseException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("timestamp", e.getTimestamp());
        map.put("messageError", e.getMessage());
        map.put("status", e.getStatus());
        map.put("statusCode", e.getStatusCode());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }
}
