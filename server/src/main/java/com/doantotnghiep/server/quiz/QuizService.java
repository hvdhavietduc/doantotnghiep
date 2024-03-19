package com.doantotnghiep.server.quiz;

import com.doantotnghiep.server.cloudinary.CloudinaryService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.quiz.dto.CreateQuizRequest;
import com.doantotnghiep.server.quiz.dto.UpdateQuizRequest;
import com.doantotnghiep.server.quiz.response.AllQuizResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class QuizService {
    private final QuizRepository quizRepository;
    private final CloudinaryService cloudinaryService;

    public ResponseEntity<Quiz> createQuiz(CreateQuizRequest createQuizRequest) throws ResponseException, IOException {

        String urlImage = "";
        if (createQuizRequest.getImage() != null && (createQuizRequest.getImage() instanceof MultipartFile image)) {
            urlImage = cloudinaryService.uploadImage(image);
        }

        Quiz quiz = Quiz.builder()
                .name(createQuizRequest.getName())
                .description(createQuizRequest.getDescription())
                .totalPoint(createQuizRequest.getTotalPoint())
                .time(createQuizRequest.getTime())
                .image(urlImage)
                .questionIds(new ArrayList<>())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();

        quizRepository.save(quiz);

        return ResponseEntity.ok(quiz);
    }

    public ResponseEntity<Quiz> getQuizById(String quizId) throws ResponseException {
        Quiz quiz = quizRepository.findQuizById(quizId);
        if (quiz == null) {
            throw new ResponseException("Quiz not found", HttpStatus.NOT_FOUND, 404);
        }
        return ResponseEntity.ok(quiz);
    }

    public ResponseEntity<Quiz> updateQuiz(UpdateQuizRequest updateQuizRequest) throws ResponseException, IOException {
        Quiz quiz = quizRepository.findQuizById(updateQuizRequest.getId());
        if (quiz == null) {
            throw new ResponseException("Quiz not found", HttpStatus.NOT_FOUND, 404);
        }

        String urlImage = "";
        if(updateQuizRequest.keepOldImage) {
            urlImage = quiz.getImage();
        } else {
            if (updateQuizRequest.getImage() != null && (updateQuizRequest.getImage() instanceof MultipartFile image)) {
                urlImage = cloudinaryService.uploadImage(image);
            }
        }

        quiz.setName(updateQuizRequest.getName());
        quiz.setDescription(updateQuizRequest.getDescription());
        quiz.setTotalPoint(updateQuizRequest.getTotalPoint());
        quiz.setTime(updateQuizRequest.getTime());
        quiz.setImage(urlImage);
        quiz.setUpdatedAt(new Date());

        quizRepository.save(quiz);

        return ResponseEntity.ok(quiz);
    }

    public ResponseEntity<Quiz> deleteQuizById(String quizId) throws ResponseException {
        Quiz quiz = quizRepository.findQuizById(quizId);
        if (quiz == null) {
            throw new ResponseException("Quiz not found", HttpStatus.NOT_FOUND, 404);
        }
        quizRepository.delete(quiz);
        return ResponseEntity.ok(quiz);
    }

    public ResponseEntity<AllQuizResponse> getAllQuiz(Integer page, Integer size) throws ResponseException {
        Pageable paging = PageRequest.of(page, size, Sort.by("name").descending());
        Page<Quiz> quizPage = quizRepository.findAll(paging);
        List<Quiz> quizzes = quizPage.getContent();

        Integer total = quizzes.size();
        Integer totalPage = quizPage.getTotalPages();

        AllQuizResponse response = AllQuizResponse.builder()
                .total(total)
                .totalPage(totalPage)
                .quizzes(quizzes)
                .build();
        return ResponseEntity.ok(response);
    }

}
