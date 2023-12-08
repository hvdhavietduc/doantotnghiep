package com.doantotnghiep.server.userTestToeic;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
public class UserTestToeic {
    @Id
    public String id;
    @Field
    public Integer score;
    @Field
    public String authorId;
    @Field
    public String toeicTestId;
    @Field
    public Date completedAt;

    public UserTestToeic() {
    }

    public UserTestToeic(Integer score, String authorId, String toeicTestId, Date completedAt) {
        this.score = score;
        this.authorId = authorId;
        this.toeicTestId = toeicTestId;
        this.completedAt = completedAt;
    }

}
