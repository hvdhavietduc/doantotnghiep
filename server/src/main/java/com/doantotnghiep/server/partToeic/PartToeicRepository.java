package com.doantotnghiep.server.partToeic;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartToeicRepository extends MongoRepository<PartToeic, String> {
}
