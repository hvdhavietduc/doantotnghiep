package com.doantotnghiep.server.categoryOfWord;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class CategoryOfWord {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public List<String> wordIds;

    public CategoryOfWord() {
    }

    public CategoryOfWord(String name, List<String> wordIds) {
        this.name = name;
        this.wordIds = wordIds;
    }

    public void appendWord(String wordId) {
        this.wordIds.add(wordId);
    }
}
