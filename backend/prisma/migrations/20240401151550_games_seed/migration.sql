INSERT INTO
    "Platform" (id, img, "name", "createdAt", "updatedAt")
VALUES
    ('1', 'platform1.jpg', 'PC', NOW(), NOW()),
    ('2', 'platform2.jpg', 'PlayStation 4', NOW(), NOW()),
    ('3', 'platform3.jpg', 'Xbox One', NOW(), NOW());

INSERT INTO
    "Game" ("id", "bannerImg", "profileImg", "name", "createdAt", "updatedAt")
VALUES
    (
        '1',
        'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b',
        'https://cdn.wallpapersafari.com/27/32/qKQLwp.jpg',
        'League of Legends',
        NOW(),
        NOW()
    ),
    (
        '2',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg',
        'https://upload.wikimedia.org/wikipedia/en/3/31/Dota_2_Steam_artwork.jpg',
        'Dota 2',
        NOW(),
        NOW()
    ),
    (
        '3',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPSS8D9L5atIP3dCHNFgDiRZ4R90RJlsh4g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAL1bOicLnY-If83_-CGhtZe1TMi5Mmg6OOg&s',
        'Counter Strike 2',
        NOW(),
        NOW()
    ),
    (
        '4',
        'https://wallpapercg.com/download/call-of-duty-warzone-2-3840x2160-20300.jpg',
        'https://i.pinimg.com/736x/b0/bc/f8/b0bcf82ad5796094d8f93fc0c2dba043.jpg',
        'COD: Warzone',
        NOW(),
        NOW()
    ),
    (
        '5',
        'https://images5.alphacoders.com/132/1322943.jpg',
        'https://preview.redd.it/m9h02s364dl31.png?width=640&crop=smart&auto=webp&s=6c72331765b0d984e3c083d9dfcc104192b549c1',
        'Rainbow Six Siege',
        NOW(),
        NOW()
    );

INSERT INTO
    "GamePlatform" ("gameId", "platformId")
VALUES
    ('1', '1'),
    ('2', '1'),
    ('3', '1'),
    ('4', '1'),
    ('5', '1'),
    ('4', '2'),
    ('5', '2'),
    ('4', '3'),
    ('5', '3');

-- Insert Users
INSERT INTO
    "User" ("id", "steamId", "img", "name", "displayName", "email", "password", "createdAt", "updatedAt")
VALUES
    (
        'uuid-1',
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
        'uuid-2',
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
        'uuid-3',
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
        'uuid-4',
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
    ('uuid-1', 'uuid-1', 'Discord', '@zer0', NOW()),
    ('uuid-2', 'uuid-2', 'Discord', '@o_rocha', NOW()),
    ('uuid-3', 'uuid-3', 'Discord', '@kaudc', NOW()),
    ('uuid-4', 'uuid-4', 'Discord', '@zM1ckey', NOW()),
    ('uuid-5', 'uuid-1', 'Steam', '888684141', NOW()),
    ('uuid-6', 'uuid-2', 'Steam', '888684141', NOW()),
    ('uuid-7', 'uuid-4', 'Steam', '888684141', NOW()),
    ('uuid-8', 'uuid-1', 'Steam', '888684141', NOW()),
    ('uuid-9', 'uuid-4', 'Xbox', 'zM1ckey', NOW());

-- Insert UserGame
INSERT INTO
    "UserGame" ("userId", "gameId", "playTime", "rank")
VALUES
    ('uuid-1', '1', '5 anos', 'Prata'),
    ('uuid-1', '2', '1 anos', 'Bronze'),
    ('uuid-1', '3', '10 anos', 'Predator'),
    ('uuid-2', '5', '1 anos', 'Ouro'),
    ('uuid-3', '5', '5 anos', 'Predator'),
    ('uuid-3', '3', '5 anos', 'Diamante'),
    ('uuid-3', '2', '2 anos', 'Ouro'),
    ('uuid-4', '1', '1 anos', 'Prata'),
    ('uuid-4', '2', '2 meses', 'Prata');