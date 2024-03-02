package com.doantotnghiep.server.video.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateVideoRequest {
    @Valid
    @NotNull(message = "Title must not be null")
    @NotEmpty(message = "Title must not be empty")
    private String title;

    @Valid
    @NotNull(message = "Description must not be null")
    @NotEmpty(message = "Description must not be empty")
    private String description;

    private MultipartFile video;
}
