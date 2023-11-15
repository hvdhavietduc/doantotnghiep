package com.doantotnghiep.server.toeicTest;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
public class ToeicTest {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String part1Id;
    @Field
    public String part2Id;
    @Field
    public String part3Id;
    @Field
    public String part4Id;
    @Field
    public String part5Id;
    @Field
    public String part6Id;
    @Field
    public String part7Id;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;

    public ToeicTest() {
    }

    public ToeicTest(String name, String part1Id, String part2Id, String part3Id, String part4Id, String part5Id, String part6Id, String part7Id, Date createdAt, Date updatedAt) {
        this.name = name;
        this.part1Id = part1Id;
        this.part2Id = part2Id;
        this.part3Id = part3Id;
        this.part4Id = part4Id;
        this.part5Id = part5Id;
        this.part6Id = part6Id;
        this.part7Id = part7Id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
