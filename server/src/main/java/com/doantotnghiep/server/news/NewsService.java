package com.doantotnghiep.server.news;

import com.doantotnghiep.server.common.ErrorEnum.NewsErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.news.dto.CreateNewsRequest;
import com.doantotnghiep.server.news.dto.UpdateNewsRequest;
import com.doantotnghiep.server.news.response.AllNewsResponse;
import com.doantotnghiep.server.newsCategory.NewsCategory;
import com.doantotnghiep.server.newsCategory.NewsCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class NewsService {
    private final NewsRepository newsRepository;
    private final NewsCategoryRepository newsCategoryRepository;

    public ResponseEntity<News> getNewsById(String id) throws ResponseException {
        try {
            News news = newsRepository.findById(id).orElse(null);
            if (news == null) {
                throw new ResponseException(NewsErrorEnum.NEWS_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            return ResponseEntity.ok(news);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<News> createNews(CreateNewsRequest request) throws ResponseException {
        News news = new News();
        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setCreatedAt(new Date());
        news.setUpdatedAt(new Date());
        news.setCategoryId(request.getCategoryId());

        News newNews = newsRepository.save(news);
        NewsCategory newsCategory = newsCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (newsCategory != null) {
            newsCategory.getNewsIds().add(newNews.getId());
            newsCategoryRepository.save(newsCategory);
        }
        else{
            throw new ResponseException("Category not found", HttpStatus.NOT_FOUND, 404);
        }

        return ResponseEntity.ok(newNews);
    }

    public ResponseEntity<News> updateNews(UpdateNewsRequest request) throws ResponseException {
        try {
            String id = request.getId();
            News news = newsRepository.findById(id).orElse(null);
            if (news == null) {
                throw new ResponseException(NewsErrorEnum.NEWS_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            news.setTitle(request.getTitle());
            news.setContent(request.getContent());
            news.setUpdatedAt(new Date());
            News response = newsRepository.save(news);
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Boolean> deleteNews(String id) throws ResponseException {
        try {
            News news = newsRepository.findById(id).orElse(null);
            if (news == null) {
                throw new ResponseException(NewsErrorEnum.NEWS_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            newsRepository.deleteById(id);

            NewsCategory newsCategory = newsCategoryRepository.findById(news.getCategoryId()).orElse(null);
            if (newsCategory != null) {
                newsCategory.getNewsIds().remove(id);
                newsCategoryRepository.save(newsCategory);
            }

            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllNewsResponse> getAllNews(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Integer total = newsRepository.countAllBy();
        Page<News> newsPage = newsRepository.findAll(paging);
        List<News> listNews = newsPage.getContent();
        Integer totalPage = newsPage.getTotalPages();
        AllNewsResponse response = AllNewsResponse.builder()
                .total(total)
                .totalPage(totalPage)
                .listNews(listNews)
                .build();
        return ResponseEntity.ok(response);
    }
}
