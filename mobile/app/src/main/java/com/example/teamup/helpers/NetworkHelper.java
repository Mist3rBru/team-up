package com.example.teamup.helpers;

import android.content.Intent;
import android.widget.Toast;

import com.example.teamup.GameCenterActivity;
import com.example.teamup.SignUpActivity;
import com.example.teamup.domain.User;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class NetworkHelper {

    private final String baseUrl;
    private OkHttpClient client;
    private TokenManager tokenManager;

    public NetworkHelper() {
        baseUrl = "http://10.0.2.2:3030";
        client = new OkHttpClient();
    }

    public NetworkHelper(TokenManager tokenManager) {
        baseUrl = "http://10.0.2.2:3030";
        client = new OkHttpClient();
        this.tokenManager = tokenManager;
    }

    public void getRequest(String url, NetworkCallback callback) {
        Request.Builder builder = new Request.Builder().url(baseUrl + url);

        if (this.tokenManager != null) {
            builder.addHeader("authorization", this.tokenManager.getToken());
        }

        Request request = builder.build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                handleResponse(response, callback);
            }

            @Override
            public void onFailure(Call call, IOException e) {
                callback.onError(e);
            }
        });
    }

    public void postRequest(String url, JSONObject json, NetworkCallback callback) {
        RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json.toString());
        Request.Builder builder = new Request.Builder()
                .url(baseUrl + url)
                .post(body);

        if (this.tokenManager != null) {
            builder.addHeader("authorization", this.tokenManager.getToken());
        }

        Request request = builder.build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                handleResponse(response,callback);
            }

            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                callback.onError(e);
            }
        });
    }


    private void handleResponse(Response response, NetworkCallback callback) throws IOException {
        if (!response.isSuccessful()) {
            String errorMessage = "";
            try (ResponseBody responseBody = response.body()) {
                if (responseBody != null) {
                    JSONObject errorJson = new JSONObject(responseBody.string());
                    errorMessage = errorJson.optString("message", "Unknown error");
                }
            } catch (Exception e) {
                errorMessage = "Internal server error";
            }
            callback.onError(new Exception(errorMessage));
        } else {
            try (ResponseBody responseBody = response.body()) {
                if (responseBody != null) {
                    String data = responseBody.string();
                    callback.onSuccess(data);
                } else {
                    callback.onSuccess(null);
                }
            } catch (Exception e) {
                callback.onError(e);
            }
        }
    }

    public interface NetworkCallback {
        void onSuccess(String data);

        void onError(Exception e);
    }
}

