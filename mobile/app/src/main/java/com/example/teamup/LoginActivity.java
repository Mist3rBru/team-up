package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.teamup.domain.User;
import com.example.teamup.helpers.AuthResponse;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.Response;
import okhttp3.ResponseBody;

public class LoginActivity extends AppCompatActivity {

    EditText nameInput;
    EditText passwordInput;
    Button signIn;
    TextView chooseLoginMethod;
    TextView signUp;
    NetworkHelper networkHelper;
    TokenManager tokenManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        nameInput = findViewById(R.id.nameInput);
        passwordInput = findViewById(R.id.passwordInput);
        signIn = findViewById(R.id.signIn);

        chooseLoginMethod = findViewById(R.id.chooseLoginMethod);
        signUp = findViewById(R.id.signUp);

        networkHelper = new NetworkHelper();
        tokenManager = TokenManager.getInstance(this);

        chooseLoginMethod.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, OAuthActivity.class);
                startActivity(intent);
            }
        });

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, SignUpActivity.class);
                startActivity(intent);
            }
        });

        signIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginUser();
            }
        });
    }

    void loginUser() {
        String name = nameInput.getText().toString();
        String password = passwordInput.getText().toString();

        if (name.isEmpty() || password.isEmpty()) {
            Toast.makeText(LoginActivity.this, "Please fill all the fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 8) {
            Toast.makeText(LoginActivity.this, "Passwords must be longer than 8", Toast.LENGTH_SHORT).show();
            return;
        }


        JSONObject loginJson = new JSONObject();
        try {
            loginJson.put("name", name);
            loginJson.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
            return;
        }

        networkHelper.postRequest("/auth/login", loginJson, new NetworkHelper.NetworkCallback() {
            @Override
            public void onSuccess(Response response) {
                runOnUiThread(() -> {
                    try (ResponseBody responseBody = response.body()) {
                        if (responseBody != null) {
                            JSONObject jsonResponse = new JSONObject(responseBody.string());
                            AuthResponse authResponse = new AuthResponse();

                            authResponse.token = jsonResponse.optString("token", null);
                            tokenManager.saveToken(authResponse.token);

                            // Parse user object
                            JSONObject userJson = jsonResponse.optJSONObject("user");
                            if (userJson != null) {
                                authResponse.user = new User(
                                        userJson.optString("id", null),
                                        userJson.optString("name", null)
                                );
                            }

                            Intent intent = new Intent(LoginActivity.this, GameCenterActivity.class);
                            intent.putExtra("user", authResponse.user);
                            startActivity(intent);
                        }
                    } catch (Exception e) {
                        Toast.makeText(LoginActivity.this, "Failed to parse user", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Toast.makeText(LoginActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

}