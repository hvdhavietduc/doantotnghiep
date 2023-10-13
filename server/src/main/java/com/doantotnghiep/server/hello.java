package com.doantotnghiep.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hello {
    @GetMapping("/")
    public String helloWord() {
        return "Hello word";
    }

}
