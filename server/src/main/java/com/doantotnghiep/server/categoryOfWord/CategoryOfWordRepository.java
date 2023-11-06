package com.doantotnghiep.server.categoryOfWord;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryOfWordRepository extends MongoRepository<CategoryOfWord, String> {
}
