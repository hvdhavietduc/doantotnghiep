package com.doantotnghiep.server.CrawWord;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.word.Word;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/craw")
@RequiredArgsConstructor
public class CrawWordController {
    private final CrawWordService crawWordService;
    @GetMapping("")
    public Word crawWord(@RequestParam String word) throws IOException, ResponseException {
        return crawWordService.crawWord(word);
    }
}
