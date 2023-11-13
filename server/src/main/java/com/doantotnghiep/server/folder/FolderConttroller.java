package com.doantotnghiep.server.folder;

import com.doantotnghiep.server.config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.dto.CreateFolderRequest;
import com.doantotnghiep.server.folder.dto.UpdateFolderRequest;
import com.doantotnghiep.server.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderConttroller {
    private final JwtService jwtService;
    private final FolderService folderService;

    @PostMapping("")
    public ResponseEntity<Folder> createFolder(HttpServletRequest request, @Valid @RequestBody CreateFolderRequest createFolderRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            if (bindingResult.hasErrors()) {
                throw new ResponseException(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST, 400);
            }
            return folderService.createFolder(user.getId(), createFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Folder>> getAllFolder(HttpServletRequest request, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.getAllFolder(user.getId(), page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteFolder(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.deleteFolder(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("")
    public ResponseEntity<Boolean> updateFolder(HttpServletRequest request, @Valid @RequestBody UpdateFolderRequest updateFolderRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            if (bindingResult.hasErrors()) {
                throw new ResponseException(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST, 400);
            }
            return folderService.updateFolder(user.getId(), updateFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("")
    public ResponseEntity<Folder> getFolder(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.getFolderById(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
