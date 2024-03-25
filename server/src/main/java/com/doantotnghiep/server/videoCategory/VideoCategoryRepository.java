package com.doantotnghiep.server.videoCategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCategoryRepository extends MongoRepository<VideoCategory, String> {
    VideoCategory findByName(String name);
    Page<VideoCategory> findAll(Pageable pageable);
}
