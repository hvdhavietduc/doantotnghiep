package com.doantotnghiep.server.ChatAI;

import com.doantotnghiep.server.exception.ResponseException;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class ChatAIService {
    private static final String OPENAI_API_KEY = "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";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public String getOpenAIResponse(String userInput) throws ResponseException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + OPENAI_API_KEY);

            // Set request body
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", "You are a helpful assistant."));
            messages.add(Map.of("role", "user", "content", userInput));
            requestBody.put("model", "whisper-1");
            requestBody.put("messages", messages);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // Execute the request
            ResponseEntity<String> responseEntity = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, requestEntity, String.class);

            // Process the response
            return responseEntity.getBody();
        } catch (Exception e) {
            throw new ResponseException(e.getMessage(), HttpStatus.BAD_REQUEST, 500);
        }
    }

}
