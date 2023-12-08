package com.doantotnghiep.server.post.response;

import lombok.Builder;

import java.util.List;

@Builder
public class AllPostResponse {
    public Integer total;
    public Integer totalPage;
    public List<PostResponse> listPost;
}
