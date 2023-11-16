package com.doantotnghiep.server.word;

import java.util.ArrayList;
import java.util.List;

public class Type {
    public String type;
    public List<Mean> means;
    public Type() {
        this.type = "";
        this.means = new ArrayList<>();
    }
    public Type(String type){
        this.type = type;
        this.means = new ArrayList<>();
    }
}
