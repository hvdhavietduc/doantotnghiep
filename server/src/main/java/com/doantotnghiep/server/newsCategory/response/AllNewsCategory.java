package com.doantotnghiep.server.newsCategory.response;

import com.doantotnghiep.server.newsCategory.NewsCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllNewsCategory {
    public List<NewsCategory> newsCategories;
    public Integer total;
    public Integer totalPage;
}
