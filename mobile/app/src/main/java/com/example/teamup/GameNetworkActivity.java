package com.example.teamup;

import android.app.Dialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
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
import com.example.teamup.domain.Contact;
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
    ClipboardManager clipboard;


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
        clipboard = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);

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

        LinearLayout connectButton = playerView.findViewById(R.id.connectButton);
        connectButton.setOnClickListener(v -> {
            Dialog dialog = createPlayerInfoDialog(player);
            dialog.show();
        });

        return playerView;
    }

    Dialog createPlayerInfoDialog(Player player) {
        new Dialog(this);
        Dialog dialog = new Dialog(this);
        dialog.setContentView(R.layout.dialog_connect);

        ImageView closeButton = dialog.findViewById(R.id.closeButton);
        closeButton.setOnClickListener(v -> dialog.cancel());

        TextView playerName = dialog.findViewById(R.id.playerName);
        playerName.setText(player.getName());

        networkHelper.getRequest("/users/" + player.getId(), new NetworkHelper.NetworkCallback() {
            @Override
            public void onSuccess(String data) {
                runOnUiThread(() -> {
                    try {
                        List<Contact> contacts = parseContacts(data);
                        LinearLayout dialogContent = dialog.findViewById(R.id.dialogContent);
                        for (Contact contact : contacts) {
                            dialogContent.addView(createContactView(contact));
                        }
                    } catch (Exception e) {
                        Log.println(Log.ERROR, "parsePlayer", e.getMessage());
                        Toast.makeText(GameNetworkActivity.this, "Failed to parse player", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Log.println(Log.ERROR, "fetchPlayer", e.getMessage());
                    Toast.makeText(GameNetworkActivity.this, "Failed to fetch player", Toast.LENGTH_SHORT).show();
                });
            }
        });

        return dialog;
    }

    LinearLayout createContactView(Contact contact) {
        LinearLayout contactViewGroup = new LinearLayout(this);
        contactViewGroup.setOrientation(LinearLayout.VERTICAL);

        TextView platformView = new TextView(this);
        platformView.setText(contact.getPlatform());
        platformView.setTextColor(Color.parseColor("#c4c4c6"));
        platformView.setTextSize(16);

        LinearLayout contactView = new LinearLayout(this);
        LinearLayout.LayoutParams contactViewLayoutParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        contactViewLayoutParams.setMargins(0, 0, 0, 20);
        contactView.setLayoutParams(contactViewLayoutParams);
        contactView.setGravity(Gravity.CENTER);
        contactView.setOrientation(LinearLayout.HORIZONTAL);
        contactView.setPadding(5, 5, 5, 5);
        contactView.setBackgroundColor(Color.parseColor("#18181b"));

        TextView contactInfoView = new TextView(this);
        contactInfoView.setText(contact.getName());
        LinearLayout.LayoutParams textViewParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
                1
        );
        contactInfoView.setLayoutParams(textViewParams);
        contactInfoView.setPadding(10, 10, 10, 10);
        ;
        contactInfoView.setTextColor(Color.parseColor("#c4c4c6"));

        ImageView copyButtonView = new ImageView(this);
        LinearLayout.LayoutParams imageViewParams = new LinearLayout.LayoutParams(
                28,
                28
        );
        imageViewParams.setMargins(20, 0, 20, 0);
        copyButtonView.setLayoutParams(imageViewParams);
        copyButtonView.setImageResource(R.drawable.add);

        contactViewGroup.addView(platformView);
        contactViewGroup.addView(contactView);
        contactView.addView(contactInfoView);
        contactView.addView(copyButtonView);

        contactView.setOnClickListener(v -> {
            ClipData clip = ClipData.newPlainText("contact", contact.getName());
            clipboard.setPrimaryClip(clip);
            copyButtonView.setImageResource(R.drawable.check);
        });

        return contactViewGroup;
    }

    List<Contact> parseContacts(String data) throws JSONException {
        List<Contact> contacts = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(data);
        JSONArray jsonArray = jsonObject.getJSONArray("contacts");
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject playerObject = jsonArray.getJSONObject(i);
            contacts.add(new Contact(
                    playerObject.getString("id"),
                    playerObject.getString("platform"),
                    playerObject.getString("name"))
            );
        }

        return contacts;
    }
}