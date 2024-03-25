package com.doantotnghiep.server.newsCategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsCategoryRepository extends MongoRepository<NewsCategory, String> {
    NewsCategory findByName(String name);
    Page<NewsCategory> findAll(Pageable pageable);
}
