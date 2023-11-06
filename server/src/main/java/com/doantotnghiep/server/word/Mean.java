package com.doantotnghiep.server.word;

import java.util.List;

public class Mean {
    public String level;
    public String concept;
    public String type;
    public String vietnamese;
    public String english;
    public List<Example> examples;

    public Mean() {
    }

    public Mean(String level, String concept, String type, String vietnamese, String english, List<Example> examples) {
        this.level = level;
        this.concept = concept;
        this.type = type;
        this.vietnamese = vietnamese;
        this.english = english;
        this.examples = examples;
    }

    public void appendExample(Example example) {
        this.examples.add(example);
    }
}
