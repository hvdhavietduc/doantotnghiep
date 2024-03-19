package com.doantotnghiep.server.quiz;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.quiz.dto.CreateQuizRequest;
import com.doantotnghiep.server.quiz.dto.UpdateQuizRequest;
import com.doantotnghiep.server.quiz.response.AllQuizResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @GetMapping("/all")
    public ResponseEntity<AllQuizResponse> getAllQuiz(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return quizService.getAllQuiz(page, size);
    }

    @GetMapping("")
    public ResponseEntity<Quiz> getQuizById(@RequestParam String id) throws ResponseException {
        return quizService.getQuizById(id);
    }

    @PostMapping("")
    public ResponseEntity<Quiz> createQuiz(@Valid  @ModelAttribute CreateQuizRequest createQuizRequest, BindingResult bindingResult) throws ResponseException, IOException {
        validateExceptionHandle.handleException(bindingResult);
        return quizService.createQuiz(createQuizRequest);
    }

    @PutMapping("")
    public ResponseEntity<Quiz> updateQuiz(@Valid @ModelAttribute UpdateQuizRequest updateQuizRequest, BindingResult bindingResult) throws ResponseException, IOException {
        validateExceptionHandle.handleException(bindingResult);
        return quizService.updateQuiz(updateQuizRequest);
    }

    @DeleteMapping("")
    public ResponseEntity<Quiz> deleteQuiz(@RequestParam String id) throws ResponseException {
        return quizService.deleteQuizById(id);
    }

}
