package com.doantotnghiep.server.word;

import com.doantotnghiep.server.CrawWord.CrawWordService;
import com.doantotnghiep.server.wordCategory.WordCategory;
import com.doantotnghiep.server.wordCategory.WordCategoryRepository;
import com.doantotnghiep.server.common.ErrorEnum.CategoryOfWordErrorEnum;
import com.doantotnghiep.server.common.ErrorEnum.FolderErrorEnum;
import com.doantotnghiep.server.common.ErrorEnum.WordErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.folder.Folder;
import com.doantotnghiep.server.folder.FolderRepository;
import com.doantotnghiep.server.word.Response.AllWordByCategory;
import com.doantotnghiep.server.word.dto.AddWordToCategoryRequest;
import com.doantotnghiep.server.word.dto.AddWordToFolderRequest;
import com.doantotnghiep.server.word.dto.RemoveWordFromCategoryRequest;
import com.doantotnghiep.server.wordFolder.WordFolder;
import com.doantotnghiep.server.wordFolder.WordFolderRepository;
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
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class WordService {
    private final WordRepository wordRepository;
    private final CrawWordService crawWordService;
    private final FolderRepository folderRepository;
    private final WordCategoryRepository categoryOfWordRepository;
    private final WordFolderRepository wordFolderRepository;

    public ResponseEntity<Word> getWordByName(String name) throws ResponseException, IOException {
        try {
            name = name.trim();
            Word word = wordRepository.findByName(name);
            if (word != null) {
                return ResponseEntity.ok(word);
            }
            word = crawWordService.crawWord(name);
            wordRepository.save(word);
            return ResponseEntity.ok(word);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }


    public ResponseEntity<Word> getWordById(String id) throws ResponseException {
        try {
            Word word = wordRepository.findById(id).orElse(null);
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

            String wordId = request.getWordId();
            Word word = wordRepository.findAllById(wordId);

            if (word == null) {
                throw new ResponseException(WordErrorEnum.WORD_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }

            WordFolder wordFolder = changeWordToWordFolder(word);
            wordFolder.setFolderId(folderId);
            wordFolder.setAuthorId(userId);

            WordFolder wordFolderExist = wordFolderRepository.findAllByNameAndFolderId(wordFolder.getName(), folderId);
            List<String> wordIds = folder.getWordIds();
            if ((wordFolderExist != null) && wordIds.contains(wordFolderExist.getId())) {
                throw new ResponseException(WordErrorEnum.WORD_ALREADY_EXIST_IN_FOLDER, HttpStatus.BAD_REQUEST, 400);
            }
            WordFolder newWordFolder = wordFolderRepository.save(wordFolder);

            wordIds.add(newWordFolder.getId());
            folder.setWordIds(wordIds);

            folderRepository.save(folder);

            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }


    public ResponseEntity<Boolean> addWordToCategory(AddWordToCategoryRequest request) throws ResponseException {
        try {
            String categoryId = request.getCategoryId();
            WordCategory category = categoryOfWordRepository.findById(categoryId).orElse(null);
            if (category == null) {
                throw new ResponseException(CategoryOfWordErrorEnum.CATEGORY_OF_WORD_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            String wordId = request.getWordId();
            List<String> wordIds = category.getWordIds();
            if (wordIds.contains(wordId)) {
                throw new ResponseException(WordErrorEnum.WORD_ALREADY_EXIST_IN_CATEGORY, HttpStatus.BAD_REQUEST, 400);
            }
            wordIds.add(wordId);
            category.setWordIds(wordIds);
            categoryOfWordRepository.save(category);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());

        }
    }

    public ResponseEntity<Boolean> removeWordFromCategory(RemoveWordFromCategoryRequest request) throws ResponseException {
        try {
            String categoryId = request.getCategoryId();
            WordCategory category = categoryOfWordRepository.findById(categoryId).orElse(null);
            if (category == null) {
                throw new ResponseException(CategoryOfWordErrorEnum.CATEGORY_OF_WORD_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            String wordId = request.getWordId();
            List<String> wordIds = category.getWordIds();
            if (!wordIds.contains(wordId)) {
                throw new ResponseException(WordErrorEnum.WORD_NOT_EXIST_IN_CATEGORY, HttpStatus.BAD_REQUEST, 400);
            }
            wordIds.remove(wordId);
            category.setWordIds(wordIds);
            categoryOfWordRepository.save(category);
            return ResponseEntity.ok(true);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<AllWordByCategory> getAllWordByCategory(String categoryId, Integer page, Integer size) throws ResponseException {
        try {
            WordCategory category = categoryOfWordRepository.findById(categoryId).orElse(null);
            if (category == null) {
                throw new ResponseException(CategoryOfWordErrorEnum.CATEGORY_OF_WORD_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
            }
            List<String> wordIds = category.getWordIds();
            Pageable paging = PageRequest.of(page, size, Sort.by("name").ascending());
            Page<Word> words = wordRepository.findAllByIdIn(wordIds, paging);
            Integer total = wordIds.size();
            AllWordByCategory response = AllWordByCategory.builder()
                    .total(total)
                    .totalPage(words.getTotalPages())
                    .words(words.getContent())
                    .build();
            return ResponseEntity.ok(response);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    public ResponseEntity<List<String>> searchWordHave(String key) throws ResponseException {
        int maxList = 10;
        List<Word> wordListContain = wordRepository.findAllByNameContains(key);

        if (wordListContain.size() > maxList) {
            wordListContain = wordListContain.subList(0, maxList);
        }

        List<String> wordList = wordListContain.stream().map(word -> word.getName()).toList();
        return ResponseEntity.ok(wordList);
    }

    public WordFolder changeWordToWordFolder(Word word) {
        WordFolder wordFolder = WordFolder.builder()
                .name(word.getName())
                .pronunciationUS(word.getPronunciationUS())
                .pronunciationUK(word.getPronunciationUK())
                .pronunciationUKAudio(word.getPronunciationUKAudio())
                .pronunciationUSAudio(word.getPronunciationUSAudio())
                .types(word.getTypes())
                .synonyms(word.getSynonyms())
                .antonyms(word.getAntonyms())
                .build();

        return wordFolder;
    }
}
