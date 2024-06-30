package com.example.teamup.domain;


import java.io.Serializable;

public class User implements Serializable {
    private String id;
    private String name;

    public User(String ig, String name) {
        this.id=id;
        this.name=name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
