package com.doantotnghiep.server.user;

import com.doantotnghiep.server.config.JwtAuthenticationFilter;
import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.user.Response.AllUserResponse;
import com.doantotnghiep.server.user.Response.UserResponse;
import com.doantotnghiep.server.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(HttpServletRequest request) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return userService.getUserById(user.getId());
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<AllUserResponse> getAllUser(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            return userService.getAllUser(page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteUser(@RequestParam String id) throws ResponseException {
        try {
            return userService.deleteUser(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
