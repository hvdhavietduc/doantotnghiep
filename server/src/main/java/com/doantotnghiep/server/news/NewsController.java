package com.doantotnghiep.server.news;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.news.dto.CreateNewsRequest;
import com.doantotnghiep.server.news.dto.UpdateNewsRequest;
import com.doantotnghiep.server.news.response.AllNewsResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @GetMapping("/all")
    public ResponseEntity<AllNewsResponse> getAllNews(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam(value = "size", defaultValue = "10") Integer size) throws Exception {
        try {
            return newsService.getAllNews(page, size);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<News> getNewsById(@RequestParam("id") String id) throws ResponseException {
        try {
            return newsService.getNewsById(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PostMapping("")
    public ResponseEntity<News> createNews(@RequestBody @Valid CreateNewsRequest request, BindingResult bindingResult) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return newsService.createNews(request);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("")
    public ResponseEntity<Boolean> updateNews(@RequestBody @Valid UpdateNewsRequest request, BindingResult bindingResult) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return newsService.updateNews(request);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteNews(@RequestParam("id") String id) throws ResponseException {
        try {
            return newsService.deleteNews(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
