package com.doantotnghiep.server.Translate;

// Imports the Google Cloud Translation library.

import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.Translation;
import com.google.cloud.translate.v3.TranslationServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class TranslateTextService {
    public String isReleaseTranslateFeatureName = "translate_feature";
    public final TranslateFeatureRepository translateFeatureRepository;
    public String projectId = "capable-argon-416108";

    public String translateText(String text, String targetLanguage) throws IOException {
        Boolean isRelease = this.isReleaseTranslateFeature();
        if (!isRelease) {
            return "";
        }
        return translateText(this.projectId, targetLanguage, text);
    }

    public static String translateText(String projectId, String targetLanguage, String text)
            throws IOException {
        try (TranslationServiceClient client = TranslationServiceClient.create()) {

            LocationName parent = LocationName.of(projectId, "global");

            TranslateTextRequest request =
                    TranslateTextRequest.newBuilder()
                            .setParent(parent.toString())
                            .setMimeType("text/plain")
                            .setTargetLanguageCode(targetLanguage)
                            .addContents(text)
                            .build();

            TranslateTextResponse response = client.translateText(request);

            for (Translation translation : response.getTranslationsList()) {
                return translation.getTranslatedText();
            }
            return "";
        }
    }

    public Boolean isReleaseTranslateFeature() {
        return translateFeatureRepository.findByName(this.isReleaseTranslateFeatureName).getIsRelease();
    }

    public TranslateFeature getTranslateFeature() {
        return translateFeatureRepository.findByName(this.isReleaseTranslateFeatureName);
    }

    public Boolean setIsReleaseTranslateFeature(Boolean isRelease) {
        TranslateFeature translateFeature = translateFeatureRepository.findByName(this.isReleaseTranslateFeatureName);
        translateFeature.setIsRelease(isRelease);
        translateFeatureRepository.save(translateFeature);

        return translateFeature.getIsRelease();
    }

}
