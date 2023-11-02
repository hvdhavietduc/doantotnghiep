package com.doantotnghiep.server.watchVideo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchVideoRepository extends MongoRepository<WatchVideo, String> {
}
