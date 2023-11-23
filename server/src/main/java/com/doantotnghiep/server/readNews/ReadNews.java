package com.doantotnghiep.server.readNews;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class ReadNews {
    @Id
    public String id;
    @Field
    public String userId;
    @Field
    public List<String> newsIds;

    public ReadNews() {
    }

    public ReadNews(String userId, List<String> newsIds) {
        this.userId = userId;
        this.newsIds = newsIds;
    }

    public void appendNewsId(String newsId) {
        this.newsIds.add(newsId);
    }
}
