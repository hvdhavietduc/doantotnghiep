package com.doantotnghiep.server.comment;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
public class Comment {
    @Id
    public String id;
    @Field
    public String content;
    @Field
    public String authorId;
    @Field
    public String postId;
    @Field
    public Date createdAt;

    public Comment() {
    }

    public Comment(String content, String authorId, String postId, Date createdAt) {
        this.content = content;
        this.authorId = authorId;
        this.postId = postId;
        this.createdAt = createdAt;
    }
}
