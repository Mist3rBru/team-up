package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.teamup.domain.Game;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

public class GameNetworkActivity extends AppCompatActivity {

    ImageView backButton;
    ImageView bannerView;
    TextView gameTitleView;
    GridLayout playersGridLayout;

    Game game;
    NetworkHelper networkHelper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_game_network);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        try {
            Intent intent = getIntent();
            game = intent.getSerializableExtra("game", Game.class);
        } catch (Exception e) {
            Intent intent = new Intent(GameNetworkActivity.this, GameCenterActivity.class);
            startActivity(intent);
            return;
        }

        bannerView = findViewById(R.id.bannerView);
        gameTitleView = findViewById(R.id.gameTitleView);
        playersGridLayout = findViewById(R.id.playersGridLayout);
        backButton = findViewById(R.id.icon_left);

        Glide.with(this).load(game.getImg()).into(bannerView);
        gameTitleView.setText(game.getName());

        networkHelper = new NetworkHelper(TokenManager.getInstance(this));

        backButton.setOnClickListener(v -> {
            Intent intent = new Intent(GameNetworkActivity.this, GameCenterActivity.class);
            startActivity(intent);
        });
    }
}