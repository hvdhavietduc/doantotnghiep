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
public class VerifyRequest {
    @Valid
    @NotEmpty(message = "Code must not be empty")
    @NotNull(message = "Code must not be null")
    @Size(min = 6, max = 10, message = "Code must be between 6 and 10")
    private String code;

    @Valid
    @NotEmpty(message = "Email must not be empty")
    @NotNull(message = "Email must not be null")
    private String email;

    public void setCode(String code){
        if(code != null){
            code = code.trim();
        }
        this.code = code;
    }
}
