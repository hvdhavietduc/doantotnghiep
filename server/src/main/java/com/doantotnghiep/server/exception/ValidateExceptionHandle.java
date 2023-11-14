package com.doantotnghiep.server.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class ValidateExceptionHandle {
    public void handleException(BindingResult bindingResult) throws ResponseException {
        if (bindingResult.hasErrors()) {
            throw new ResponseException(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST, 400);
        }
    }
}
