package com.doantotnghiep.server.comment;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document
@Builder
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
    @Field
    public Date updatedAt;
    @Field
    public String parentId;
    @Field
    public Boolean isLevel1;
    @Field
    public List<String> childIds;

}
