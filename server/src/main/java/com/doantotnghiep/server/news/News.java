package com.doantotnghiep.server.news;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
public class News {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public String content;

    public News() {
    }

    public News(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
