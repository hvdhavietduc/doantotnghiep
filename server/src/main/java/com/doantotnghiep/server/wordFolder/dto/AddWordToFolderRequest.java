package com.doantotnghiep.server.wordFolder.dto;

import com.doantotnghiep.server.word.Type;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddWordToFolderRequest {
    @Valid
    @NotNull(message = "Name must not be null")
    @NotEmpty(message = "Name must not be empty")
    public String name;

    @Valid
    @NotNull(message = "PronunciationUKAudio must not be null")
    @NotEmpty(message = "PronunciationUKAudio must not be empty")
    public String pronunciationUKAudio;

    @Valid
    @NotNull(message = "PronunciationUK must not be null")
    @NotEmpty(message = "PronunciationUK must not be empty")
    public String pronunciationUK;

    @Valid
    @NotNull(message = "PronunciationUSAudio must not be null")
    @NotEmpty(message = "PronunciationUSAudio must not be empty")
    public String pronunciationUSAudio;

    @Valid
    @NotNull(message = "PronunciationUS must not be null")
    @NotEmpty(message = "PronunciationUS must not be empty")
    public String pronunciationUS;

    @Valid
    @NotNull(message = "Types must not be null")
    public List<Type> types;

    @Valid
    @NotNull(message = "Synonyms must not be null")
    public List<String> synonyms;

    @Valid
    @NotNull(message = "Antonyms must not be null")
    public List<String> antonyms;

    @Valid
    @NotNull(message = "FolderId must not be null")
    @NotEmpty(message = "FolderId must not be empty")
    public String folderId;
}
