package com.example.teamup.helpers;

import com.example.teamup.domain.User;

import org.json.JSONObject;

public class AuthResponse {
    private String token;
    private User user;

    public AuthResponse(JSONObject responseJson) {
        token = responseJson.optString("token", null);

        JSONObject userJson = responseJson.optJSONObject("user");
        if (userJson != null) {
            user = new User(
                    userJson.optString("id", null),
                    userJson.optString("name", null)
            );
        }
    }

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }
}
