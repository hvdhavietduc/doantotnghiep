package com.doantotnghiep.server.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
    @NotEmpty(message = "username is required")
    @NotNull(message = "username is required")
    @Size(min = 6, max = 20, message = "username must be between 6 and 20 characters")
    private String username;

    @NotEmpty(message = "password is required")
    @NotNull(message = "password is required")
    @Size(min = 6, max = 20, message = "password must be between 6 and 20 characters")
    private String password;

    public String getUsername() {
        return username;
    }
}
