package com.doantotnghiep.server.word;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Word {
    @Id
    public String id;
    @Field
    @Indexed(unique = true)
    public String name;
    @Field
    public String pronunciationUK;
    @Field
    public String pronunciationUS;
    @Field
    public List<Type> types;

    public Word() {
        this.name = "";
        this.pronunciationUK = "";
        this.pronunciationUS = "";
        this.types = new ArrayList<>();
    }

    public Word(String name, String pronunciationUK, String pronunciationUS, List<Type> types) {
        this.name = name;
        this.pronunciationUK = pronunciationUK;
        this.pronunciationUS = pronunciationUS;
        this.types = types;
    }

    public void appendType(Type type) {
        this.types.add(type);
    }
}
