package com.example.teamup;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.teamup.domain.Game;
import com.example.teamup.domain.Player;
import com.example.teamup.helpers.NetworkHelper;
import com.example.teamup.helpers.TokenManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

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

        Glide.with(this).load(game.getBannerImg()).into(bannerView);
        gameTitleView.setText(game.getName());

        networkHelper = new NetworkHelper(TokenManager.getInstance(this));

        backButton.setOnClickListener(v -> {
            Intent intent = new Intent(GameNetworkActivity.this, GameCenterActivity.class);
            startActivity(intent);
        });

        fetchPlayers();
    }

    void fetchPlayers() {

        networkHelper.getRequest("/games/" + game.getId(), new NetworkHelper.NetworkCallback() {
            @Override
            public void onSuccess(String data) {
                runOnUiThread(() -> {
                    try {
                        List<Player> players = parseGamePlayersFromJson(data);
                        populatePlayers(players);
                    } catch (Exception e) {
                        Log.println(Log.ERROR, "parsePlayers", e.getMessage());
                        Toast.makeText(GameNetworkActivity.this, "Failed to parse players", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Log.println(Log.ERROR, "fetchPlayers", e.getMessage());
                    Toast.makeText(GameNetworkActivity.this, "Failed to fetch players", Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    private List<Player> parseGamePlayersFromJson(String data) throws JSONException {
        List<Player> players = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(data);
        JSONArray jsonArray = jsonObject.getJSONArray("players");
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject playerObject = jsonArray.getJSONObject(i);
            players.add(new Player(
                    playerObject.getString("id"),
                    playerObject.getString("name"),
                    playerObject.getString("rank"),
                    playerObject.getString("playTime"))
            );
        }

        return players;
    }


    private void populatePlayers(List<Player> players) {
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);

            LinearLayout playerView = createPlayerView(player);
            playersGridLayout.addView(playerView);
        }
    }

    LinearLayout createPlayerView(Player player) {
        LinearLayout playerView = (LinearLayout) getLayoutInflater().inflate(R.layout.player_info, null);

        TextView playerNameView = playerView.findViewById(R.id.playerName);
        playerNameView.setText(player.getName());

        TextView playTimeView = playerView.findViewById(R.id.playTime);
        playTimeView.setText(player.getPlayTime());

        TextView rankView = playerView.findViewById(R.id.rank);
        rankView.setText(player.getRank());

        return playerView;
    }
}