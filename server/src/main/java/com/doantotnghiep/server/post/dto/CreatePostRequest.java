package com.doantotnghiep.server.post.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostRequest {
    @Valid
    @NotNull(message = "Title must be not null")
    @NotEmpty(message = "Title must be not empty")
    @Size(min = 1, max = 50, message = "Title must be between 1 and 50 characters")
    private String title;

    private MultipartFile image;

    @Valid
    @NotNull(message = "Content must be not null")
    @NotEmpty(message = "Content must be not empty")
    @Size(min = 1, max = 1000, message = "Content must be between 1 and 1000 characters")
    private String content;

    public void setTitle(String title){
        if(title != null){
            title = title.trim();
        }
        this.title = title;
    }
    public void setContent(String content){
        if(content != null){
            content = content.trim();
        }
        this.content = content;
    }
}
