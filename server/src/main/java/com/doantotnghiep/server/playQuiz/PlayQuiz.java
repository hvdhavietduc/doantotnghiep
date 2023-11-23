package com.doantotnghiep.server.playQuiz;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
public class PlayQuiz {
    @Id
    public String id;
    @Field
    public Integer score;
    @Field
    public Date completedAt;
    @Field
    public String authorId;
    @Field
    public String quizId;

    public PlayQuiz() {
    }

    public PlayQuiz(Integer score, Date completedAt, String authorId, String quizId) {
        this.score = score;
        this.completedAt = completedAt;
        this.authorId = authorId;
        this.quizId = quizId;
    }
}
