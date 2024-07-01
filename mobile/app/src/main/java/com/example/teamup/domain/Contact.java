package com.example.teamup.domain;

public class Contact {
    private String id;
    private String platform;
    private String name;

    public Contact(String id, String platform, String name) {
        this.id = id;
        this.platform = platform;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getPlatform() {
        return platform;
    }

    public String getName() {
        return name;
    }
}
