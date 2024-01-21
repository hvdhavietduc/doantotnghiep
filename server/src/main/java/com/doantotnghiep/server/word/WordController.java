package com.doantotnghiep.server.word;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.user.User;
import com.doantotnghiep.server.word.Response.AllWordByCategory;
import com.doantotnghiep.server.word.Response.AllWordByFolder;
import com.doantotnghiep.server.word.dto.AddWordToCategoryRequest;
import com.doantotnghiep.server.word.dto.AddWordToFolderRequest;
import com.doantotnghiep.server.word.dto.RemoveWordFromCategoryRequest;
import com.doantotnghiep.server.word.dto.RemoveWordFromFolderRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/words")
public class WordController {
    private final WordService wordService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/name/{name}")
    public ResponseEntity<Word> getWordByName(@PathVariable String name) throws ResponseException, IOException {
        return wordService.getWordByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Word> getWordById(@PathVariable String id) throws ResponseException, IOException {
        return wordService.getWordById(id);
    }

    @GetMapping("/folder")
    public ResponseEntity<AllWordByFolder> getAllWordByFolderId(
            HttpServletRequest request,
            @RequestParam String folderId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return wordService.getAllWordByFolderId(user.getId(), folderId, page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/category")
    public ResponseEntity<AllWordByCategory> getAllWordByCategoryId(
            @RequestParam String categoryId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) throws ResponseException {
        try {
            return wordService.getAllWordByCategory(categoryId, page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PostMapping("/folder")
    public ResponseEntity<Boolean> addWordToFolder(
            HttpServletRequest request,
            @RequestBody AddWordToFolderRequest addWordToFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            User user = jwtService.getUserFromHeader(request);
            return wordService.addWordToFolder(user.getId(), addWordToFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PostMapping("/category")
    public ResponseEntity<Boolean> addWordToCategory(
            @RequestBody AddWordToCategoryRequest addWordToFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return wordService.addWordToCategory(addWordToFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("/folder")
    public ResponseEntity<Boolean> deleteWordFromFolder(
            HttpServletRequest request,
            @RequestBody RemoveWordFromFolderRequest removeWordFromFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            User user = jwtService.getUserFromHeader(request);
            return wordService.removeWordFromFolder(user.getId(), removeWordFromFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("/category")
    public ResponseEntity<Boolean> deleteWordFromCategory(
            @RequestBody RemoveWordFromCategoryRequest removeWordFromFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return wordService.removeWordFromCategory(removeWordFromFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<List<String>> searchWordHave(@PathVariable String key) throws ResponseException {
        try {
            return wordService.searchWordHave(key);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
