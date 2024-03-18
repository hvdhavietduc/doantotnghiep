package com.doantotnghiep.server.comment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Valid
@Builder
public class AddCommentRequest {
    private String postId;
    @NotEmpty(message = "Content is required")
    @NotNull(message = "Content is required")
    @Size(min = 1, max = 100, message = "Content must be between 1 and 100 characters")
    private String content;
    private String parentId;
}
