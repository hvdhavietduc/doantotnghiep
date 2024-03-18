package com.doantotnghiep.server.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    Post findByIdAndAuthorId(String id, String authorId);
    Page<Post> findAllByAuthorId(String authorId, Pageable pageable);
    Page<Post> getAllBy(Pageable pageable);
    Post findPostById(String postId);
}
