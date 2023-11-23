package com.doantotnghiep.server.search;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Search {
    @Id
    public String id;
    @Field
    public String userId;
    @Field
    public List<String> wordIds;

    public Search() {
    }

    public Search(String userId, List<String> wordIds) {
        this.userId = userId;
        this.wordIds = wordIds;
    }

    public void appendWord(String wordId) {
        this.wordIds.add(wordId);
    }
}
