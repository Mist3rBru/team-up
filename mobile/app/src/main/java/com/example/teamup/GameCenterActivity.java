package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.teamup.domain.User;

import org.json.JSONException;
import org.json.JSONObject;

public class GameCenterActivity extends AppCompatActivity {

    EditText searchInput;
    User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_game_center);

        try {
            Intent intent = getIntent();
            user = intent.getSerializableExtra("user",User.class);
        } catch (Exception e) {
            Intent intent=   new Intent(GameCenterActivity.this, LoginActivity.class);
            startActivity(intent);
            return;
        }

        searchInput = findViewById(R.id.searchInput);
        searchInput.setText(user.getName());


        ImageView gameImage = findViewById(R.id.game6);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        gameImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=   new Intent(GameCenterActivity.this, GameNetworkActivity.class);
                startActivity(intent);
            }
        });


    }
}