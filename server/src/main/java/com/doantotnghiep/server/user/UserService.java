package com.doantotnghiep.server.user;

import com.doantotnghiep.server.comment.CommentRepository;
import com.doantotnghiep.server.common.ErrorEnum.AuthErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.FolderRepository;
import com.doantotnghiep.server.folder.FolderService;
import com.doantotnghiep.server.post.PostRepository;
import com.doantotnghiep.server.user.Response.AllUserResponse;
import com.doantotnghiep.server.user.Response.UserResponse;
import com.doantotnghiep.server.wordFolder.WordFolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final FolderRepository folderRepository;
    private final CommentRepository commentRepository;
    private final WordFolderRepository wordFolderRepository;

    public ResponseEntity<UserResponse> getUserById(String userId) throws ResponseException {
        try {
            User user = userRepository.findUsersById(userId);
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            UserResponse response = UserResponse.builder()
                    .username(user.getUsername())
                    .id(userId)
                    .name(user.getName())
                    .role(user.getRole())
                    .email(user.getEmail())
                    .avatar(user.getAvatar())
                    .build();
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllUserResponse> getAllUser(Integer page, Integer size) throws ResponseException {
        Pageable paging = PageRequest.of(page, size, Sort.by("name").descending());
        Page<User> userPage = userRepository.findAll(paging);
        List<User> users = userPage.getContent();
        List<UserResponse> allUsers = users.stream()
                .filter(user -> user.getRole() != Role.ADMIN)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getName(),
                        user.getEmail(),
                        user.getAvatar(),
                        user.getRole()
                ))
                .toList();

        long total = userRepository.count();
        Integer totalPage = userPage.getTotalPages();

        AllUserResponse response = AllUserResponse.builder()
                .total(total)
                .totalPage(totalPage)
                .users(allUsers)
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Boolean> deleteUser(String id) throws ResponseException {
        try {
            User user = userRepository.findUsersById(id);
            this.deleteAllObjectRelatedUser(id);
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            userRepository.deleteUserById(id);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public void deleteAllObjectRelatedUser(String userId) {
        postRepository.deleteAllByAuthorId(userId);
        folderRepository.deleteAllByUserId(userId);
        commentRepository.deleteAllByAuthorId(userId);
        wordFolderRepository.deleteAllByAuthorId(userId);
    }

}
