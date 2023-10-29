package com.doantotnghiep.server.user;

import com.doantotnghiep.server.exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser() throws ResponseException {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
        }
    }

}
