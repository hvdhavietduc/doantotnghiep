package com.doantotnghiep.server.comment;

import com.doantotnghiep.server.comment.response.CommentOfCommentResponse;
import com.doantotnghiep.server.common.ErrorEnum.AuthErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.post.Post;
import com.doantotnghiep.server.post.PostRepository;
import com.doantotnghiep.server.post.PostService;
import com.doantotnghiep.server.user.User;
import com.doantotnghiep.server.user.UserRepository;
import com.doantotnghiep.server.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public ResponseEntity<Comment> createComment(String userId, String postId, String content, String parentId) throws ResponseException {
        User user = userRepository.findUsersById(userId);
        if (user == null) {
            throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
        }

        Post post = postRepository.findPostById(postId);
        if (post == null) {
            throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
        }

        Comment commentParent = commentRepository.findCommentById(parentId);
        if (parentId != null && commentParent == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }

        if (parentId != null && !commentParent.getIsLevel1()) {
            commentParent = commentRepository.findCommentById(commentParent.getParentId());
            parentId = commentParent.getId();
        }

        Comment comment = Comment.builder()
                .childIds(new ArrayList<>())
                .content(content)
                .authorId(userId)
                .postId(postId)
                .createdAt(new Date())
                .updatedAt(new Date())
                .parentId(parentId)
                .isLevel1(parentId == null)
                .build();

        Comment savedComment = commentRepository.save(comment);

        if (parentId != null) {
            commentParent.getChildIds().add(savedComment.getId());
            commentRepository.save(commentParent);
        } else {
            post.getCommentIds().add(savedComment.getId());
            postRepository.save(post);
        }

        return ResponseEntity.ok(savedComment);
    }

    public ResponseEntity<Comment> deleteCommentOfPost(String userId, String commentId, String postId) throws ResponseException {
        Comment comment = commentRepository.findCommentByIdAndAuthorId(commentId, userId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }
        commentRepository.delete(comment);

        Post post = postRepository.findPostById(postId);
        if (post == null) {
            throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
        }
        post.getCommentIds().remove(commentId);
        return ResponseEntity.ok(comment);
    }

    public ResponseEntity<Comment> deleteCommentOfComment(String userId,String commentId, String parentId) throws ResponseException {
        Comment comment = commentRepository.findCommentByIdAndAuthorId(commentId, userId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }
        commentRepository.delete(comment);

        Comment commentParent = commentRepository.findCommentById(parentId);
        if (commentParent == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }
        commentParent.getChildIds().remove(commentId);
        return ResponseEntity.ok(comment);
    }

    public ResponseEntity<CommentOfCommentResponse> getCommentOfComment(String commentId, Integer page, Integer size) throws ResponseException {
        Comment comment = commentRepository.findCommentById(commentId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        Page<Comment> commentPage = commentRepository.findAllByIdIn(comment.getChildIds(), pageable);

        List<Comment> comments = commentPage.getContent();

        CommentOfCommentResponse response = CommentOfCommentResponse.builder()
                .comments(comments)
                .totalPage(commentPage.getTotalPages())
                .total(comments.size())
                .build();

        return ResponseEntity.ok(response);
    }
}
