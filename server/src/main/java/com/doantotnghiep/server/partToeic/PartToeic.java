package com.doantotnghiep.server.partToeic;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class PartToeic {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String instruction;
    @Field
    public String audio;
    @Field
    public List<String> questionIds;
    @Field
    public List<String> imagesOfPart;
    @Field
    public List<String> contentsOfPart;

    public PartToeic() {
    }

    public PartToeic(String name, String instruction, String audio, List<String> questionIds, List<String> imagesOfPart, List<String> contentsOfPart) {
        this.name = name;
        this.instruction = instruction;
        this.audio = audio;
        this.questionIds = questionIds;
        this.imagesOfPart = imagesOfPart;
        this.contentsOfPart = contentsOfPart;
    }

    public void appendQuestionId(String questionId) {
        this.questionIds.add(questionId);
    }

    public void appendImageOfPart(String imageOfPart) {
        this.imagesOfPart.add(imageOfPart);
    }

    public void appendContentOfPart(String contentOfPart) {
        this.contentsOfPart.add(contentOfPart);
    }

}
