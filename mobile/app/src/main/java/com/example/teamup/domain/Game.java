package com.example.teamup.domain;

import java.io.Serializable;

public class Game implements Serializable {
    private String id;
    private String bannerImg;
    private String profileImg;
    private String name;

    public Game(String id, String bannerImg,String profileImg, String name) {
        this.id = id;
        this.bannerImg = bannerImg;
        this.profileImg=profileImg;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getBannerImg() {
        return bannerImg;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public String getName() {
        return name;
    }

}
