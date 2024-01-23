package com.doantotnghiep.server.word;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends MongoRepository<Word, String> {
    Word findByName(String name);
    Page<Word> findAllByIdIn(List<String> ids, Pageable pageable);
    List<Word> findAllByNameContains(String key);

    Word findAllById(String id);
}
