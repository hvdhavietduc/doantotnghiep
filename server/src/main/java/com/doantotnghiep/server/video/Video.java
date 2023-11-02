package com.doantotnghiep.server.video;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
public class Video {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public String description;
    @Field
    public String url;

    public Video() {
    }

    public Video(String title, String description, String url) {
        this.title = title;
        this.description = description;
        this.url = url;
    }
}
