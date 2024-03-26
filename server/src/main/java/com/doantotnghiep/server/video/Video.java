package com.doantotnghiep.server.video;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
@Builder
public class Video {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public String description;
    @Field
    public String url;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;
    @Field
    public String categpryId;

}
