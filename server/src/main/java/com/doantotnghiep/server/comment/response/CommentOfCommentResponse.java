package com.doantotnghiep.server.comment.response;

import com.doantotnghiep.server.comment.Comment;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentOfCommentResponse {
    Integer total;
    Integer totalPage;
    List<Comment> comments;
}
