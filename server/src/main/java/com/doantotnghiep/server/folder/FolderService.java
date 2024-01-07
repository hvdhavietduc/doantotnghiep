package com.doantotnghiep.server.folder;

import com.doantotnghiep.server.common.ErrorEnum.FolderErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.dto.CreateFolderRequest;
import com.doantotnghiep.server.folder.dto.UpdateFolderRequest;
import com.doantotnghiep.server.folder.response.AllFolderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class FolderService {
    private final FolderRepository folderRepository;

    public ResponseEntity<Folder> createFolder(String userId, CreateFolderRequest request) throws ResponseException {
        try {
            String nameFolder = request.getName();
            Folder folderExist = folderRepository.findByNameAndUserId(nameFolder, userId);
            if (folderExist != null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);
            }
            Folder folder = new Folder();
            folder.setName(nameFolder);
            folder.setUserId(userId);
            folder.setWordIds(new ArrayList<>());
            folder.setCreatedAt(new Date());
            folder.setUpdatedAt(new Date());
            folder.setDescription(request.getDescription());
            folderRepository.save(folder);
            return ResponseEntity.ok(folder);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllFolderResponse> getAllFolder(String userId, Integer page, Integer size) throws ResponseException {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Folder> folderPage = folderRepository.getAllByUserId(userId, paging);
        List<Folder> folders = folderPage.getContent();
        Integer total = folderRepository.countAllByUserId(userId);
        Integer totalPage = folderPage.getTotalPages();

        AllFolderResponse response = AllFolderResponse.builder()
                .total(total)
                .totalPage(totalPage)
                .folders(folders)
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Boolean> deleteFolder(String userId, String folderId) throws ResponseException {
        try {
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            folderRepository.deleteByIdAndUserId(folderId, userId);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Folder> updateFolder(String userId, UpdateFolderRequest request) throws ResponseException {
        try {
            String folderId = request.getId();
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }

            String nameFolder = request.getName();
            Folder folderExist = folderRepository.findByNameAndUserId(nameFolder, userId);
            if (folderExist == null) {
                folder.setName(request.getName());
                folder.setDescription(request.getDescription());
                folder.setUpdatedAt(new Date());
                folderRepository.save(folder);
                return ResponseEntity.ok(folder);
            } else if (!folderExist.getId().equals(folderId)) {
                throw new ResponseException(FolderErrorEnum.FOLDER_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);
            }
            else{
                folder.setName(request.getName());
                folder.setUpdatedAt(new Date());
                folder.setDescription(request.getDescription());
                folderRepository.save(folder);
            }
            return ResponseEntity.ok(folder);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Folder> getFolderById(String userId, String folderId) throws ResponseException {
        try {
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            return ResponseEntity.ok(folder);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
