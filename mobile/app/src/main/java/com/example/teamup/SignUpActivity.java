package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
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
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sign_up);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        backIcon = findViewById(R.id.backIcon);
        nameInput = findViewById(R.id.nameInput);
        userNameInput = findViewById(R.id.userNameInput);
        emailInput = findViewById(R.id.emailInput);
        passwordInput = findViewById(R.id.passwordInput);
        confirmPasswordInput = findViewById(R.id.confirmPasswordInput);
        signUpButton = findViewById(R.id.signUpButton);

        networkHelper = new NetworkHelper();
        tokenManager = TokenManager.getInstance(this);

        backIcon.setOnClickListener(v -> {
            Intent intent = new Intent(SignUpActivity.this, LoginActivity.class);
            startActivity(intent);
        });

        signUpButton.setOnClickListener(v -> registerUser());
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
                        AuthResponse authResponse = new AuthResponse(responseJson);
                        tokenManager.saveToken(authResponse.getToken());

                        Intent intent = new Intent(SignUpActivity.this, GameCenterActivity.class);
                        intent.putExtra("user", authResponse.getUser());
                        startActivity(intent);
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
