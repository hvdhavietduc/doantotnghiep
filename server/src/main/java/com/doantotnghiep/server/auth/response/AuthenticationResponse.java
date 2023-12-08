package com.doantotnghiep.server.auth.response;

import lombok.*;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String username;
    private String email;
    private String role;
    private String id;
    private String avatar;

    public AuthenticationResponse(String token, String username, String email, String role, String id) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.role = role;
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
