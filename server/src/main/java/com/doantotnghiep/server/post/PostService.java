package com.doantotnghiep.server.post;

import com.doantotnghiep.server.cloudinary.CloudinaryService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.post.dto.CreatePostRequest;
import com.doantotnghiep.server.post.dto.UpdatePostRequest;
import com.doantotnghiep.server.post.response.AllPostResponse;
import com.doantotnghiep.server.post.response.PostResponse;
import com.doantotnghiep.server.user.Response.UserResponse;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class PostService {
    private final PostRepository postRepository;
    private final CloudinaryService cloudinaryService;
    private final UserService userService;

    public ResponseEntity<PostResponse> createPost(String userId, CreatePostRequest request) throws ResponseException {
        try {
            String urlImage = "";
            if (request.getImage() != null) {
                urlImage = cloudinaryService.uploadFile(request.getImage());
            }

            Post post = new Post();
            post.setTitle(request.getTitle());
            post.setContent(request.getContent());
            post.setImage(urlImage);
            post.setCreatedAt(new Date());
            post.setUpdatedAt(new Date());
            post.setAuthorId(userId);
            post.setCommentIds(new ArrayList<>());

            Post newPost = postRepository.save(post);
            UserResponse user = userService.getUserById(userId).getBody();

            PostResponse response = PostResponse.builder()
                    .id(newPost.getId())
                    .title(newPost.getTitle())
                    .content(newPost.getContent())
                    .image(newPost.getImage())
                    .createdAt(newPost.getCreatedAt())
                    .updatedAt(newPost.getUpdatedAt())
                    .totalComment(newPost.getCommentIds().size())
                    .author(user)
                    .build();
            return ResponseEntity.ok(response);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<Boolean> deletePost(String userId, String id) throws ResponseException {
        try {
            Post post = postRepository.findByIdAndAuthorId(id, userId);
            if (post == null) {
                throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
            }

            postRepository.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());

        }
    }

    public ResponseEntity<PostResponse> updatePost(String userId, UpdatePostRequest request) throws ResponseException {
        try {
            Post post = postRepository.findByIdAndAuthorId(request.getId(), userId);
            if (post == null) {
                throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
            }

            String urlImage = "";
            if (request.getImage() != null) {
                urlImage = cloudinaryService.uploadFile(request.getImage());
            }

            post.setTitle(request.getTitle());
            post.setContent(request.getContent());
            post.setImage(urlImage);
            post.setUpdatedAt(new Date());

            postRepository.save(post);
            UserResponse user = userService.getUserById(userId).getBody();

            PostResponse response = PostResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .image(post.getImage())
                    .createdAt(post.getCreatedAt())
                    .updatedAt(post.getUpdatedAt())
                    .totalComment(post.getCommentIds().size())
                    .author(user)
                    .build();

            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<PostResponse> getPostById(String userId, String postId) throws ResponseException {
        try {
            Post post = postRepository.findByIdAndAuthorId(postId, userId);
            if (post == null) {
                throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
            }
            UserResponse user = userService.getUserById(userId).getBody();

            PostResponse response = PostResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .image(post.getImage())
                    .createdAt(post.getCreatedAt())
                    .updatedAt(post.getUpdatedAt())
                    .totalComment(post.getCommentIds().size())
                    .author(user)
                    .build();
            return ResponseEntity.ok(response);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllPostResponse> getAllPostByUserId(String userId, Integer page, Integer size) throws ResponseException {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Post> postPage = postRepository.findAllByAuthorId(userId, paging);
        List<Post> posts = postPage.getContent();

        List<PostResponse> postResponses = new ArrayList<>();
        UserResponse user = userService.getUserById(userId).getBody();
        for (Post post : posts) {
            PostResponse response = PostResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .image(post.getImage())
                    .createdAt(post.getCreatedAt())
                    .updatedAt(post.getUpdatedAt())
                    .totalComment(post.getCommentIds().size())
                    .author(user)
                    .build();
            postResponses.add(response);
        }

        Integer total = postResponses.size();
        Integer totalPage = postPage.getTotalPages();
        AllPostResponse response = AllPostResponse.builder()
                .listPost(postResponses)
                .total(total)
                .totalPage(totalPage)
                .build();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<AllPostResponse> getAllPost(Integer page, Integer size) throws ResponseException {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        List<Post> posts = postRepository.findAll(paging).getContent();

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : posts) {
            UserResponse user = userService.getUserById(post.getAuthorId()).getBody();
            PostResponse response = PostResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .image(post.getImage())
                    .createdAt(post.getCreatedAt())
                    .updatedAt(post.getUpdatedAt())
                    .totalComment(post.getCommentIds().size())
                    .author(user)
                    .build();
            postResponses.add(response);
        }

        Integer total = postResponses.size();
        Integer totalPage = Math.toIntExact(Math.round((double) total / size + 0.5));
        AllPostResponse response = AllPostResponse.builder()
                .listPost(postResponses)
                .total(total)
                .totalPage(totalPage)
                .build();

        return ResponseEntity.ok(response);
    }

}

