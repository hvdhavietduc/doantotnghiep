package com.doantotnghiep.server.Translate;

import com.doantotnghiep.server.Translate.dto.SetTranslateFeatureRequest;
import com.doantotnghiep.server.Translate.dto.TranslateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/translate")
@RequiredArgsConstructor
public class TranslateController {
    private final TranslateTextService translateTextService;

    @PostMapping("")
    public String translateText(@RequestBody TranslateRequest request) throws IOException {
        return translateTextService.translateText(request.getText(), request.getTo());
    }

    @PostMapping("/isRelease")
    public Boolean setReleaseTranslateFeature(@RequestBody SetTranslateFeatureRequest request) {
        return translateTextService.setIsReleaseTranslateFeature(request.isRelease);
    }

    @GetMapping("/isRelease")
    public TranslateFeature getReleaseTranslateFeature() {
        return translateTextService.getTranslateFeature();
    }
}
