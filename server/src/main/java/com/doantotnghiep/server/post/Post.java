package com.doantotnghiep.server.post;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document
public class Post {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;
    @Field
    public String image;
    @Field
    public String content;
    @Field
    public String authorId;
    @Field
    public List<String> commentIds;

    public Post() {
    }

    public Post(String title, Date createdAt, Date updatedAt, String image, String content, String authorId, List<String> commentIds) {
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image = image;
        this.content = content;
        this.authorId = authorId;
        this.commentIds = commentIds;
    }

    public void appendCommentId(String commentId) {
        this.commentIds.add(commentId);
    }
}
