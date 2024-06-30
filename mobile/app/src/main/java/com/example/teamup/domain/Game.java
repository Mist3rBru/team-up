package com.example.teamup.domain;

import java.io.Serializable;

public class Game implements Serializable {
    private String id;
    private String img;
    private String name;

    public Game(String id, String img, String name) {
        this.id = id;
        this.img = img;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getImg() {
        return img;
    }

    public String getName() {
        return name;
    }

}
