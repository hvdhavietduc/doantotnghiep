package com.doantotnghiep.server.wordCategory;

import com.doantotnghiep.server.common.ErrorEnum.WordErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.word.Word;
import com.doantotnghiep.server.word.WordRepository;
import com.doantotnghiep.server.wordCategory.response.AllWordCategory;
import com.doantotnghiep.server.wordCategory.response.AllWordInCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class WordCategoryService {
    private final WordCategoryRepository wordCategoryRepository;
    private final WordRepository wordRepository;

    public AllWordCategory getAllWordCategory(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<WordCategory> wordCategories = wordCategoryRepository.findAll(paging);

        return AllWordCategory.builder()
                .wordCategories(wordCategories.getContent())
                .total((int) wordCategories.getTotalElements())
                .totalPage(wordCategories.getTotalPages())
                .build();

    }

    public WordCategory createWordCategory(String name) throws ResponseException {
        WordCategory wordCategory = wordCategoryRepository.findByName(name);
        if(wordCategory != null) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }
        
        WordCategory newWordCategory = WordCategory.builder()
                .name(name)
                .createdAt(new Date())
                .updatedAt(new Date())
                .wordIds(new ArrayList<>())
                .build();
        return wordCategoryRepository.save(newWordCategory);
    }

    public WordCategory getWordCategoryByName(String name) throws ResponseException {
        WordCategory wordCategory = wordCategoryRepository.findByName(name);
        if (wordCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 400);
        }
        return wordCategory;
    }

    public WordCategory getWordCategoryById(String id) throws ResponseException {
        WordCategory wordCategory = wordCategoryRepository.findById(id).orElse(null);
        if (wordCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        return wordCategory;
    }

    public WordCategory updateWordCategory(String id, String name) throws ResponseException {
        WordCategory wordCategory = wordCategoryRepository.findById(id).orElse(null);
        if (wordCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }

        WordCategory categoryExist = wordCategoryRepository.findByName(name);
        if(categoryExist != null && !categoryExist.getId().equals(id)) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }

        wordCategory.setName(name);
        wordCategory.setUpdatedAt(new Date());
        return wordCategoryRepository.save(wordCategory);
    }

    public WordCategory deleteWordCategory(String id) throws ResponseException {
        WordCategory wordCategory = wordCategoryRepository.findById(id).orElse(null);
        if (wordCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        wordCategoryRepository.delete(wordCategory);
        return wordCategory;
    }

}
