package com.doantotnghiep.server.auth;

import com.doantotnghiep.server.auth.dto.LoginRequest;
import com.doantotnghiep.server.auth.dto.RegisterRequest;
import com.doantotnghiep.server.auth.dto.ResetPasswordRequest;
import com.doantotnghiep.server.auth.dto.VerifyRequest;
import com.doantotnghiep.server.auth.response.AuthenticationResponse;
import com.doantotnghiep.server.common.ErrorEnum.AuthErrorEnum;
import com.doantotnghiep.server.common.MailMessage.MailMessage;
import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.mailService.MailService;
import com.doantotnghiep.server.user.Role;
import com.doantotnghiep.server.user.User;
import com.doantotnghiep.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    public ResponseEntity<Boolean> register(RegisterRequest request) throws ResponseException {
        try {
            User usernameExist = userRepository.findUserByUsername(request.getUsername());
            if (usernameExist != null) {
                throw new ResponseException(AuthErrorEnum.USERNAME_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);
            }
            User emailExist = userRepository.findUserByEmail(request.getEmail());
            if (emailExist != null) {
                throw new ResponseException(AuthErrorEnum.EMAIL_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);
            }
            String codeVerified = RandomStringUtils.randomAlphanumeric(MailMessage.LENGTH_OF_RANDOM_STRING);
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            user.setRole(Role.USER);
            user.setIsVerified(false);
            user.setVerifyCode(codeVerified);

            userRepository.save(user);
            mailService.sendMail(request.getEmail(), MailMessage.VERIFY_SUBJECT, MailMessage.VERIFY_CONTENT + codeVerified);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }

    }

    public ResponseEntity<AuthenticationResponse> verifyRegister(VerifyRequest request) throws ResponseException {
        try {
            User user = userRepository.findUserByEmail(request.getEmail());
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            if (user.getIsVerified()) {
                throw new ResponseException(AuthErrorEnum.USER_ALREADY_VERIFIED, HttpStatus.BAD_REQUEST, 400);
            }
            if (!user.getVerifyCode().equals(request.getCode())) {
                throw new ResponseException(AuthErrorEnum.WRONG_VERIFY_CODE, HttpStatus.BAD_REQUEST, 400);
            }
            user.setIsVerified(true);
            user.setVerifyCode("");
            userRepository.save(user);
            var token = jwtService.generateToken(user);

            AuthenticationResponse response = AuthenticationResponse.builder()
                    .token(token)
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole().name())
                    .id(user.getId())
                    .avatar(user.getAvatar())
                    .build();
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AuthenticationResponse> authenticate(LoginRequest request) throws ResponseException {
        try {
            User user = userRepository.findUserByUsername(request.getUsername());
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.WRONG_USERNAME_OR_PASSWORD, HttpStatus.BAD_REQUEST, 400);
            }
            if (!user.getIsVerified()) {
                String codeVerified = RandomStringUtils.randomAlphanumeric(MailMessage.LENGTH_OF_RANDOM_STRING);
                user.setVerifyCode(codeVerified);
                userRepository.save(user);
                mailService.sendMail(user.getEmail(), MailMessage.VERIFY_SUBJECT, MailMessage.VERIFY_CONTENT + codeVerified);
                throw new ResponseException(AuthErrorEnum.USER_NOT_VERIFIED, HttpStatus.BAD_REQUEST, 400);
            }
            String password = user.getPassword();
            if (!passwordEncoder.matches(request.getPassword(), password)) {
                throw new ResponseException(AuthErrorEnum.WRONG_USERNAME_OR_PASSWORD, HttpStatus.BAD_REQUEST, 400);
            }
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            AuthenticationResponse response = AuthenticationResponse.builder()
                    .token(jwtService.generateToken(user))
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole().name())
                    .id(user.getId())
                    .avatar(user.getAvatar())
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AuthenticationResponse> logout(String userId) throws ResponseException {
        try {
            User user = userRepository.findUsersById(userId);
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }

            AuthenticationResponse response = AuthenticationResponse.builder()
                    .token("")
                    .username("")
                    .email("")
                    .role("")
                    .id("")
                    .avatar("")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Boolean> forgotPassword(String email) throws ResponseException {
        try {
            User user = userRepository.findUserByEmail(email);
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }

            String code = RandomStringUtils.randomAlphanumeric(MailMessage.LENGTH_OF_RANDOM_STRING);
            user.setVerifyCode(code);
            userRepository.save(user);
            mailService.sendMail(email, MailMessage.FORGORT_PASSWORD_SUBJECT, MailMessage.FORGORT_PASSWORD_CONTENT + code);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }


    public ResponseEntity<Boolean> resetPassword(ResetPasswordRequest request) throws ResponseException {
        try {
            User user = userRepository.findUserByEmail(request.getEmail());
            if (user == null) {
                throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            if (!user.getVerifyCode().equals(request.getCode())) {
                throw new ResponseException(AuthErrorEnum.WRONG_VERIFY_CODE, HttpStatus.NOT_FOUND, 404);
            }
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setVerifyCode("");
            userRepository.save(user);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
