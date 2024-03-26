package com.doantotnghiep.server.comment;

import com.doantotnghiep.server.comment.dto.AddCommentRequest;
import com.doantotnghiep.server.comment.response.CommentOfCommentResponse;
import com.doantotnghiep.server.comment.response.CommentResponse;
import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @PostMapping("")
    public ResponseEntity<CommentResponse> createComment(HttpServletRequest request, @Valid @RequestBody AddCommentRequest addCommentRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            validateExceptionHandle.handleException(bindingResult);
            return commentService.createComment(user.getId(), addCommentRequest.getPostId(), addCommentRequest.getContent(), addCommentRequest.getParentId());
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("/ofPost")
    public ResponseEntity<Comment> deleteCommentOfPost(HttpServletRequest request, @RequestParam String commentId, @RequestParam String postId ) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return commentService.deleteCommentOfPost(user.getId(), commentId, postId);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("/ofComment")
    public ResponseEntity<Comment> deleteCommentOfComment(HttpServletRequest request, @RequestParam String commentId, @RequestParam String parentId ) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return commentService.deleteCommentOfComment(user.getId(), commentId, parentId);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/ofComment")
    public ResponseEntity<CommentOfCommentResponse> getCommentOfComment( @RequestParam String commentId, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            return commentService.getCommentOfComment(commentId, page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
