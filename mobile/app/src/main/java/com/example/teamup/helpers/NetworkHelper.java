package com.example.teamup.helpers;

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

    private OkHttpClient client;
    private TokenManager tokenManager;

    public NetworkHelper() {
        this.client = new OkHttpClient();
    }

    public NetworkHelper(TokenManager tokenManager) {
        this.client = new OkHttpClient();
        this.tokenManager = tokenManager;
    }

    public void postRequest(String url, JSONObject json, NetworkCallback callback) {
        RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json.toString());
        Request.Builder builder = new Request.Builder()
                .url("http://10.0.2.2:3030" + url)
                .post(body);

        if (this.tokenManager != null) {
            builder.addHeader("authorization", this.tokenManager.getToken());
        }

        Request request = builder.build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    String errorMessage = "";
                    try (ResponseBody responseBody = response.body()) {
                        if (responseBody != null) {
                            JSONObject errorJson = new JSONObject(responseBody.string());
                            errorMessage = errorJson.optString("message", "Unknown error");
                        }
                    } catch (Exception e) {
                        errorMessage = "Failed to parse error message";
                    }
                    callback.onError(new Exception(errorMessage));
                    return;
                }
                callback.onSuccess(response);
            }

            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                callback.onError(e);
            }
        });
    }

    public interface NetworkCallback {
        void onSuccess(Response response);

        void onError(Exception e);
    }
}

