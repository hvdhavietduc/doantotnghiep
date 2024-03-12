package com.doantotnghiep.server.wordCategory;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document
@Builder
public class WordCategory {
    @Id
    public String id;
    @Field
    @Indexed(unique = true)
    public String name;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;
    @Field
    public List<String> wordIds;

}
