package com.doantotnghiep.server.post.response;

import com.doantotnghiep.server.comment.Comment;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentPostResponse {
    Integer total;
    Integer totalPage;
    List<Comment> comments;
}
