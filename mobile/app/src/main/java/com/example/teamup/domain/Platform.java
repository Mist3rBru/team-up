package com.example.teamup.domain;

import java.util.List;

public class Platform {
    private String id;
    private String name;
    private List<Game> games;

    public Platform(String id, String name) {
        this.id = id;
        this.name = name;
    }


    public Platform(String id, String name, List<Game> games) {
        this.id = id;
        this.name = name;
        this.games = games;
    }

    public String getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public List<Game> getGames() {
        return games;
    }
}
