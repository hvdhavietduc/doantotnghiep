package com.doantotnghiep.server.folder;

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
public class Folder {
    @Id
    public String id;
    @Field
    @Indexed(unique = true)
    public String name;
    @Field
    public String userId;
    @Field
    public List<String> wordIds;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;

    public Folder() {
    }

    public Folder(String name, String userId, List<String> wordIds, Date createdAt, Date updatedAt) {
        this.name = name;
        this.userId = userId;
        this.wordIds = wordIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void appendWord(String wordId) {
        this.wordIds.add(wordId);
    }
}

