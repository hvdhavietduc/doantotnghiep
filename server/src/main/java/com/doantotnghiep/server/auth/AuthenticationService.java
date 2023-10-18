package com.doantotnghiep.server.auth;

import com.doantotnghiep.server.auth.dto.AuthenticationRequest;
import com.doantotnghiep.server.auth.dto.RegisterRequest;
import com.doantotnghiep.server.auth.response.AuthenticationResponse;
import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.user.Role;
import com.doantotnghiep.server.user.User;
import com.doantotnghiep.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.WebExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) throws ResponseException {
        try {
            User userExist = userRepository.findUserByUsername(request.getUsername());
            if (userExist != null) {
                throw new Exception("Username already exists");
            }
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            user.setRole(Role.USER);
            userRepository.save(user);
            var token = jwtService.generateToken(user);

            AuthenticationResponse response = new AuthenticationResponse();
            response.setToken(token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
        }

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userRepository.findUserByUsername(request.getUsername());

        return AuthenticationResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
    }
}
