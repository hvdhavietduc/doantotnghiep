package com.doantotnghiep.server.wordFolder;

import com.doantotnghiep.server.common.ErrorEnum.FolderErrorEnum;
import com.doantotnghiep.server.common.ErrorEnum.WordErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.Folder;
import com.doantotnghiep.server.folder.FolderRepository;
import com.doantotnghiep.server.wordFolder.Response.AllWordByFolder;
import com.doantotnghiep.server.word.dto.RemoveWordFromFolderRequest;
import com.doantotnghiep.server.wordFolder.dto.AddWordToFolderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class WordFolderService {
    private final WordFolderRepository wordFolderRepository;
    private final FolderRepository folderRepository;

    public ResponseEntity<AllWordByFolder> getAllWordByFolderId(String userId, String folderId, Integer page, Integer size) throws ResponseException {
        try {
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            List<String> wordIds = folder.getWordIds();
            Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
            Page<WordFolder> words = wordFolderRepository.findAllByIdIn(wordIds, paging);
            Integer total = wordIds.size();
            Integer totalPage = words.getTotalPages();
            AllWordByFolder response = AllWordByFolder.builder()
                    .folder(folder.getName())
                    .total(total)
                    .totalPage(totalPage)
                    .words(words.getContent())
                    .build();
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<WordFolder> getWordById(String id) throws ResponseException {
        try {
            WordFolder word = wordFolderRepository.findById(id).orElse(null);
            if (word == null) {
                throw new ResponseException(WordErrorEnum.WORD_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            return ResponseEntity.ok(word);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Boolean> addWordToFolder(String userId, AddWordToFolderRequest request) throws ResponseException {
        try {
            String folderId = request.getFolderId();
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            String wordName = request.getName();
            WordFolder wordFolderExist = wordFolderRepository.findAllByNameAndFolderId(wordName, folderId);
            List<String> wordIds = folder.getWordIds();
            if (wordFolderExist != null) {
                throw new ResponseException(WordErrorEnum.WORD_ALREADY_EXIST_IN_FOLDER, HttpStatus.BAD_REQUEST, 400);
            }

            WordFolder newWordFolder = WordFolder.builder()
                    .name(request.getName())
                    .pronunciationUKAudio(request.getPronunciationUKAudio())
                    .pronunciationUSAudio(request.getPronunciationUSAudio())
                    .antonyms(request.getAntonyms())
                    .synonyms(request.getSynonyms())
                    .types(request.getTypes())
                    .pronunciationUK(request.getPronunciationUK())
                    .pronunciationUS(request.getPronunciationUS())
                    .folderId(folderId)
                    .authorId(userId)
                    .build();

            WordFolder wordFolder = wordFolderRepository.save(newWordFolder);
            wordIds.add(wordFolder.getId());
            folder.setWordIds(wordIds);

            folderRepository.save(folder);

            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<Boolean> removeWordFromFolder(String userId, RemoveWordFromFolderRequest request) throws ResponseException {
        try {
            String folderId = request.getFolderId();
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            String wordId = request.getWordId();
            List<String> wordIds = folder.getWordIds();
            if (!wordIds.contains(wordId)) {
                throw new ResponseException(WordErrorEnum.WORD_NOT_EXIST_IN_FOLDER, HttpStatus.BAD_REQUEST, 400);
            }
            wordIds.remove(wordId);
            folder.setWordIds(wordIds);

            folderRepository.save(folder);
            wordFolderRepository.deleteById(wordId);

            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<WordFolder> updateWordInFolder(String userId, WordFolder request) throws ResponseException {
        try {
            String folderId = request.getFolderId();
            Folder folder = folderRepository.findByIdAndUserId(folderId, userId);
            if (folder == null) {
                throw new ResponseException(FolderErrorEnum.FOLDER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            String wordId = request.getId();
            List<String> wordIds = folder.getWordIds();
            if (!wordIds.contains(wordId)) {
                throw new ResponseException(WordErrorEnum.WORD_NOT_EXIST_IN_FOLDER, HttpStatus.BAD_REQUEST, 400);
            }

            return ResponseEntity.ok(wordFolderRepository.save(request));

        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
