package com.doantotnghiep.server.wordFolder.Response;

import com.doantotnghiep.server.wordFolder.WordFolder;
import lombok.Builder;

import java.util.List;

@Builder
public class AllWordByFolder {
    public Integer total;
    public String folder;
    public Integer totalPage;
    public List<WordFolder> words;
    public AllWordByFolder(Integer total, Integer totalPage, List<WordFolder> words) {
        this.total = total;
        this.totalPage = totalPage;
        this.words = words;
    }
}
