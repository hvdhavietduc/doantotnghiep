package com.doantotnghiep.server.newsCategory.response;

import com.doantotnghiep.server.news.News;
import lombok.Builder;

import java.util.List;
@Builder
public class AllNewsInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<News> newsList;
}
