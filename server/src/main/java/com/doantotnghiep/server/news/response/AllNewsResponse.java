package com.doantotnghiep.server.news.response;

import com.doantotnghiep.server.news.News;
import lombok.Builder;

import java.util.List;

@Builder
public class AllNewsResponse {
    public Integer total;
    public List<News> listNews;

    public AllNewsResponse(Integer total, List<News> listNews) {
        this.total = total;
        this.listNews = listNews;
    }
}
