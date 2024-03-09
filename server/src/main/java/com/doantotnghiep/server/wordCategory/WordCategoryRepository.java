package com.doantotnghiep.server.wordCategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordCategoryRepository extends MongoRepository<WordCategory, String> {
    WordCategory findByName(String name);
    Page<WordCategory> findAll(Pageable pageable);
}
