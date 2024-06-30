INSERT INTO
    "Platform" (id, img, "name", "createdAt", "updatedAt")
VALUES
    ('0847f13e-3730-11ef-a3d3-00155d3c27b1', 'platform1.jpg', 'PC', NOW(), NOW()),
    ('08a6c196-3730-11ef-b7df-00155d3c27b1', 'platform2.jpg', 'PlayStation 4', NOW(), NOW()),
    ('08d4b74a-3730-11ef-82ba-00155d3c27b1', 'platform3.jpg', 'Xbox One', NOW(), NOW());

INSERT INTO
    "Game" ("id", "bannerImg", "profileImg", "name", "createdAt", "updatedAt")
VALUES
    (
        '2d81f29c-3730-11ef-a243-00155d3c27b1',
        'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b',
        'https://cdn.wallpapersafari.com/27/32/qKQLwp.jpg',
        'League of Legends',
        NOW(),
        NOW()
    ),
    (
        '36174ed4-3730-11ef-8a40-00155d3c27b1',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg',
        'https://upload.wikimedia.org/wikipedia/en/3/31/Dota_2_Steam_artwork.jpg',
        'Dota 2',
        NOW(),
        NOW()
    ),
    (
        '3c941c88-3730-11ef-8e4a-00155d3c27b1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPSS8D9L5atIP3dCHNFgDiRZ4R90RJlsh4g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAL1bOicLnY-If83_-CGhtZe1TMi5Mmg6OOg&s',
        'Counter Strike 2',
        NOW(),
        NOW()
    ),
    (
        '423652d2-3730-11ef-beea-00155d3c27b1',
        'https://wallpapercg.com/download/call-of-duty-warzone-2-3840x2160-20300.jpg',
        'https://i.pinimg.com/736x/b0/bc/f8/b0bcf82ad5796094d8f93fc0c2dba043.jpg',
        'COD: Warzone',
        NOW(),
        NOW()
    ),
    (
        '48cfd730-3730-11ef-aee5-00155d3c27b1',
        'https://images5.alphacoders.com/132/1322943.jpg',
        'https://preview.redd.it/m9h02s364dl31.png?width=640&crop=smart&auto=webp&s=6c72331765b0d984e3c083d9dfcc104192b549c1',
        'Rainbow Six Siege',
        NOW(),
        NOW()
    );

INSERT INTO
    "GamePlatform" ("gameId", "platformId")
VALUES
    ('2d81f29c-3730-11ef-a243-00155d3c27b1', '0847f13e-3730-11ef-a3d3-00155d3c27b1'),
    ('36174ed4-3730-11ef-8a40-00155d3c27b1', '0847f13e-3730-11ef-a3d3-00155d3c27b1'),
    ('3c941c88-3730-11ef-8e4a-00155d3c27b1', '0847f13e-3730-11ef-a3d3-00155d3c27b1'),
    ('423652d2-3730-11ef-beea-00155d3c27b1', '0847f13e-3730-11ef-a3d3-00155d3c27b1'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '0847f13e-3730-11ef-a3d3-00155d3c27b1'),
    ('423652d2-3730-11ef-beea-00155d3c27b1', '08a6c196-3730-11ef-b7df-00155d3c27b1'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '08a6c196-3730-11ef-b7df-00155d3c27b1'),
    ('423652d2-3730-11ef-beea-00155d3c27b1', '08d4b74a-3730-11ef-82ba-00155d3c27b1'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '08d4b74a-3730-11ef-82ba-00155d3c27b1');

-- Insert Users
INSERT INTO
    "User" ("id", "steamId", "img", "name", "displayName", "email", "password", "createdAt", "updatedAt")
VALUES
    (
        '36174ed4-3730-11ef-8a40-00155d3c27b1',
        NULL,
        'img-1.png',
        'Zer0',
        'Zer0',
        'zer0@example.com',
        'password-hash',
        NOW(),
        NOW()
    ),
    (
        '3c941c88-3730-11ef-8e4a-00155d3c27b1',
        NULL,
        'img-2.png',
        'O_Rocha',
        'O_Rocha',
        'orocha@example.com',
        'password-hash',
        NOW(),
        NOW()
    ),
    (
        '48cfd730-3730-11ef-aee5-00155d3c27b1',
        NULL,
        'img-3.png',
        'Kaudc',
        'Kaudc',
        'kaudc@example.com',
        'password-hash',
        NOW(),
        NOW()
    ),
    (
        'a5cb383a-3730-11ef-8831-00155d3c27b1',
        NULL,
        'img-4.png',
        'zM1ckey',
        'zM1ckey',
        'zm1ckey@example.com',
        'password-hash',
        NOW(),
        NOW()
    );

-- Insert UserContacts
INSERT INTO
    "UserContact" ("id", "userId", "platform", name, "createdAt")
VALUES
    ('b12a7114-3730-11ef-a185-00155d3c27b1', '36174ed4-3730-11ef-8a40-00155d3c27b1', 'Discord', '@zer0', NOW()),
    ('b704e6fa-3730-11ef-a4cf-00155d3c27b1', '3c941c88-3730-11ef-8e4a-00155d3c27b1', 'Discord', '@o_rocha', NOW()),
    ('baef190c-3730-11ef-b232-00155d3c27b1', '48cfd730-3730-11ef-aee5-00155d3c27b1', 'Discord', '@kaudc', NOW()),
    ('bdb916a6-3730-11ef-bd36-00155d3c27b1', 'a5cb383a-3730-11ef-8831-00155d3c27b1', 'Discord', '@zM1ckey', NOW()),
    ('c3aabc22-3730-11ef-9164-00155d3c27b1', '36174ed4-3730-11ef-8a40-00155d3c27b1', 'Steam', '888684141', NOW()),
    ('c691b3dc-3730-11ef-9934-00155d3c27b1', '3c941c88-3730-11ef-8e4a-00155d3c27b1', 'Steam', '888684141', NOW()),
    ('cb96a5f4-3730-11ef-9a77-00155d3c27b1', 'a5cb383a-3730-11ef-8831-00155d3c27b1', 'Steam', '888684141', NOW()),
    ('d0187940-3730-11ef-b6e0-00155d3c27b1', '36174ed4-3730-11ef-8a40-00155d3c27b1', 'Steam', '888684141', NOW()),
    ('d3e26180-3730-11ef-9719-00155d3c27b1', 'a5cb383a-3730-11ef-8831-00155d3c27b1', 'Xbox', 'zM1ckey', NOW());

-- Insert UserGame
INSERT INTO
    "UserGame" ("userId", "gameId", "playTime", "rank")
VALUES
    ('36174ed4-3730-11ef-8a40-00155d3c27b1', '2d81f29c-3730-11ef-a243-00155d3c27b1', '5 anos', 'Prata'),
    ('36174ed4-3730-11ef-8a40-00155d3c27b1', '36174ed4-3730-11ef-8a40-00155d3c27b1', '1 anos', 'Bronze'),
    ('36174ed4-3730-11ef-8a40-00155d3c27b1', '3c941c88-3730-11ef-8e4a-00155d3c27b1', '10 anos', 'Predator'),
    ('3c941c88-3730-11ef-8e4a-00155d3c27b1', '48cfd730-3730-11ef-aee5-00155d3c27b1', '1 anos', 'Ouro'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '48cfd730-3730-11ef-aee5-00155d3c27b1', '5 anos', 'Predator'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '3c941c88-3730-11ef-8e4a-00155d3c27b1', '5 anos', 'Diamante'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '36174ed4-3730-11ef-8a40-00155d3c27b1', '2 anos', 'Ouro'),
    ('a5cb383a-3730-11ef-8831-00155d3c27b1', '2d81f29c-3730-11ef-a243-00155d3c27b1', '1 anos', 'Prata'),
    ('3c941c88-3730-11ef-8e4a-00155d3c27b1', '423652d2-3730-11ef-beea-00155d3c27b1', '5 anos', 'Ouro'),
    ('36174ed4-3730-11ef-8a40-00155d3c27b1', '423652d2-3730-11ef-beea-00155d3c27b1', '2 meses', 'Prata'),
    ('48cfd730-3730-11ef-aee5-00155d3c27b1', '423652d2-3730-11ef-beea-00155d3c27b1', '3 meses', 'Prata'),
    ('a5cb383a-3730-11ef-8831-00155d3c27b1', '423652d2-3730-11ef-beea-00155d3c27b1', '8 anos', 'Predator');