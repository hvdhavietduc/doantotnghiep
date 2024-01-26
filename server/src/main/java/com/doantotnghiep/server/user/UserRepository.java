package com.doantotnghiep.server.user;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);
    User findUsersById(String id);
    @Nonnull
    Page<User> findAll(@Nonnull Pageable pageable);
    long count();
    void deleteUserById(String id);

}
