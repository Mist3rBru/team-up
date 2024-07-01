package com.example.teamup.domain;


import java.io.Serializable;
import java.util.List;

public class User implements Serializable {
    private String id;
    private String name;
    private List<Contact> contacts;

    public User(String ig, String name) {
        this.id = id;
        this.name = name;
    }

    public User(String ig, String name, List<Contact> contacts) {
        this.id = id;
        this.name = name;
        this.contacts = contacts;
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

    public List<Contact> getContacts() {
        return this.contacts;
    }

}
