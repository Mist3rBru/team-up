INSERT INTO
    "Platform" (id, img, "name", "createdAt", "updatedAt")
VALUES
    ('1', 'platform1.jpg', 'PC', NOW(), NOW()),
    (
        '2',
        'platform2.jpg',
        'PlayStation 4',
        NOW(),
        NOW()
    ),
    ('3', 'platform3.jpg', 'Xbox One', NOW(), NOW());

INSERT INTO
    "Game" (id, img, "name", "createdAt", "updatedAt")
VALUES
    (
        '1',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/header.jpg?t=1700659167',
        'DARK SOULS™: REMASTERED',
        NOW(),
        NOW()
    ),
    (
        '2',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg?t=1700587390',
        'DARK SOULS™ III',
        NOW(),
        NOW()
    ),
    (
        '3',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/header.jpg?t=1713310478',
        'Resident Evil 7 Biohazard',
        NOW(),
        NOW()
    );

INSERT INTO
    "GamePlatform" ("gameId", "platformId")
VALUES
    ('1', '1'),
    ('1', '2'),
    ('2', '2'),
    ('3', '1'),
    ('3', '3');