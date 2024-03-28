package com.doantotnghiep.server.newsCategory;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.newsCategory.dto.CreateNewsCategoryRequest;
import com.doantotnghiep.server.newsCategory.dto.UpdateNewsCategoryRequest;
import com.doantotnghiep.server.newsCategory.response.AllNewsCategory;
import com.doantotnghiep.server.newsCategory.response.AllNewsInCategory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/newsCategory")
public class NewsCategoryController {
    private final NewsCategoryService newsCategoryService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public AllNewsCategory getAllNewsCategory(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
        return newsCategoryService.getAllNewsCategory(page, size);
    }

    @PostMapping("")
    public NewsCategory createNewsCategory(@Valid @RequestBody CreateNewsCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return newsCategoryService.createNewsCategory(request.getName());
    }

    @GetMapping("/{id}")
    public NewsCategory getNewsCategoryById(@PathVariable String id) throws ResponseException {
        return newsCategoryService.getNewsCategoryById(id);
    }

    @GetMapping("/name")
    public NewsCategory getNewsCategoryByName(@RequestParam String name) throws ResponseException {
        return newsCategoryService.getNewsCategoryByName(name);
    }

    @PutMapping("")
    public NewsCategory updateNewsCategory(@Valid @RequestBody UpdateNewsCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return newsCategoryService.updateNewsCategory(request.getId(), request.getName());
    }

    @DeleteMapping("/{id}")
    public NewsCategory deleteNewsCategory(@PathVariable String id) throws ResponseException {
        return newsCategoryService.deleteNewsCategory(id);
    }

    @GetMapping("/{id}/news")
    public AllNewsInCategory getAllNewsInCategory(@PathVariable String id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return newsCategoryService.getAllNewsInCategory(id, page, size);
    }

}
