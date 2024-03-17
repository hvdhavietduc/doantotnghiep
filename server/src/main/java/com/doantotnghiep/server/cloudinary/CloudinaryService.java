package com.doantotnghiep.server.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.doantotnghiep.server.common.ErrorEnum.CloudinaryErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class CloudinaryService {
    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    public String uploadImage(MultipartFile file) throws ResponseException, IOException {
        try {

            if (!isImage(file)) {
                throw new ResponseException(CloudinaryErrorEnum.FILE_NOT_IMAGE, HttpStatus.BAD_REQUEST, 400);
            }

            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret
            ));
            Integer MAX_SIZE_UPLOAD = 1048576;

            if (file.getSize() > MAX_SIZE_UPLOAD) {
                throw new ResponseException(CloudinaryErrorEnum.FILE_CANNOT_EXCEDD_1MB, HttpStatus.BAD_REQUEST, 400);
            }

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            String fileUrl = (String) uploadResult.get("secure_url");

            return fileUrl;
        } catch (IOException e) {
            throw new ResponseException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500);
        }
    }

    public String uploadVideo(MultipartFile file) throws ResponseException, IOException {
        try {
            if (!isVideo(file)) {
                throw new ResponseException(CloudinaryErrorEnum.FILE_NOT_VIDEO, HttpStatus.BAD_REQUEST, 400);
            }

            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret
            ));
            Integer MAX_SIZE_UPLOAD = 1048576;

            if (file.getSize() > MAX_SIZE_UPLOAD) {
                throw new ResponseException(CloudinaryErrorEnum.FILE_CANNOT_EXCEDD_1MB, HttpStatus.BAD_REQUEST, 400);
            }

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));

            String fileUrl = (String) uploadResult.get("secure_url");

            return fileUrl;
        } catch (IOException e) {
            throw new ResponseException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500);
        }
    }

    public Boolean isVideo(MultipartFile file) {
        String[] videoType = {"video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/3gpp", "video/3gpp2", "video/avi", "video/mpeg", "video/ogg", "video/x-matroska", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/3gpp", "video/3gpp2", "video/avi", "video/mpeg", "video/ogg", "video/x-matroska"};
        for (String type : videoType) {
            if (Objects.equals(file.getContentType(), type)) {
                return true;
            }
        }
        return false;
    }

    public Boolean isImage(MultipartFile file) {
        String[] imageType = {"image/jpeg", "image/png", "image/gif", "image/bmp", "image/tiff", "image/webp"};
        for (String type : imageType) {
            if (Objects.equals(file.getContentType(), type)) {
                return true;
            }
        }
        return false;
    }
}
