package com.doantotnghiep.server.quiz.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Valid
public class CreateQuizRequest {
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
}
