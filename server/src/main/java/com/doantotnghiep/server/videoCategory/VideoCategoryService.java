package com.doantotnghiep.server.videoCategory;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.video.Video;
import com.doantotnghiep.server.video.VideoRepository;
import com.doantotnghiep.server.videoCategory.response.AllVideoCategory;
import com.doantotnghiep.server.videoCategory.response.AllVideoInCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.Date;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class VideoCategoryService {
    private final VideoCategoryRepository videoCategoryRepository;
    private final VideoRepository videoRepository;

    public AllVideoCategory getAllVideoCategory(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<VideoCategory> videoCategories = videoCategoryRepository.findAll(paging);

        return AllVideoCategory.builder()
                .videoCategories(videoCategories.getContent())
                .total((int) videoCategories.getTotalElements())
                .totalPage(videoCategories.getTotalPages())
                .build();

    }

    public VideoCategory createVideoCategory(String name) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findByName(name);
        if (videoCategory != null) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }

        VideoCategory newVideoCategory = VideoCategory.builder()
                .name(name)
                .createdAt(new Date())
                .updatedAt(new Date())
                .videoIds(new ArrayList<>())
                .build();
        return videoCategoryRepository.save(newVideoCategory);
    }

    public VideoCategory getVideoCategoryByName(String name) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findByName(name);
        if (videoCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 400);
        }
        return videoCategory;
    }

    public VideoCategory getVideoCategoryById(String id) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findById(id).orElse(null);
        if (videoCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        return videoCategory;
    }

    public VideoCategory updateVideoCategory(String id, String name) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findById(id).orElse(null);
        if (videoCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }

        VideoCategory categoryExist = videoCategoryRepository.findByName(name);
        if (categoryExist != null && !categoryExist.getId().equals(id)) {
            throw new ResponseException("Category already exists", HttpStatus.BAD_REQUEST, 400);
        }

        videoCategory.setName(name);
        videoCategory.setUpdatedAt(new Date());
        return videoCategoryRepository.save(videoCategory);
    }

    public VideoCategory deleteVideoCategory(String id) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findById(id).orElse(null);
        if (videoCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }
        videoCategoryRepository.delete(videoCategory);
        return videoCategory;
    }

    public AllVideoInCategory getAllVideoInCategory(String categoryId, Integer page, Integer size) throws ResponseException {
        VideoCategory videoCategory = videoCategoryRepository.findById(categoryId).orElse(null);
        if (videoCategory == null) {
            throw new ResponseException("Category not found", HttpStatus.BAD_REQUEST, 404);
        }

        Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Video> videos = videoRepository.findAllByIdIn(videoCategory.getVideoIds(), paging);

        return AllVideoInCategory.builder()
                .category(videoCategory.getName())
                .videos(videos.getContent())
                .total((int) videos.getTotalElements())
                .totalPage(videos.getTotalPages())
                .build();
    }

}
