package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.teamup.helpers.AuthResponse;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

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
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        nameInput = findViewById(R.id.nameInput);
        passwordInput = findViewById(R.id.passwordInput);
        signIn = findViewById(R.id.signIn);

        chooseLoginMethod = findViewById(R.id.chooseLoginMethod);
        signUp = findViewById(R.id.signUp);

        networkHelper = new NetworkHelper();
        tokenManager = TokenManager.getInstance(this);

        chooseLoginMethod.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, OAuthActivity.class);
            startActivity(intent);
        });

        signUp.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, SignUpActivity.class);
            startActivity(intent);
        });

        signIn.setOnClickListener(v -> loginUser());
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
            public void onSuccess(String data) {
                runOnUiThread(() -> {
                    try {
                        JSONObject responseJson = new JSONObject(data);
                        AuthResponse authResponse = new AuthResponse(responseJson);
                        tokenManager.saveToken(authResponse.getToken());

                        Intent intent = new Intent(LoginActivity.this, GameCenterActivity.class);
                        intent.putExtra("user", authResponse.getUser());
                        startActivity(intent);
                    } catch (Exception e) {
                        Toast.makeText(LoginActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
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