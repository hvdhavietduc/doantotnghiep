package com.doantotnghiep.server.Translate.dto;

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
public class TranslateRequest {
    @Valid
    @NotNull(message = "text must not be null")
    @NotEmpty(message = "text must not be empty")
    @Size(min = 1, max = 1000, message = "text must be between 1 and 1000 characters")
    private String text;
    private String to;

}
