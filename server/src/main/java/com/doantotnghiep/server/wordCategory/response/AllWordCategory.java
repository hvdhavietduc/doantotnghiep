package com.doantotnghiep.server.wordCategory.response;

import com.doantotnghiep.server.wordCategory.WordCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllWordCategory {
    public List<WordCategory> wordCategories;
    public Integer total;
    public Integer totalPage;
}
