package com.doantotnghiep.server.wordCategory.response;

import lombok.Builder;

import java.util.List;
@Builder
public class AllWordInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<String> words;
}
