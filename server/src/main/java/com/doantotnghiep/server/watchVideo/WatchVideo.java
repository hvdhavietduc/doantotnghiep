package com.doantotnghiep.server.watchVideo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class WatchVideo {
    @Id
    public String id;
    @Field
    public String userId;
    @Field
    public List<String> videoIds;

    public WatchVideo() {
    }

    public WatchVideo(String userId, List<String> videoIds) {
        this.userId = userId;
        this.videoIds = videoIds;
    }

    public void appendVideoId(String videoId) {
        this.videoIds.add(videoId);
    }
}
