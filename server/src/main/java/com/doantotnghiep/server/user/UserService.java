package com.doantotnghiep.server.user;

import com.doantotnghiep.server.common.ErrorEnum.AuthErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.user.Response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<UserResponse> getMe(String userId) throws ResponseException {
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

}
