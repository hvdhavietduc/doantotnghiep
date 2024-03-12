package com.doantotnghiep.server.wordCategory.response;

import com.doantotnghiep.server.word.Word;
import lombok.Builder;

import java.util.List;
@Builder
public class AllWordInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<Word> words;
}
