package com.doantotnghiep.server.quiz.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Valid
public class UpdateQuizRequest {
    @NotNull(message = "Id is required")
    @NotEmpty(message = "Id is required")
    public String id;

    @NotNull(message = "Name is required")
    @NotEmpty(message = "Name is required")
    public String name;

    @NotNull(message = "Description is required")
    @NotEmpty(message = "Description is required")
    public String description;

    @NotNull(message = "Total point is required")
    public Integer totalPoint;

    @NotNull(message = "Time is required")
    public Integer time;

    public Object image;

    @NotNull(message = "Keep old image is required")
    public Boolean keepOldImage;
}
