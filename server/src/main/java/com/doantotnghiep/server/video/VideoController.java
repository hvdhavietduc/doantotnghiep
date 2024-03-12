package com.doantotnghiep.server.video;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.video.Response.AllVideoResponse;
import com.doantotnghiep.server.video.dto.CreateVideoRequest;
import com.doantotnghiep.server.video.dto.UpdateVideoRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<AllVideoResponse> getAllVideo(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return videoService.getAllVideo(page, size);
    }

    @GetMapping("")
    public ResponseEntity<Video> getVideoById(@RequestParam String id) throws ResponseException {
        return videoService.getVideoById(id);
    }

    @PostMapping("")
    public ResponseEntity<Video> createVideo(@Valid @ModelAttribute CreateVideoRequest request, BindingResult bindingResult) throws ResponseException, IOException {
        validateExceptionHandle.handleException(bindingResult);
        return videoService.createVideo(request);
    }

    @PutMapping("")
    public ResponseEntity<Video> updateVideo(@RequestParam String id, @Valid @ModelAttribute UpdateVideoRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return videoService.updateVideo(id, request);
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteVideo(@RequestParam String id) throws ResponseException {
        return videoService.deleteVideo(id);
    }

}
