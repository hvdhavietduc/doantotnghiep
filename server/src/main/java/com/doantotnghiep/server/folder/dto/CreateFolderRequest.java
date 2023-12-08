package com.doantotnghiep.server.folder.dto;

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
public class CreateFolderRequest {
    @Valid
    @NotNull(message = "Name must not be null")
    @NotEmpty(message = "Name must not be empty")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;

    @Valid
    @NotNull(message = "Description must not be null")
    @Size(min = 0, max = 1000, message = "Description must be between 0 and 1000 characters")
    private String description;

    public void setDescription(String description) {
        if (description != null) {
            description = description.trim();
        }
        this.description = description;
    }
    public void setName(String name){
        if(name != null){
            name = name.trim();
        }
        this.name = name;
    }
}
