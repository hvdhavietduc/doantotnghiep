package com.doantotnghiep.server.word.dto;

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
public class RemoveWordFromCategoryRequest {
    @Valid
    @NotNull(message = "WordId must not be null")
    @NotEmpty(message = "WordId must not be empty")
    private String wordId;

    @Valid
    @NotNull(message = "CategoryId must not be null")
    @NotEmpty(message = "CategoryId must not be empty")
    private String categoryId;
}
