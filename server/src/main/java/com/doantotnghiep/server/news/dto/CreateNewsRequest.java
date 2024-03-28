package com.doantotnghiep.server.news.dto;

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
public class CreateNewsRequest {
    @Valid
    @NotNull(message = "Title must not be null")
    @NotEmpty(message = "Title must not be empty")
    @Size(min = 1, max = 50, message = "Title must be between 1 and 50 characters")
    private String title;

    @Valid
    @NotNull(message = "Content must not be null")
    @NotEmpty(message = "Content must not be empty")
    @Size(min = 1, max = 5000, message = "Content must be between 1 and 5000 characters")
    private String content;

    @Valid
    @NotNull(message = "Category id must not be null")
    @NotEmpty(message = "Category id must not be empty")
    private String categoryId;

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
