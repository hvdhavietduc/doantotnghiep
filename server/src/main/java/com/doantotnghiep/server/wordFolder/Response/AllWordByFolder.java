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
}
