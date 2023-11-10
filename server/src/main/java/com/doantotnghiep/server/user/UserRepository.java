package com.doantotnghiep.server.user;

import jakarta.annotation.Nullable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);
    User findUsersById(String id);

}
