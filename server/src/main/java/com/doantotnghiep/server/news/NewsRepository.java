package com.doantotnghiep.server.news;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {
    Optional<News> findById(String id);
    Page<News> findAll(Pageable pageable);
    Page<News> findAllByTitleContaining(String title, Pageable pageable);
    Page<News> findAllByContentContaining(String content, Pageable pageable);
    Integer countAllBy();
}
