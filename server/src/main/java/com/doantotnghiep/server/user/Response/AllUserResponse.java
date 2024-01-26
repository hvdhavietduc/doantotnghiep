package com.doantotnghiep.server.user.Response;

import com.doantotnghiep.server.user.User;
import lombok.Builder;

import java.util.List;
@Builder
public class AllUserResponse {
    public long total;
    public Integer totalPage;
    public List<UserResponse> users;
}
