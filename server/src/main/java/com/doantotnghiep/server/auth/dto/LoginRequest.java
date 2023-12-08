package com.doantotnghiep.server.auth.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @Valid
    @NotEmpty(message = "Username must not be empty")
    @NotNull(message = "Username must not be null")
    @Size(min = 6, max = 20, message = "Username must be between 6 and 20 characters")
    private String username;

    @Valid
    @NotEmpty(message = "Password must not be empty")
    @NotNull(message = "Password must not be null")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;

    public void setUsername(String username){
        if(username != null){
            username = username.trim();
        }
        this.username = username;
    }
    public void setPassword(String password){
        if(password != null){
            password = password.trim();
        }
        this.password = password;
    }
}
