package com.doantotnghiep.server.word.Response;

import com.doantotnghiep.server.word.Word;
import lombok.Builder;

import java.util.List;
@Builder
public class AllWordByCategory {
    public Integer total;
    public Integer totalPage;
    public List<Word> words;
    public AllWordByCategory(Integer total, Integer totalPage, List<Word> words) {
        this.total = total;
        this.totalPage = totalPage;
        this.words = words;
    }
}
