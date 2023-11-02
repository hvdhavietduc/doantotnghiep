package com.doantotnghiep.server.playQuiz;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayQuizRepository extends MongoRepository<PlayQuiz, String> {
}
