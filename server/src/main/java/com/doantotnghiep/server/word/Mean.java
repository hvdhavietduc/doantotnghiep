package com.doantotnghiep.server.word;

import java.util.ArrayList;
import java.util.List;

public class Mean {
    public String level;
    public String conceptEnglish;
    public String conceptVietnamese;
    public List<Example> examples;

    public Mean() {
        this.level = "";
        this.conceptEnglish = "";
        this.conceptVietnamese = "";
        this.examples = new ArrayList<>();
    }



    public void appendExample(Example example) {
        this.examples.add(example);
    }
}
