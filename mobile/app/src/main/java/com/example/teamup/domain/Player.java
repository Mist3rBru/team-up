package com.example.teamup.domain;

import java.io.Serializable;

public class Player implements Serializable {
    private String id;
    private String name;
    private String rank;
    private String playTime;

    public Player(String id, String name, String rank, String playTime) {
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.playTime = playTime;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRank() {
        return rank;
    }

    public String getPlayTime() {
        return playTime;
    }
}
