package com.doantotnghiep.server.readNews;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadNewsRepository extends MongoRepository<ReadNews, String> {

}
