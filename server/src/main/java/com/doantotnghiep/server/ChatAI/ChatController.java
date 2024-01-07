package com.doantotnghiep.server.ChatAI;

import com.doantotnghiep.server.ChatAI.dto.RequestGPT;
import com.doantotnghiep.server.exception.ResponseException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatAIService chatAIService;

    @PostMapping("")
    public String askQuestion(@RequestBody RequestGPT request) throws ResponseException {
        // Call OpenAI API using the OpenAIChatClient
        return chatAIService.getOpenAIResponse(request.getRequest());
    }


}

