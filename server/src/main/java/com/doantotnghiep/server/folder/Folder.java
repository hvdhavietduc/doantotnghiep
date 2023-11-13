package com.doantotnghiep.server.folder;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Folder {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String userId;
    @Field
    public List<String> wordIds;

    public Folder() {
    }

    public Folder(String name, String userId, List<String> wordIds) {
        this.name = name;
        this.userId = userId;
        this.wordIds = wordIds;
    }

    public void appendWord(String wordId) {
        this.wordIds.add(wordId);
    }
}

