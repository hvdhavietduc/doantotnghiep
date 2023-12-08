package com.doantotnghiep.server.folder.response;

import com.doantotnghiep.server.folder.Folder;
import lombok.Builder;

import java.util.List;
@Builder
public class AllFolderResponse {
    public Integer total;
    public Integer totalPage;
    public List<Folder> folders;

    public AllFolderResponse(Integer total, Integer totalPage, List<Folder> folders) {
        this.total = total;
        this.totalPage = totalPage;
        this.folders = folders;
    }
}
