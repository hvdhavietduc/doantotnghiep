package com.doantotnghiep.server.categoryOfVideoAndNews;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryOfVideoAndNewsRepository extends MongoRepository<CategoryOfVideoAndNews, String> {
}
