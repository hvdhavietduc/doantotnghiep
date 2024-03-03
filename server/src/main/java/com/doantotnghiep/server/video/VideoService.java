package com.doantotnghiep.server.video;

import com.doantotnghiep.server.cloudinary.CloudinaryService;
import com.doantotnghiep.server.common.ErrorEnum.VideoErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.video.Response.AllVideoResponse;
import com.doantotnghiep.server.video.dto.CreateVideoRequest;
import com.doantotnghiep.server.video.dto.UpdateVideoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class VideoService {
    private final VideoRepository videoRepository;
    private final CloudinaryService cloudinaryService;

    public ResponseEntity<Video> getVideoById(String id) throws ResponseException {
        try {
            Video video = videoRepository.findById(id).orElse(null);
            if (video == null) {
                throw new ResponseException(VideoErrorEnum.VIDEO_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            return ResponseEntity.ok(video);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Video> createVideo(CreateVideoRequest request) throws ResponseException, IOException {

        try {
            Boolean isVideo = cloudinaryService.isVideo(request.getVideo());
            if (!isVideo) {
                throw new ResponseException(VideoErrorEnum.FILE_NOT_VIDEO, HttpStatus.BAD_REQUEST, 400);
            }

            String urlVideo = cloudinaryService.uploadVideo(request.getVideo());

            Video video = Video.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .url(urlVideo)
                    .createdAt(new Date())
                    .updatedAt(new Date())
                    .build();

            return ResponseEntity.ok(videoRepository.save(video));
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Video> updateVideo(String id, UpdateVideoRequest request) throws ResponseException {
        try {
            Video videoUpdate = videoRepository.findById(id).orElse(null);
            if (videoUpdate == null) {
                throw new ResponseException(VideoErrorEnum.VIDEO_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }

            String urlVideo = videoUpdate.getUrl();

            if (!request.getIsKeepVideo()) {
                Boolean isVideo = cloudinaryService.isVideo(request.getVideo());
                if (!isVideo) {
                    throw new ResponseException(VideoErrorEnum.FILE_NOT_VIDEO, HttpStatus.BAD_REQUEST, 400);
                }
                urlVideo = cloudinaryService.uploadVideo(request.getVideo());
            }

            videoUpdate.setTitle(request.getTitle());
            videoUpdate.setDescription(request.getDescription());
            videoUpdate.setUrl(urlVideo);
            videoUpdate.setUpdatedAt(new Date());

            Video response = videoRepository.save(videoUpdate);
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<Boolean> deleteVideo(String id) throws ResponseException {
        try {
            Video video = videoRepository.findById(id).orElse(null);
            if (video == null) {
                throw new ResponseException(VideoErrorEnum.VIDEO_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            videoRepository.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllVideoResponse> getAllVideo(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Integer total = videoRepository.countAllBy();
        Page<Video> videoPage = videoRepository.findAll(paging);
        List<Video> listVideo = videoPage.getContent();
        Integer totalPage = videoPage.getTotalPages();

        AllVideoResponse response = AllVideoResponse.builder()
                .total(total)
                .totalPage(totalPage)
                .videos(listVideo)
                .build();
        return ResponseEntity.ok(response);
    }
}
