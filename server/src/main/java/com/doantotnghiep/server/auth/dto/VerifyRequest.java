package com.doantotnghiep.server.auth.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerifyRequest {
    @Valid
    @NotEmpty(message = "Code must not be empty")
    @NotNull(message = "Code must not be null")
    private String code;

    @Valid
    @NotEmpty(message = "Email must not be empty")
    @NotNull(message = "Email must not be null")
    private String email;
}
