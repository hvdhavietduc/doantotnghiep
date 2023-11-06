package com.doantotnghiep.server.user;

import com.doantotnghiep.server.config.JwtAuthenticationFilter;
import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/all")
    public List<User> getAllUser(HttpServletRequest request) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return userService.getAllUser();
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
        }
    }

    @GetMapping("/getMe")
    public User getMe(HttpServletRequest request) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return user;
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
        }
    }

}
