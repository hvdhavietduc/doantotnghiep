package com.doantotnghiep.server.newsCategory;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.news.News;
import com.doantotnghiep.server.news.NewsRepository;
import com.doantotnghiep.server.newsCategory.response.AllNewsCategory;
import com.doantotnghiep.server.newsCategory.response.AllNewsInCategory;
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

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class NewsCategoryService {
    private final NewsCategoryRepository newsCategoryRepository;
    private final NewsRepository newsRepository;

    public AllNewsCategory getAllNewsCategory(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<NewsCategory> newsCategories = newsCategoryRepository.findAll(paging);

        return AllNewsCategory.builder()
                .newsCategories(newsCategories.getContent())
                .total((int) newsCategories.getTotalElements())
                .totalPage(newsCategories.getTotalPages())
                .build();

    }

    public NewsCategory createNewsCategory(String name) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findByName(name);
        if (newsCategory != null) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }

        NewsCategory newNewsCategory = NewsCategory.builder()
                .name(name)
                .createdAt(new Date())
                .updatedAt(new Date())
                .newsIds(new ArrayList<>())
                .build();
        return newsCategoryRepository.save(newNewsCategory);
    }

    public NewsCategory getNewsCategoryByName(String name) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findByName(name);
        if (newsCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 400);
        }
        return newsCategory;
    }

    public NewsCategory getNewsCategoryById(String id) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findById(id).orElse(null);
        if (newsCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        return newsCategory;
    }

    public NewsCategory updateNewsCategory(String id, String name) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findById(id).orElse(null);
        if (newsCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }

        NewsCategory categoryExist = newsCategoryRepository.findByName(name);
        if (categoryExist != null && !categoryExist.getId().equals(id)) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }

        newsCategory.setName(name);
        newsCategory.setUpdatedAt(new Date());
        return newsCategoryRepository.save(newsCategory);
    }

    public NewsCategory deleteNewsCategory(String id) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findById(id).orElse(null);
        if (newsCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        newsCategoryRepository.delete(newsCategory);
        return newsCategory;
    }

    public AllNewsInCategory getAllNewsInCategory(String categoryId, Integer page, Integer size) throws ResponseException {
        NewsCategory newsCategory = newsCategoryRepository.findById(categoryId).orElse(null);
        if (newsCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }

        Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<News> newsPage = newsRepository.findAllByIdIn(newsCategory.getNewsIds(), paging);

        return AllNewsInCategory.builder()
                .category(newsCategory.getName())
                .newsList(newsPage.getContent())
                .total((int) newsPage.getTotalElements())
                .totalPage(newsPage.getTotalPages())
                .build();
    }

}
