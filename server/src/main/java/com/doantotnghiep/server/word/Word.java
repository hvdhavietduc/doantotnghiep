package com.doantotnghiep.server.word;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Word {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public List<Mean> means;

    public Word() {
    }

    public Word(String name, List<Mean> means) {
        this.name = name;
        this.means = means;
    }

    public void appendMean(Mean mean) {
        this.means.add(mean);
    }
}
