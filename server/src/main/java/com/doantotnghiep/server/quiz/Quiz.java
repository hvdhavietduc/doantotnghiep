package com.doantotnghiep.server.quiz;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Quiz {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String description;
    @Field
    public Integer point;
    @Field
    public Integer time;
    @Field
    public String image;
    @Field
    public List<String> questionIds;

    public Quiz() {
    }

    public Quiz(String name, String description, Integer point, Integer time, String image, List<String> questionIds) {
        this.name = name;
        this.description = description;
        this.point = point;
        this.time = time;
        this.image = image;
        this.questionIds = questionIds;
    }

    public void appendQuestionId(String questionId) {
        this.questionIds.add(questionId);
    }
}
