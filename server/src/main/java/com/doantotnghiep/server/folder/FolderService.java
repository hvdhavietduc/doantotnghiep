package com.doantotnghiep.server.folder;

import com.doantotnghiep.server.common.FolderErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.dto.CreateFolderRequest;
import com.doantotnghiep.server.folder.dto.UpdateFolderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class FolderService {
    private final FolderRepository folderRepository;

    public ResponseEntity<Folder> createFolder(String userId, CreateFolderRequest request) throws ResponseException{
        try {
            String nameFolder = request.getName();
            Folder folderExist = folderRepository.findByNameAndUserId(nameFolder,userId);
            if (folderExist != null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);
            }
            Folder folder = new Folder();
            folder.setName(nameFolder);
            folder.setUserId(userId);
            folder.setWordIds(new ArrayList<>());
            folderRepository.save(folder);
            return ResponseEntity.ok(folder);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    public ResponseEntity<List<Folder>> getAllFolder(String userId, Integer page, Integer size) throws ResponseException{
        Pageable paging = PageRequest.of(page, size);
        List<Folder> folders = folderRepository.getAllByUserId(userId, paging).getContent();
        return ResponseEntity.ok(folders);
    }

    public ResponseEntity<Boolean> deleteFolder(String userId, String folderId) throws ResponseException{
        try {
            Folder folder = folderRepository.findByIdAndUserId(folderId,userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.BAD_REQUEST, 400);
            }
            folderRepository.deleteByIdAndUserId(folderId,userId);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    public ResponseEntity<Boolean> updateFolder(String userId, UpdateFolderRequest request) throws ResponseException{
        try{
            String folderId = request.getId();
            Folder folder = folderRepository.findByIdAndUserId(folderId,userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.BAD_REQUEST, 400);
            }
            String nameFolder = request.getName();
            Folder folderExist = folderRepository.findByNameAndUserId(nameFolder,userId);
            if (folderExist == null) {
                folder.setName(request.getName());
                folderRepository.save(folder);
                return ResponseEntity.ok(true);
            }
            else if(!folderExist.getId().equals(folderId)){
                throw new ResponseException(FolderErrorEnum.FOLDER_ALREADY_EXIST, HttpStatus.BAD_REQUEST, 400);

            }
            return ResponseEntity.ok(true);

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    public ResponseEntity<Folder> getFolderById(String userId, String folderId) throws ResponseException{
        try {
            Folder folder = folderRepository.findByIdAndUserId(folderId,userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.BAD_REQUEST, 400);
            }
            return ResponseEntity.ok(folder);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
