package com.doantotnghiep.server.categoryOfWord;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document
public class CategoryOfWord {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;
    @Field
    public List<String> wordIds;

    public CategoryOfWord() {
    }

    public CategoryOfWord(String name, Date createdAt, Date updatedAt, List<String> wordIds) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.wordIds = wordIds;
    }

    public void appendWord(String wordId) {
        this.wordIds.add(wordId);
    }
}
