package com.doantotnghiep.server.videoCategory.response;

import com.doantotnghiep.server.videoCategory.VideoCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllVideoCategory {
    public List<VideoCategory> videoCategories;
    public Integer total;
    public Integer totalPage;
}
