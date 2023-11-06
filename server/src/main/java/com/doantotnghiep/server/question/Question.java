package com.doantotnghiep.server.question;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Question {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public String audio;
    @Field
    public String image;
    @Field
    public String partId;
    @Field
    public String quizId;
    @Field
    public List<Answer> answers;

    public Question() {
    }

    public Question(String title, String audio, String image, String partId, String quizId, List<Answer> answers) {
        this.title = title;
        this.audio = audio;
        this.image = image;
        this.partId = partId;
        this.quizId = quizId;
        this.answers = answers;
    }

    public void appendAnswer(Answer answer) {
        this.answers.add(answer);
    }
}
