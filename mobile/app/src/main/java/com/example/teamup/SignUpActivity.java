package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.teamup.helpers.AuthResponse;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

import org.json.JSONException;
import org.json.JSONObject;

public class SignUpActivity extends AppCompatActivity {
    ImageView backIcon;
    TextView nameInput;
    TextView userNameInput;
    TextView emailInput;
    TextView passwordInput;
    TextView confirmPasswordInput;
    Button signUpButton;

    NetworkHelper networkHelper;
    TokenManager tokenManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        backIcon = findViewById(R.id.backIcon);
        nameInput = findViewById(R.id.nameInput);
        userNameInput = findViewById(R.id.userNameInput);
        emailInput = findViewById(R.id.emailInput);
        passwordInput = findViewById(R.id.passwordInput);
        confirmPasswordInput = findViewById(R.id.confirmPasswordInput);
        signUpButton = findViewById(R.id.signUpButton);

        networkHelper = new NetworkHelper();
        tokenManager = TokenManager.getInstance(this);

        backIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SignUpActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                registerUser();
            }
        });
    }

    private void registerUser() {
        String name = nameInput.getText().toString();
        String userName = userNameInput.getText().toString();
        String email = emailInput.getText().toString();
        String password = passwordInput.getText().toString();
        String confirmPassword = confirmPasswordInput.getText().toString();

        if (name.isEmpty() || userName.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            Toast.makeText(SignUpActivity.this, "Please fill all the fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(confirmPassword)) {
            Toast.makeText(SignUpActivity.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
            return;
        }

        JSONObject userJson = new JSONObject();
        try {
            userJson.put("name", name);
            userJson.put("displayName", userName);
            userJson.put("email", email);
            userJson.put("password", password);
            userJson.put("confirmPassword", confirmPassword);
        } catch (JSONException e) {
            e.printStackTrace();
            return;
        }

        networkHelper.postRequest("/user", userJson, new NetworkHelper.NetworkCallback() {
            @Override
            public void onSuccess(String data) {
                runOnUiThread(() -> {
                    try {
                        JSONObject responseJson = new JSONObject(data);
                        if (responseJson != null) {
                            AuthResponse authResponse = new AuthResponse(responseJson);
                            tokenManager.saveToken(authResponse.getToken());

                            Intent intent = new Intent(SignUpActivity.this, GameCenterActivity.class);
                            intent.putExtra("user", authResponse.getUser());
                            startActivity(intent);
                        }
                    } catch (Exception e) {
                        Toast.makeText(SignUpActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Toast.makeText(SignUpActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }
        });
    }
}
