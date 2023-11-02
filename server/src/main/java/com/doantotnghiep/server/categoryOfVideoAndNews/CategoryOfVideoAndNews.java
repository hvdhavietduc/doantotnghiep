package com.doantotnghiep.server.categoryOfVideoAndNews;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class CategoryOfVideoAndNews {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public List<String> videoIds;
    @Field
    public List<String> newsIds;

    public CategoryOfVideoAndNews() {
    }

    public CategoryOfVideoAndNews(String name, List<String> videoIds, List<String> newsIds) {
        this.name = name;
        this.videoIds = videoIds;
        this.newsIds = newsIds;
    }

    public void appendVideoId(String videoId) {
        this.videoIds.add(videoId);
    }

    public void appendNewsId(String newsId) {
        this.newsIds.add(newsId);
    }
}
