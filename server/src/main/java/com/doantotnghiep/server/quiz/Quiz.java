package com.doantotnghiep.server.quiz;

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
public class Quiz {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String description;
    @Field
    public Integer totalPoint;
    @Field
    public Integer time;
    @Field
    public String image;
    @Field
    public List<String> questionIds;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;

}
