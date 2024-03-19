package com.doantotnghiep.server.quiz.response;

import com.doantotnghiep.server.quiz.Quiz;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AllQuizResponse {
    public Integer total;
    public Integer totalPage;
    public List<Quiz> quizzes;
}
