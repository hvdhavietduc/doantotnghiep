package com.doantotnghiep.server.wordFolder;

import com.doantotnghiep.server.word.Type;
import com.doantotnghiep.server.word.Word;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
@Builder
public class WordFolder {
    @Id
    public String id;
    @Field
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
    @Field
    public String authorId;
    @Field
    public String folderId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPronunciationUKAudio() {
        return pronunciationUKAudio;
    }

    public void setPronunciationUKAudio(String pronunciationUKAudio) {
        this.pronunciationUKAudio = pronunciationUKAudio;
    }

    public String getPronunciationUK() {
        return pronunciationUK;
    }

    public void setPronunciationUK(String pronunciationUK) {
        this.pronunciationUK = pronunciationUK;
    }

    public String getPronunciationUSAudio() {
        return pronunciationUSAudio;
    }

    public void setPronunciationUSAudio(String pronunciationUSAudio) {
        this.pronunciationUSAudio = pronunciationUSAudio;
    }

    public String getPronunciationUS() {
        return pronunciationUS;
    }

    public void setPronunciationUS(String pronunciationUS) {
        this.pronunciationUS = pronunciationUS;
    }

    public List<Type> getTypes() {
        return types;
    }

    public void setTypes(List<Type> types) {
        this.types = types;
    }

    public List<String> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(List<String> synonyms) {
        this.synonyms = synonyms;
    }

    public List<String> getAntonyms() {
        return antonyms;
    }

    public void setAntonyms(List<String> antonyms) {
        this.antonyms = antonyms;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }
}
