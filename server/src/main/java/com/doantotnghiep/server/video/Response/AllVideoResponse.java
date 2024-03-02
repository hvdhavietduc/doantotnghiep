package com.doantotnghiep.server.video.Response;

import com.doantotnghiep.server.video.Video;
import lombok.Builder;

import java.util.List;

@Builder
public class AllVideoResponse {
    public Integer total;
    public Integer totalPage;
    public List<Video> videos;
}
