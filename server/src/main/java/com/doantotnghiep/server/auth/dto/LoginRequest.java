package com.doantotnghiep.server.auth.dto;

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
    @NotEmpty
    @NotNull
    @Size(min = 6, max = 20, message = "Username must be b  etween 6 and 20 characters")
    private String username;

    @NotEmpty
    @NotNull
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;
}
