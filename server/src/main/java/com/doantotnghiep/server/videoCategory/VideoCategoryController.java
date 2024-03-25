package com.doantotnghiep.server.videoCategory;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.videoCategory.dto.CreateVideoCategoryRequest;
import com.doantotnghiep.server.videoCategory.dto.UpdateVideoCategoryRequest;
import com.doantotnghiep.server.videoCategory.response.AllVideoCategory;
import com.doantotnghiep.server.videoCategory.response.AllVideoInCategory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/videoCategory")
public class VideoCategoryController {
    private final VideoCategoryService videoCategoryService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public AllVideoCategory getAllVideoCategory(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
        return videoCategoryService.getAllVideoCategory(page, size);
    }

    @PostMapping("")
    public VideoCategory createVideoCategory(@Valid @RequestBody CreateVideoCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return videoCategoryService.createVideoCategory(request.getName());
    }

    @GetMapping("/{id}")
    public VideoCategory getVideoCategoryById(@PathVariable String id) throws ResponseException {
        return videoCategoryService.getVideoCategoryById(id);
    }

    @GetMapping("/name")
    public VideoCategory getVideoCategoryByName(@RequestParam String name) throws ResponseException {
        return videoCategoryService.getVideoCategoryByName(name);
    }

    @PutMapping("")
    public VideoCategory updateVideoCategory(@Valid @RequestBody UpdateVideoCategoryRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return videoCategoryService.updateVideoCategory(request.getId(), request.getName());
    }

    @DeleteMapping("/{id}")
    public VideoCategory deleteVideoCategory(@PathVariable String id) throws ResponseException {
        return videoCategoryService.deleteVideoCategory(id);
    }

    @GetMapping("/{id}/videos")
    public AllVideoInCategory getAllVideoInCategory(@PathVariable String id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return videoCategoryService.getAllVideoInCategory(id, page, size);
    }

}
