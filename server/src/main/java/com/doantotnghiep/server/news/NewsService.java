package com.doantotnghiep.server.news;

import com.doantotnghiep.server.common.NewsErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.news.dto.CreateNewsRequest;
import com.doantotnghiep.server.news.dto.UpdateNewsRequest;
import com.doantotnghiep.server.news.response.AllNewsResponse;
import lombok.RequiredArgsConstructor;
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

    public ResponseEntity<News> createNews(CreateNewsRequest request) {
        News news = new News();
        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setCreatedAt(new Date());
        news.setUpdatedAt(new Date());
        return ResponseEntity.ok(newsRepository.save(news));

    }

    public ResponseEntity<Boolean> updateNews(UpdateNewsRequest request) throws ResponseException {
        try {
            String id = request.getId();
            News news = newsRepository.findById(id).orElse(null);
            if (news == null) {
                throw new ResponseException(NewsErrorEnum.NEWS_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            news.setTitle(request.getTitle());
            news.setContent(request.getContent());
            news.setUpdatedAt(new Date());
            newsRepository.save(news);
            return ResponseEntity.ok(true);
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
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllNewsResponse> getAllNews(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Integer total = newsRepository.countAllBy();
        List<News> listNews = newsRepository.findAll(paging).getContent();
        AllNewsResponse response = AllNewsResponse.builder()
                .total(total)
                .listNews(listNews)
                .build();
        return ResponseEntity.ok(response);
    }
}
