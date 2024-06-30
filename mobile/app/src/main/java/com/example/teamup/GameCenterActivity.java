package com.example.teamup;

import android.content.Intent;
import android.graphics.Color;
import androidx.core.graphics.Insets;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.teamup.domain.Game;
import com.example.teamup.domain.Platform;
import com.example.teamup.domain.User;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class GameCenterActivity extends AppCompatActivity {

    EditText searchInput;
    LinearLayout platformsNavBar;
    LinearLayout categoriesLayout;

    User user;
    NetworkHelper networkHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_game_center);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        try {
            Intent intent = getIntent();
            user = intent.getSerializableExtra("user", User.class);
        } catch (Exception e) {
            Intent intent = new Intent(GameCenterActivity.this, LoginActivity.class);
            startActivity(intent);
            return;
        }

        searchInput = findViewById(R.id.searchInput);
        platformsNavBar = findViewById(R.id.platformNavBar);
        categoriesLayout = findViewById(R.id.categoriesLayout);

        networkHelper = new NetworkHelper(TokenManager.getInstance(this));

        fetchPlatforms();
    }

    void fetchPlatforms() {
        networkHelper.getRequest("/platforms", new NetworkHelper.NetworkCallback() {
            @Override
            public void onSuccess(String data) {
                runOnUiThread(() -> {
                    try {
                        List<Platform> platforms = parsePlatformsFromJson(data);
                        populatePlatforms(platforms);
                    } catch (Exception e) {
                        runOnUiThread(() -> {
                            Log.println(Log.ERROR, "platforms", e.getMessage());
                            Toast.makeText(GameCenterActivity.this, "Failed to parse games", Toast.LENGTH_SHORT).show();
                        });
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Log.println(Log.ERROR, "platforms", e.getMessage());
                    Toast.makeText(GameCenterActivity.this, "Failed to fetch games", Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    private List<Platform> parsePlatformsFromJson(String data) throws JSONException {
        List<Platform> platforms = new ArrayList<>();

        JSONArray jsonArray = new JSONArray(data);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);

            List<Game> games = new ArrayList<>();
            if (jsonObject.has("games")) {
                JSONArray nestedArray = jsonObject.getJSONArray("games");
                for (int j = 0; j < nestedArray.length(); j++) {
                    JSONObject nestedObject = nestedArray.getJSONObject(j);
                    games.add(new Game(
                            nestedObject.getString("id"),
                            nestedObject.getString("bannerImg"),
                            nestedObject.getString("profileImg"),
                            nestedObject.getString("name"))
                    );
                }
            }

            platforms.add(new Platform(
                    jsonObject.getString("id"),
                    jsonObject.getString("name"),
                    games)
            );
        }

        return platforms;
    }


    private void populatePlatforms(List<Platform> platforms) {
        for (int i = 0; i < platforms.size(); i++) {
            Platform platform = platforms.get(i);

            TextView platformView = createPlatformView(platform);
            platformsNavBar.addView(platformView);

            LinearLayout gameCategoryView = createGameCategoryView(platform);
            categoriesLayout.addView(gameCategoryView);
        }
    }

    TextView createPlatformView(Platform platform) {
        TextView platformView = new TextView(this);
        platformView.setText(platform.getName());
        platformView.setTextColor(Color.parseColor("#e7e7e7"));
        platformView.setTextSize(16);
        platformView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);

        LinearLayout.LayoutParams platformViewLayoutParams = new LinearLayout.LayoutParams(
                0,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        platformViewLayoutParams.weight = 1;
        platformView.setLayoutParams(platformViewLayoutParams);

        // Drawable drawableBottom = getResources().getDrawable(R.drawable.border_bottom);
        // platformView.setCompoundDrawablesWithIntrinsicBounds(null, null, null, drawableBottom);
        // platformView.setCompoundDrawablePadding(8);

        platformView.setAutoLinkMask(android.text.util.Linkify.WEB_URLS);

        return platformView;
    }

    LinearLayout createGameCategoryView(Platform platform) {
        LinearLayout gameCategoryView = (LinearLayout) getLayoutInflater().inflate(R.layout.game_category, null);

        TextView categoryTitle = gameCategoryView.findViewById(R.id.categoryTitle);
        categoryTitle.setText(platform.getName());

        LinearLayout gamesLayout = gameCategoryView.findViewById(R.id.gamesLayout);
        for (Game game : platform.getGames()) {
            ImageView imageView = new ImageView(this);
            Glide.with(this).load(game.getProfileImg()).into(imageView);
            imageView.setScaleType(ImageView.ScaleType.FIT_XY);
            imageView.setAdjustViewBounds(true);
            imageView.setOnClickListener(v -> {
                Intent intent = new Intent(GameCenterActivity.this, GameNetworkActivity.class);
                intent.putExtra("game", game);
                startActivity(intent);
            });
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.MATCH_PARENT
            );
            layoutParams.setMargins(0, 0, 20, 0);
            imageView.setLayoutParams(layoutParams);
            gamesLayout.addView(imageView);
        }

        return gameCategoryView;
    }
}