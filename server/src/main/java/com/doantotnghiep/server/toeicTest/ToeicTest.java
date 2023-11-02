package com.doantotnghiep.server.toeicTest;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
public class ToeicTest {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String part1;
    @Field
    public String part2;
    @Field
    public String part3;
    @Field
    public String part4;
    @Field
    public String part5;
    @Field
    public String part6;
    @Field
    public String part7;

    public ToeicTest() {
    }

    public ToeicTest(String name, String part1, String part2, String part3, String part4, String part5, String part6, String part7) {
        this.name = name;
        this.part1 = part1;
        this.part2 = part2;
        this.part3 = part3;
        this.part4 = part4;
        this.part5 = part5;
        this.part6 = part6;
        this.part7 = part7;
    }
}
