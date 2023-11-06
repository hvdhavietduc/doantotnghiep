package com.doantotnghiep.server.userTestToeic;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTestToeicRepository extends MongoRepository<UserTestToeic, String> {
}
