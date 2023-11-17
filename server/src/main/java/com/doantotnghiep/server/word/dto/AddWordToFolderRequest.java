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
public class AddWordToFolderRequest {
    @Valid
    @NotNull(message = "WordId must not be null")
    @NotEmpty(message = "WordId must not be empty")
    private String wordId;

    @Valid
    @NotNull(message = "FolderId must not be null")
    @NotEmpty(message = "FolderId must not be empty")
    private String folderId;
}
