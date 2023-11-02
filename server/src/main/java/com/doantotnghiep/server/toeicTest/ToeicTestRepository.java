package com.doantotnghiep.server.toeicTest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToeicTestRepository extends MongoRepository<ToeicTest, String> {
}
