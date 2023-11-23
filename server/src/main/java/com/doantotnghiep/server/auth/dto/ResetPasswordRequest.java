package com.doantotnghiep.server.auth.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
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
public class ResetPasswordRequest {
    @Valid
    @NotEmpty(message = "Code must not be empty")
    @NotNull(message = "Code must not be null")
    @Size(min = 6, max = 10, message = "Code must be between 6 and 10")
    private String code;

    @Valid
    @NotEmpty(message = "Email must not be empty")
    @NotNull(message = "Email must not be null")
    @Email(message = "Email must be valid")
    private String email;

    @Valid
    @NotEmpty(message = "Password must not be empty")
    @NotNull(message = "Password must not be empty")
    @Size(min = 6, max = 10, message = "Password must be between 6 and 20")
    private String password;
}
