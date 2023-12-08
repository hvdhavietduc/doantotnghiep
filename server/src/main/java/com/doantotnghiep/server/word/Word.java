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
    public String pronunciationUKAudio;
    @Field
    public String pronunciationUK;
    @Field
    public String pronunciationUSAudio;
    @Field
    public String pronunciationUS;
    @Field
    public List<Type> types;
    @Field
    public List<String> synonyms;
    @Field
    public List<String> antonyms;

    public Word() {
        this.name = "";
        this.pronunciationUKAudio = "";
        this.pronunciationUSAudio = "";
        this.types = new ArrayList<>();
    }

    public Word(String name, String pronunciationUK, String pronunciationUS, List<Type> types, List<String> synonyms, List<String> antonyms) {
        this.name = name;
        this.pronunciationUKAudio = pronunciationUK;
        this.pronunciationUSAudio = pronunciationUS;
        this.types = types;
        this.synonyms = synonyms;
        this.antonyms = antonyms;
    }

    public void appendType(Type type) {
        this.types.add(type);
    }
}
