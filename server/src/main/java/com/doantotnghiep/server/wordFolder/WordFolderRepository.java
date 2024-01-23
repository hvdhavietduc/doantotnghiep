package com.doantotnghiep.server.wordFolder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WordFolderRepository extends MongoRepository<WordFolder, String> {
    Page<WordFolder> findAllByIdIn(List<String> ids, Pageable pageable);

    void deleteById(String id);
    void deleteAllByFolderId(String folderId);

    WordFolder findAllByNameAndFolderId(String name, String folderId);
}
