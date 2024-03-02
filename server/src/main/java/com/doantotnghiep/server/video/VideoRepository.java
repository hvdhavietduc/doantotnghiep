package com.doantotnghiep.server.video;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    Page<Video> findAll(Pageable pageable);

    Integer countAllBy();
}
