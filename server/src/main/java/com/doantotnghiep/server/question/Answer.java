package com.doantotnghiep.server.question;

public class Answer {
    public String content;
    public boolean isCorrect;

    public Answer() {
    }

    public Answer(String content, boolean isCorrect) {
        this.content = content;
        this.isCorrect = isCorrect;
    }
}
