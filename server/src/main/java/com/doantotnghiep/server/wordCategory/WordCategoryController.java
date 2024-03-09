package com.doantotnghiep.server.wordCategory;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.wordCategory.dto.CreateWordCategoryRequest;
import com.doantotnghiep.server.wordCategory.dto.UpdateWordCategoryRequest;
import com.doantotnghiep.server.wordCategory.response.AllWordCategory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wordCategory")
public class WordCategoryController {
    private final WordCategoryService wordCategoryService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public AllWordCategory getAllWordCategory(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
        return wordCategoryService.getAllWordCategory(page, size);
    }

    @PostMapping("")
    public WordCategory createWordCategory(@Valid @RequestBody CreateWordCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return wordCategoryService.createWordCategory(request.getName());
    }

    @GetMapping("/{id}")
    public WordCategory getWordCategoryById(@PathVariable String id) throws ResponseException {
        return wordCategoryService.getWordCategoryById(id);
    }

    @GetMapping("/name")
    public WordCategory getWordCategoryByName(@RequestParam String name) throws ResponseException {
        return wordCategoryService.getWordCategoryByName(name);
    }

    @PutMapping("")
    public WordCategory updateWordCategory(@Valid @RequestBody UpdateWordCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return wordCategoryService.updateWordCategory(request.getId(), request.getName());
    }

    @DeleteMapping("/{id}")
    public WordCategory deleteWordCategory(@PathVariable String id) throws ResponseException {
        return wordCategoryService.deleteWordCategory(id);
    }

}
