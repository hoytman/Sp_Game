class Example extends Phaser.Scene {
    constructor() {
        super();
        this.timeline = []; // Initialize timeline as an empty array
        this.funcOverride = '';
        this.background_objects = []; // Array to store background objects
        this.leaves = []; // Array to store all created leaves
        this.lastLeafSoundTime = 0; // New variable to track last leaf sound time
        this.damageTexts = []; // Array to store damage texts
        this.leafSize = 20;
        this.collectedLeaves = 100; // Variable to track collected leaves
        this.lastFired = 0;
        this.paused = false;
        this.MAX_WORLD_BOUND = 5000; // New constant for maximum world-bound distance
        this.ENEMY_SPAWN_DISTANCE = 400; // New constant for enemy spawn distance
        this.ENEMY_REMOVAL_DISTANCE = 800; // New constant for enemy removal distance
        this.MIN_OBJECT_DISTANCE = 200; // Minimum distance between objects
        this.textNotCreated = true; // Initialize textNotCreated
        this.player;
        this.playerSpeed = 2;
        this.chestHeight = 35;
        this.worldContainer;
        this.frontWorldContainer;
        this.leafContainer;
        this.cursors;
        this.playerX = 0;
        this.playerY = 0;
        this.playerHealth = 1000;
        this.healthBar;
        this.lastDamageTime = 0;
        this.lastEnemySoundTime = 0; // New variable to track the last time enemy sound was played
        this.bg_shed;
        this.textFields = [];
        this.totalItems = 0; // Variable to track total number of items
        this.enemies = []; // Array to store enemy objects
        this.lastEnemyDirectionChangeTime = 0;
        this.gameTimer = 0; // New game timer
        this.shopPage = 1;
        this.shopMaxPage = 20;
        this.dots = [];
        this.completedSegment = -1;
        this.weaponSlots = 1;
        this.filledWeaponSlots = 1;
        this.objectDepthSort = [];
        this.objectDepthSortStep = 0;
        // Timeline

        //Key Words:
        //      rate: how may to create per second
        //      spawn_distance: how far away they spawn
        //      spacing: spreads out the grouping of the placement
        //      pattern=circle : spawn enemies all around the player
        //      pattern=angle: spawn enemies in a direction from the player.
        //          angle: the angle that points to the spawy point
        //      pattern=angle: spawn enemies in a direction from the player.
        //          angle: the angle that points to the spawy point
        //      pattern=point: spawn enemies at a point on the pmap
        //          x: the x cords
        //          y: the y cords

        this.timeline = [];
        this.powerups = {};
        this.weapons = {};
        this.enemyProperties = {};

        this.activeBullets = {
            jellyBeans: [],
            candyCorns: [],
            cottonCandies: [],
            candyBags: [],
            iceCreams: [],
            lollipops: [],
            peppermints: [],
            cakes: [],
            bonbons: [],
            cupCakes: [],
            chocolateShields: []
        }

        // Global object for background objects
        this.backgroundObjects = {
            shed: {
                count: 50,
                scale: 0.5
            },
            bbq: {
                count: 50,
                scale: 0.3
            },
            water_can: {
                count: 100,
                scale: 0.2
            },
            swing_set: {
                count: 50,
                scale: 0.4
            },
            lawn_chair: {
                count: 100,
                scale: 0.3
            },
            bush_pot: {
                count: 200,
                scale: 0.3
            },
            flower_box: {
                count: 200,
                scale: 0.3
            },
            plant_pot: {
                count: 200,
                scale: 0.3
            }
        };
    }
    preload() {
        const timestamp = new Date().getTime(); // Generate a unique timestamp
        this.load.script('timeline', `https://raw.githubusercontent.com/hoytman/Sp_Game/refs/heads/main/timeline.js?t=${timestamp}`);
        this.load.script('powerups', `https://raw.githubusercontent.com/hoytman/Sp_Game/refs/heads/main/powerups.js?t=${timestamp}`);
        this.load.script('weapons', `https://raw.githubusercontent.com/hoytman/Sp_Game/refs/heads/main/weapons.js?t=${timestamp}`);
        this.load.script('enemyProperties', `https://raw.githubusercontent.com/hoytman/Sp_Game/refs/heads/main/enemyProperties.js?t=${timestamp}`);
        this.load.image('moon', 'https://play.rosebud.ai/assets/moon.png?dwcp');
        this.load.audio('cashSound', 'https://play.rosebud.ai/assets/cash_12.mp3?jpV5');
        this.load.audio('damageSound', 'https://play.rosebud.ai/assets/ow.mp3?o6Oi');
        this.load.audio('introMusic', 'https://play.rosebud.ai/assets/intro.mp3?lApB');
        this.load.audio('prologMusic', 'https://play.rosebud.ai/assets/prolog.mp3?5J1C');
        this.load.image('player1', 'https://play.rosebud.ai/assets/char1.png?hZsE');
        this.load.image('player2', 'https://play.rosebud.ai/assets/char2.png?6yQp');
        this.load.image('cottonCandy', 'https://play.rosebud.ai/assets/cottonc.png?VU5c');
        this.load.image('candyBag', 'https://play.rosebud.ai/assets/Bag_candy.png?Y9XW');
        this.load.image('lollipop', 'https://play.rosebud.ai/assets/lolly.png?8l35');
        this.load.image('iceCream', 'https://play.rosebud.ai/assets/ice_cream.png?trXw');
        this.load.image('peppermint', 'https://play.rosebud.ai/assets/peppermint.png?0qE7');
        this.load.image('cake', 'https://play.rosebud.ai/assets/cake.png?x6uQ');
        this.load.image('bonbon', 'https://play.rosebud.ai/assets/candy_bw.png?fN5L');
        this.load.image('cupCake', 'https://play.rosebud.ai/assets/cake_small.png?jZxd');
        this.load.image('chocolateShield', 'https://play.rosebud.ai/assets/choco.png?Ul5I');
        this.load.image('smallPumpkin', 'https://play.rosebud.ai/assets/sPumpkin.png?C1MQ');
        this.load.image('candyCorn', 'https://play.rosebud.ai/assets/ccorn.png?07D5');
        this.load.image('birdMummy', 'https://play.rosebud.ai/assets/bird_mummy.png?yYmo');
        this.load.image('blackBat', 'https://play.rosebud.ai/assets/bat.png?Ry6e');
        this.load.image('largePumpkin', 'https://play.rosebud.ai/assets/large_pumpkin.png?uFvC');
        this.load.image('leaf', 'https://play.rosebud.ai/assets/leaf.png?DExM');
        this.load.image('smallSkeleton', 'https://play.rosebud.ai/assets/small_skeleton.png?nJZA');
        this.load.image('greenMonster', 'https://play.rosebud.ai/assets/green_monster.png?taV1');
        this.load.image('largeGhost', 'https://play.rosebud.ai/assets/large_ghost.png?REZB');
        this.load.image('largeSkeleton', 'https://play.rosebud.ai/assets/large_skeleton.png?B5We');
        this.load.image('witch', 'https://play.rosebud.ai/assets/skeleton_witch.png?nWUc');
        this.load.image('wolfEnemy', 'https://play.rosebud.ai/assets/wolf.png?xssI');
        this.load.image('shed', 'https://play.rosebud.ai/assets/shed.png?qFPJ');
        this.load.image('bbq', 'https://play.rosebud.ai/assets/bbq.png?hTXS');
        this.load.image('water_can', 'https://play.rosebud.ai/assets/water_can.png?V1M1');
        this.load.image('swing_set', 'https://play.rosebud.ai/assets/swing_set.png?7KWh');
        this.load.image('lawn_chair', 'https://play.rosebud.ai/assets/lawn_chair.png?22Ta');
        this.load.image('bush_pot', 'https://play.rosebud.ai/assets/Bush_pot.png?S2Fi');
        this.load.image('flower_box', 'https://play.rosebud.ai/assets/flower_box.png?zazz');
        this.load.image('plant_pot', 'https://play.rosebud.ai/assets/plant_pot.png?8IsC');
        this.load.image('mummy', 'https://play.rosebud.ai/assets/mummy.png?yqRJ');
        this.load.image('smallBoss', 'https://play.rosebud.ai/assets/p_head_small.png?vz3J');
        this.load.image('largeBoss', 'https://play.rosebud.ai/assets/p_head_large.png?r9KZ');
        this.load.image('vineTiny', 'https://play.rosebud.ai/assets/vine_tiny.png?N0We');
        this.load.image('vineSmall', 'https://play.rosebud.ai/assets/vine_small.png?jCXF');
        this.load.image('vineBig', 'https://play.rosebud.ai/assets/vine_big.png?V2r3');
        this.load.image('vineHuge', 'https://play.rosebud.ai/assets/vine_huge.png?arvB');
        this.load.image('vineGiant', 'https://play.rosebud.ai/assets/vine_giant.png?WdKe');
        this.load.audio('menuMusic', 'https://play.rosebud.ai/assets/menu.mp3?mFp6');
        this.load.audio('enemyHitSound', 'https://play.rosebud.ai/assets/low_pop.mp3?kLLn');
        this.load.audio('enemyDestroySound', 'https://play.rosebud.ai/assets/lowest pop.mp3?NKVU');
        this.load.audio('leafPickupSound', 'https://play.rosebud.ai/assets/pop.mp3?17Pj');
        this.load.audio('boneMusic', 'https://play.rosebud.ai/assets/Bone.mp3?q3VE');
        this.load.audio('madnessMusic', 'https://play.rosebud.ai/assets/madness.mp3?rTXb');
        this.load.audio('winMusic', 'https://play.rosebud.ai/assets/Win.mp3?3krK');
        this.load.audio('runMusic', 'https://play.rosebud.ai/assets/Run.mp3?sDcl');
        this.load.audio('bossMusic', 'https://play.rosebud.ai/assets/Boss.mp3?3U9Y');
        this.load.audio('easyLevelMusic', 'https://play.rosebud.ai/assets/EasyLevel.mp3?glPv');
        this.load.audio('bossIntroMusic', 'https://play.rosebud.ai/assets/BossIntro.mp3?v6GG');
        // Add event listener for when all assets are loaded
        this.load.on('complete', this.onPrologueMusicLoaded, this);
    }
    onPrologueMusicLoaded() {
        console.log('All assets loaded, including prologue music and other music tracks.');
    }

    create() {
        // Load the timeline and powerups from the external scripts
        if (window.timeline) {
            this.timeline = window.timeline;
        } else {
            console.error('timeline not loaded from external script');
        }
        if (window.powerups) {
            this.powerups = window.powerups;
        } else {
            console.error('powerups not loaded from external script');
        }
        if (window.weapons) {
            this.weapons = window.weapons;
        } else {
            console.error('weapons not loaded from external script');
        }
        if (window.enemyProperties) {
            this.enemyProperties = window.enemyProperties;
        } else {
            console.error('enemyProperties not loaded from external script');
        }


        // Set up music chain
        this.introMusic = this.sound.add('introMusic');
        this.prologMusic = this.sound.add('prologMusic');

        this.menuMusic = null;



        this.prologMusic.setLoop(true);



        this.currentMusic = this.introMusic;
        // Play intro music, then prolog

        this.introMusic.play();
        this.introMusic.once('complete', () => {
            this.currentMusic = this.prologMusic;
            this.prologMusic.play();
        });



        // Create containers for the world objects


        this.leafContainer = this.add.container(0, 0);
        this.worldContainer = this.add.container(0, 0);
        this.frontWorldContainer = this.add.container(0, 0);
        // Set the background color to dark green
        this.cameras.main.setBackgroundColor('#006400');
        // Create duplicate player
        this.duplicatePlayer = this.add.sprite(400, 300, 'player1');
        this.duplicatePlayer.setOrigin(0.5, 1);
        this.duplicatePlayer.setScale(0.2);
        this.worldContainer.add(this.duplicatePlayer);
        // Enable physics
        this.physics.world.setBounds(-this.MAX_WORLD_BOUND, -this.MAX_WORLD_BOUND, this.MAX_WORLD_BOUND * 2, this.MAX_WORLD_BOUND * 2);
        // Track mouse position
        this.input.on('pointermove', (pointer) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
        });
        // Initialize game timer
        this.gameTimer = 0;
        // Add spacebar for shop toggle
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Set world bounds
        this.worldBounds = {
            left: -this.MAX_WORLD_BOUND,
            right: this.MAX_WORLD_BOUND,
            top: -this.MAX_WORLD_BOUND,
            bottom: this.MAX_WORLD_BOUND
        };
        // Create random background objects
        this.createRandomBackgroundObjects();
        // Create the player at the center of the screen

        this.player = this.add.sprite(400, 300, 'player1');
        this.player.setOrigin(0.5, 1); // Set origin to bottom center
        this.player.setScale(0.2); // Make the player 80% smaller
        this.player.setAlpha(0); // Make the player invisible
        // Adjust player's position to account for new origin
        this.player.y += this.player.height * this.player.scale * 0.5;
        this.player.size = 20;
        this.player.tall = 40;
        // Initialize player coordinates
        this.playerX = 0;
        this.playerY = 0;
        this.player.setDepth(0);
        this.leafContainer.setDepth(10);
        this.worldContainer.setDepth(20);
        this.frontWorldContainer.setDepth(30);

        // Create walking animation
        this.anims.create({
            key: 'walk',
            frames: [{
                key: 'player1'
            }, {
                key: 'player2'
            }],
            frameRate: 8,
            repeat: -1
        });
        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        // Initialize text fields
        // Create health bar
        this.healthBar = this.add.rectangle(775, 30, 500, 20, 0x00ff00);
        this.healthBar.setOrigin(1, 0.5);
        this.healthBar.setScrollFactor(0);
        this.healthBar.setDepth(100);
        // Create health bar background
        this.healthBarBackground = this.add.rectangle(775, 30, 500, 20, 0xff0000);
        this.healthBarBackground.setOrigin(1, 0.5);
        this.healthBarBackground.setScrollFactor(0);
        this.healthBarBackground.setDepth(99);
        // Create shop button
        this.shopButton = this.add.text(775, 70, 'Press SPACE to toggle shop', {
            font: '20px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 10,
                y: 5
            }
        });
        this.shopButton.setOrigin(1, 0.5);
        this.shopButton.setScrollFactor(0);
        this.shopButton.setInteractive();
        this.shopButton.on('pointerdown', () => this.toggleShop());
        this.shopButton.setDepth(100);

        this.introOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000);
        this.introOverlay.setDepth(1000);
    }


    toggleShop() {
        if (this.paused) {
            this.closeShop();
        } else {
            this.openShop();
        }
    }

    openShop() {
        if (this.paused) return; // Prevent opening if already open
        this.paused = true;
        this.shopOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
        this.shopOverlay.setScrollFactor(0);
        this.shopOverlay.setDepth(50);
        this.shopTitle = this.add.text(400, 70, 'Shop', {
            font: '32px Arial',
            fill: '#ffffff'
        });
        this.shopTitle.setOrigin(0.5);
        this.shopTitle.setScrollFactor(0);
        this.shopTitle.setDepth(51);
        // Pause game music and play menu music

        if (this.menuMusic === null) {
            this.menuMusic = this.sound.add('menuMusic');
            this.menuMusic.setLoop(true);
        }

        this.currentMusic.mute = true;
        this.menuMusic.play();
        this.fillShop();
    }

    shopGotoPage(pNum) {
        this.shopPage = pNum;
        this.resetShop()
    }

    fillShop() {
        this.shopPrevButton = null;
        this.shopNextButton = null;
        this.shopPageNum = null;
        if (this.shopPage != 1) {
            this.shopPrevButton = this.createButton(
                160,
                550,
                'Prev Page',
                '#008000',
            );
            this.shopPrevButton.setInteractive();
            this.shopPrevButton.on('pointerdown', () => this.shopGotoPage(this.shopPage - 1), this);
        }
        this.shopPageNum = this.createText(
            300,
            550,
            'Page ' + this.shopPage
        );
        if (this.shopPage != this.shopMaxPage) {
            this.shopNextButton = this.createButton(
                400,
                550,
                'Next Page',
                '#008000',
            );
            this.shopNextButton.setInteractive();
            this.shopNextButton.on('pointerdown', () => this.shopGotoPage(this.shopPage + 1), this);
        }

        // Instead of tracking actvation, this will disable the health powerup when health is maxed out.
        if (this.playerHealth == 1000) {
            this.powerups['more_health'].active = true;
        } else {
            this.powerups['more_health'].active = false;
        }
        let ind = 0;
        Object.entries(this.powerups).forEach(([key, powerupItem]) => {

            let preReqOk = true;
            if ('requires' in powerupItem) {
                if (powerupItem.requires == 'weaponSlots') {
                    if (this.weaponSlots <= this.filledWeaponSlots) {
                        preReqOk = false;
                    }
                } else {
                    if (!this.powerups[powerupItem.requires].active) {
                        preReqOk = false;
                    }
                }
            }

            if (powerupItem.page == this.shopPage) {
                if (!('price' in powerupItem)) {
                    powerupItem.titleDisplay = this.createText(
                        400,
                        110 + (ind * 40),
                        '•••••••••••••••••••••••• ' + powerupItem.title + ' ••••••••••••••••••••••••',
                    );
                    powerupItem.titleDisplay.setOrigin(0.5, 0.5);
                    ind++;
                    powerupItem.textDisplay = this.createText(
                        400,
                        110 + (ind * 40),
                        powerupItem.text
                    );
                    powerupItem.textDisplay.setOrigin(0.5, 0.5);
                    if ('text2' in powerupItem) {
                        ind++;
                        powerupItem.text2Display = this.createText(
                            400,
                            110 + (ind * 40),
                            powerupItem.text2
                        );
                        powerupItem.text2Display.setOrigin(0.5, 0.5);
                    }
                    ind++;
                } else if (!powerupItem.active && preReqOk && this.collectedLeaves >= powerupItem.price) {
                    powerupItem.titleDisplay = this.createText(
                        80,
                        110 + (ind * 40),
                        powerupItem.text + ': ' + powerupItem.price,
                    );
                    powerupItem.button = this.createButton(
                        20,
                        110 + (ind * 40),
                        'Buy',
                        '#008000',
                    );
                    powerupItem.button.setInteractive();
                    powerupItem.button.on('pointerdown', () => this.upgradePowerup(key), this);
                } else if (powerupItem.active) {
                    powerupItem.titleDisplay = this.createText(
                        80,
                        110 + (ind * 40),
                        powerupItem.text + ': ' + powerupItem.price,
                        '#00ff00'
                    );
                    powerupItem.button = this.createButton(
                        20,
                        110 + (ind * 40),
                        'Ok',
                        '#000000',
                        '#00ff00'
                    );
                } else {
                    powerupItem.titleDisplay = this.createText(
                        80,
                        110 + (ind * 40),
                        powerupItem.text + ': ' + powerupItem.price,
                        '#606060'
                    );
                    powerupItem.button = this.createButton(
                        20,
                        110 + (ind * 40),
                        'Buy',
                        '#606060',
                    );

                }

                ind++;
            }
        });
    }

    createButton(x, y, text, bg_color = '#000000', text_color = '#ffffff') {
        let button = this.add.text(
            x,
            y,
            text, {
                font: '24px Arial',
                fill: text_color,
                backgroundColor: bg_color,
                padding: {
                    x: 10,
                    y: 5
                }
            }
        );
        button.setOrigin(0, 0.5);
        button.setScrollFactor(0);
        button.setDepth(55);
        return button;
    }


    createText(x, y, text, text_color = '#ffffff') {
        let button = this.add.text(
            x,
            y,
            text, {
                font: '24px Arial',
                fill: text_color,
                padding: {
                    x: 10,
                    y: 5
                }
            }
        );
        button.setOrigin(0, 0.5);
        button.setScrollFactor(0);
        button.setDepth(55);
        return button;
    }
    closeShop() {
        if (!this.paused) return; // Prevent closing if already closed
        this.paused = false;
        this.shopOverlay.destroy();
        this.shopTitle.destroy();
        Object.values(this.powerups).forEach(powerupItem => {
            if (powerupItem.titleDisplay) powerupItem.titleDisplay.destroy();
            if (powerupItem.textDisplay) powerupItem.textDisplay.destroy();
            if (powerupItem.text2Display) powerupItem.text2Display.destroy();
            if (powerupItem.button) powerupItem.button.destroy();
        });
        if (this.shopPrevButton) this.shopPrevButton.destroy();
        if (this.shopPageNum) this.shopPageNum.destroy();
        if (this.shopNextButton) this.shopNextButton.destroy();
        // Stop menu music and resume game music
        this.menuMusic.stop();
        this.currentMusic.mute = false;

    }

    resetShop() {
        if (this.shopPrevButton) this.shopPrevButton.destroy();
        if (this.shopPageNum) this.shopPageNum.destroy();
        if (this.shopNextButton) this.shopNextButton.destroy();
        Object.values(this.powerups).forEach(powerupItem => {
            if (powerupItem.titleDisplay) powerupItem.titleDisplay.destroy();
            if (powerupItem.button) powerupItem.button.destroy();
            if (powerupItem.textDisplay) powerupItem.textDisplay.destroy();
            if (powerupItem.text2Display) powerupItem.text2Display.destroy();
        });
        this.fillShop();
    }

    upgradePowerup(key) {
        let myUpgrade = this.powerups[key];
        if (this.collectedLeaves >= myUpgrade.price) {
            this.collectedLeaves -= myUpgrade.price;
            myUpgrade.active = true;
            this.sound.play('cashSound');
            // Basic value updates
            if ('target' in myUpgrade && 'updates' in myUpgrade) {
                if (myUpgrade.target == 'this') {
                    Object.entries(myUpgrade.updates).forEach(([weaponAttr, attrValue]) => {
                        if (attrValue == '+1') {
                            this[weaponAttr] += 1;
                        } else {
                            this[weaponAttr] = attrValue;
                        }
                    });
                } else if (myUpgrade.target == 'player') {
                    Object.entries(myUpgrade.updates).forEach(([weaponAttr, attrValue]) => {
                        if (attrValue == '+1') {
                            this.player[weaponAttr] += 1;
                        } else {
                            this.player[weaponAttr] = attrValue;
                        }
                    });
                } else {
                    Object.entries(myUpgrade.updates).forEach(([weaponAttr, attrValue]) => {
                        if (attrValue == '+1') {
                            this.weapons[myUpgrade.target][weaponAttr] += 1;
                        } else {
                            this.weapons[myUpgrade.target][weaponAttr] = attrValue;
                        }
                    });
                }
            }

            // Additional updates
            switch (key) {
                case 'more_health':
                    this.playerHealth += 100;
                    if (this.playerHealth > 1000) {
                        this.playerHealth = 1000;
                    }
                    break;

                case 'leaf_easy':
                    for (let i = this.leaves.length - 1; i >= 0; i--) {
                        this.leaves[i].size = 50;
                        this.leafSize = 50;
                    }
                    break;
                case 'leaf_easy2':
                    for (let i = this.leaves.length - 1; i >= 0; i--) {
                        this.leaves[i].size = 100;
                        this.leafSize = 100;
                    }
                    break;

                case 'chocolateShield_active':
                case 'cc_active':
                case 'cotton_active':
                case 'icecream_active':
                case 'lollipop_active':
                case 'peppermint_active':
                case 'cake_active':
                case 'bonbon_active':
                case 'cupCake_active':
                case 'candybag_active':
                    this.filledWeaponSlots++;
                    break;

            }
        }
        this.resetShop();
    }

    // Note: for player/emeny collisions, don't use height.
    checkForCollision(enemy, obj, isObj1Enemy = false, isPlayer = false, isBullet = false) {
        let enemyX = enemy.x;
        if (isObj1Enemy) {
            enemyX += this.worldContainer.x;
        }
        let hDistance = enemyX - obj.x;
        if (hDistance < 0) {
            hDistance *= -1;
        }
        if (hDistance > 300) {
            return false;
        }

        let enemyY = enemy.y;
        if (isObj1Enemy) {
            enemyY += this.worldContainer.y;
        }

        let objY = obj.y;
        if (isBullet) {
            // Bullets are center oriented
            objY += obj.size
        }


        let vDistance = enemyY - obj.y;
        if (vDistance < 0) {
            vDistance *= -1;
        }
        if (vDistance > 300) {
            return false;
        }

        let enemySize = enemy.size;
        let objSize = obj.size;

        if (hDistance <= (enemySize + objSize)) {
            if (enemyY > obj.y) {
                let enemyHeight = 0;
                if (isPlayer == false && 'tall' in enemy) {
                    enemyHeight = enemy.tall;
                } else {
                    enemyHeight = enemySize * 2;
                }
                if (vDistance <= enemyHeight) {
                    return true;
                }
            } else {
                let objHeight = 0;
                if (isPlayer == false && 'tall' in obj) {
                    objHeight = obj.tall;
                } else {
                    objHeight = objSize * 2;
                }
                if (vDistance <= objHeight) {
                    return true;
                }
            }
        }
        return false;
    }
    update(time, delta) {
        // Update cinematic scene if it's active

        // Check for spacebar press to toggle shop
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.toggleShop();
        }
        // Update text displays
        this.updateTextDisplays();
        // Handle weapon firing

        // Update health bar
        this.healthBar.width = (this.playerHealth / 1000) * 500;


        switch (this.funcOverride) {
            case '':
                break;
            case 'createStars':
                this.createStars();
                break;
            case 'slideStars':
                this.slideStars();
                break;
            case 'fadeStars':
                this.fadeStars();
                break;
        }

        if (this.paused) {
            return;
        }

        this.runTimetime();

        if (this.paused) {
            return;
        }

        // Increment game timer
        this.gameTimer += delta;
        let isMoving = false;
        // Check for collisions between player and leaves, and remove old leaves

        for (let i = this.leaves.length - 1; i >= 0; i--) {
            const leaf = this.leaves[i];
            if (this.checkForCollision(leaf, this.player, true, false, true) ||
                this.powerups.leaf_easy3.active == true
            ) {
                if (Phaser.Math.Distance.Between(this.worldX, this.worldY, leaf.x, leaf.y) < 10) {
                    this.collectedLeaves++;
                    leaf.destroy();
                    this.leaves.splice(i, 1);
                    const currentTime = this.time.now;
                    if (currentTime - this.lastLeafSoundTime > 100) { // 100ms = 0.1 seconds
                        this.sound.play('leafPickupSound');
                        this.lastLeafSoundTime = currentTime;
                    }
                } else {
                    if (this.worldX < leaf.x) {
                        leaf.x -= 10
                    } else {
                        leaf.x += 10
                    }
                    if (this.worldY < leaf.y) {
                        leaf.y -= 10
                    } else {
                        leaf.y += 10
                    }
                }


            } else if (time - leaf.creationTime > 30000) { // 30 seconds in milliseconds
                leaf.destroy();
                this.leaves.splice(i, 1);
            }
        }


        // Move enemies towards player
        this.moveEnemies();

        // Check for enemy proximity and apply damage
        const currentTime = this.time.now;
        if (!this.isInvulnerable && currentTime - this.lastDamageTime > 500) { // Check if player is vulnerable and half a second has passed
            // Sort enemies by damage in descending order
            const sortedEnemies = this.enemies.sort((a, b) => b.damage - a.damage);
            for (let enemy of sortedEnemies) {
                if (this.checkForCollision(enemy, this.player, true, true)) {
                    this.playerHealth -= enemy.damage;
                    this.lastDamageTime = currentTime;
                    this.isInvulnerable = true;
                    this.sound.play('damageSound');
                    if (this.playerHealth <= 0) {
                        this.playerHealth = 0;
                        this.restartGame();
                    }
                    // Set a timer to make the player vulnerable again after 500 ms
                    this.time.delayedCall(500, () => {
                        this.isInvulnerable = false;
                    });
                    break; // Exit the loop after the first enemy damages the player
                }
            }
        }

        let newPlayerX = this.playerX;
        let newPlayerY = this.playerY;

        if (this.cursors.left.isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            newPlayerX -= this.playerSpeed;
            this.player.setFlipX(false); // Face right when moving left
            isMoving = true;
        } else if (this.cursors.right.isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            newPlayerX += this.playerSpeed;
            this.player.setFlipX(true); // Face left when moving right
            isMoving = true;
        }
        if (this.cursors.up.isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            newPlayerY -= this.playerSpeed;
            isMoving = true;
        } else if (this.cursors.down.isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            newPlayerY += this.playerSpeed;
            isMoving = true;
        }

        // Check if the new position is within bounds
        if (this.isWithinBounds(newPlayerX, newPlayerY)) {
            this.playerX = newPlayerX;
            this.playerY = newPlayerY;
            this.worldContainer.x = -this.playerX;
            this.worldContainer.y = -this.playerY;
            this.frontWorldContainer.x = -this.playerX;
            this.frontWorldContainer.y = -this.playerY;
            this.leafContainer.x = -this.playerX;
            this.leafContainer.y = -this.playerY;
            this.worldX = this.player.x - this.worldContainer.x;
            this.worldY = this.player.y - this.worldContainer.y;
            this.chestY = this.worldY - this.chestHeight;
            // Player position update code removed
        }

        // Update duplicate player position, animation, and flip state
        this.duplicatePlayer.x = this.worldX;
        this.duplicatePlayer.y = this.worldY;
        this.duplicatePlayer.setFlipX(this.player.flipX);

        if (this.player.anims.isPlaying) {
            this.duplicatePlayer.play('walk', true);
        } else {
            this.duplicatePlayer.stop();
            this.duplicatePlayer.setTexture('player1');
        }



        this.fireWeapons(currentTime);

        this.manageBullets(currentTime);

        if (isMoving) {
            this.player.play('walk', true);
        } else {
            this.player.stop();
            this.player.setTexture('player1');
        }
        // Update depths of all objects based on their Y position
        this.updateObjectDepths();



        // Remove distant enemies
        this.removeDistantEnemies();

        this.processDamageText(currentTime);


        //
        //update dots
        for (let i = this.dots.length - 1; i >= 0; i--) {
            this.dots[i].destroy();
        }
        const color = Phaser.Display.Color.GetColor(255, 0, 0);
        this.dots = [];
        this.addRedDot(this.worldX, this.worldY, color);
        this.addRedDot(this.worldX + this.player.size, this.worldY, color);
        this.addRedDot(this.worldX, this.worldY - this.player.tall, color);

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.addObjDots(this.enemies[i], color);
        }

        Object.values(this.activeBullets).forEach(group => {
            for (let i = group.length - 1; i >= 0; i--) {
                this.addObjDots(group[i], color, true);
            }
        });

        //
    }

    addObjDots(obj, color, is_bullet = false) {
        // 1 in 4 chance to return immediately
        if (Math.random() < .3) {
            return;
        }
        let ymod = 0;
        if (is_bullet) {
            ymod = obj.size;
        }
        this.addRedDot(obj.x, obj.y + ymod, color);
        this.addRedDot(obj.x + obj.size, obj.y + ymod, color);
        if ('tall' in obj) {
            this.addRedDot(obj.x, obj.y + ymod - obj.tall, color);
        }
        this.addRedDot(obj.x, obj.y + ymod - (obj.size * 2), color);
    }

    addRedDot(x, y, color) {
        let dot = this.add.circle(x, y, 2, color);
        dot.setScrollFactor(0);
        this.dots.push(dot);
        this.frontWorldContainer.add(dot);
    }

    fireWeapons(currentTime) {

        let angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y - this.chestHeight, this.mouseX, this.mouseY
        );

        // Fire Jelly Beans
        let jbData = this.weapons.jellyBeans;

        if (currentTime > jbData.nextShotAt) {
            jbData.nextShotAt = currentTime + jbData.fire_rate;
            this.fireJellyBean(this.worldX, this.chestY, angle, jbData, currentTime);
            if (this.powerups.jb_double.active) {
                this.fireJellyBean(this.worldX, this.chestY, angle, jbData, currentTime);
            }
        }
        // Fire Chocolate Shield
        if (this.powerups.chocolateShield_active.active) {
            let chocolateShieldData = this.weapons.chocolateShield;
            if (currentTime > chocolateShieldData.nextShotAt) {
                chocolateShieldData.nextShotAt = currentTime + chocolateShieldData.fire_rate;
                this.fireChocolateShield(this.worldX, this.chestY, angle, chocolateShieldData, currentTime, 0);
                this.fireChocolateShield(this.worldX, this.chestY, angle, chocolateShieldData, currentTime, 2);
                if (this.powerups.chocolateShield_increase.active) {
                    this.fireChocolateShield(this.worldX, this.chestY, angle, chocolateShieldData, currentTime, 1);
                    this.fireChocolateShield(this.worldX, this.chestY, angle, chocolateShieldData, currentTime, 3);
                }
            }
        }
        // Fire Cotton Candy
        if (this.powerups.cotton_active.active) {
            let ccData = this.weapons.cottonCandy;
            if (currentTime > ccData.nextShotAt) {
                ccData.nextShotAt = currentTime + ccData.fire_rate;
                this.fireCottonCandy(this.worldX, this.chestY, angle, ccData, currentTime);
            }
        }
        // Fire Candy Bag
        if (this.powerups.candybag_active.active) {
            let cbData = this.weapons.candyBag;
            if (currentTime > cbData.nextShotAt) {
                cbData.nextShotAt = currentTime + cbData.fire_rate;
                this.fireCandyBag(this.worldX, this.chestY, angle, cbData, currentTime);
            }
        }
        // Fire Ice Cream
        if (this.powerups.icecream_active.active) {
            let icData = this.weapons.iceCream;
            if (currentTime > icData.nextShotAt) {
                icData.nextShotAt = currentTime + icData.fire_rate;
                this.fireIceCream(this.worldX, this.chestY, angle, icData, currentTime);
            }
        }
        // Fire Lollipop
        if (this.powerups.lollipop_active.active) {
            let lollipopData = this.weapons.lollipop;
            if (currentTime > lollipopData.nextShotAt) {
                lollipopData.nextShotAt = currentTime + lollipopData.fire_rate;
                this.fireLollipop(this.worldX, this.chestY, angle, lollipopData, currentTime);
            }
        }

        // Fire Candy Corn
        if (this.powerups.cc_active.active) {
            let ccData = this.weapons.candyCorn;
            if (currentTime > ccData.nextShotAt) {
                ccData.nextShotAt = currentTime + ccData.fire_rate;
                this.fireCandyCorn(this.worldX, this.chestY, 0, ccData, currentTime);
                this.fireCandyCorn(this.worldX, this.chestY, 90, ccData, currentTime);
                this.fireCandyCorn(this.worldX, this.chestY, 180, ccData, currentTime);

                if (this.powerups.cc_double.active) {
                    this.fireCandyCorn(this.worldX, this.chestY, 45, ccData, currentTime);
                    this.fireCandyCorn(this.worldX, this.chestY, 135, ccData, currentTime);
                    this.fireCandyCorn(this.worldX, this.chestY, 225, ccData, currentTime);
                }
            }
        }
        // Fire Peppermint
        if (this.powerups.peppermint_active.active) {
            let peppermintData = this.weapons.peppermint;
            if (currentTime > peppermintData.nextShotAt) {
                peppermintData.nextShotAt = currentTime + peppermintData.fire_rate;
                this.firePeppermint(this.worldX, this.chestY, angle, peppermintData, currentTime);
            }
        }
        // Fire Cake
        if (this.powerups.cake_active.active) {
            let cakeData = this.weapons.cake;
            if (currentTime > cakeData.nextShotAt) {
                cakeData.nextShotAt = currentTime + cakeData.fire_rate;
                this.fireCake(this.worldX, this.chestY, angle, cakeData, currentTime);
            }
        }
        // Fire BonBon
        if (this.powerups.bonbon_active.active) {
            let bonbonData = this.weapons.bonbon;
            if (currentTime > bonbonData.nextShotAt) {
                bonbonData.nextShotAt = currentTime + bonbonData.fire_rate;
                this.fireBonBon(this.worldX, this.chestY, angle, bonbonData, currentTime);
            }
        }
        // Fire Cup Cake
        if (this.powerups.cupCake_active.active) {
            let ccData = this.weapons.cupCake;
            if (currentTime > ccData.nextShotAt) {
                ccData.nextShotAt = currentTime + ccData.fire_rate;
                this.fireCupCake(this.worldX, this.chestY, 0, ccData, currentTime);
                this.fireCupCake(this.worldX, this.chestY, 90, ccData, currentTime);
                this.fireCupCake(this.worldX, this.chestY, 180, ccData, currentTime);
                if (this.powerups.cupCake_double.active) {
                    this.fireCupCake(this.worldX, this.chestY, 45, ccData, currentTime);
                    this.fireCupCake(this.worldX, this.chestY, 135, ccData, currentTime);
                    this.fireCupCake(this.worldX, this.chestY, 225, ccData, currentTime);
                }
            }
        }
    }

    setStandardBulletValues(myBullet, data, angle, currentTime) {
        myBullet.removeAt = currentTime + data.range;
        myBullet.speed = data.speed;
        if ('spread' in data) {
            let variance = Phaser.Math.Between(
                -data.spread,
                data.spread
            );
            // Convert variance from degrees to radians
            let varianceRadians = Phaser.Math.DegToRad(variance);
            angle += varianceRadians;
        }
        myBullet.angle = angle;
        if (data.speed > 0) {
            myBullet.hSpeed = Math.cos(angle) * data.speed;
            myBullet.vSpeed = Math.sin(angle) * data.speed;
        } else {
            myBullet.hSpeed = 0;
            myBullet.vSpeed = 0;
        }
        myBullet.size = data.size;
        if ('tall' in data) {
            myBullet.tall = data.tall;
        } else {
            myBullet.tall = data.size * 2;
        }
        if ('scale' in data) {
            myBullet.setScale(data.scale);
        }
        if ('nextHitAt' in data) {
            myBullet.nextHitAt = data.nextHitAt;
        }
        myBullet.settings = data;
        return myBullet;
    }

    fireJellyBean(myX, myY, angle, jbData, currentTime) {
        const color = Phaser.Display.Color.RandomRGB();
        let myBullet = this.add.circle(
            myX, myY,
            jbData.size,
            color.color
        );

        myBullet = this.setStandardBulletValues(myBullet, jbData, angle, currentTime);

        this.activeBullets.jellyBeans.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireChocolateShield(myX, myY, angle, chocolateShieldData, currentTime, ind = 0) {

        angle = (currentTime / (chocolateShieldData.turnSpeed * 100)) + ((Math.PI / 2) * ind);

        myX += (Math.cos(angle) * chocolateShieldData.radius);
        myY += (Math.sin(angle) * chocolateShieldData.radius);

        let myBullet = this.add.image(myX, myY, 'chocolateShield');
        myBullet = this.setStandardBulletValues(myBullet, chocolateShieldData, 0, currentTime);
        myBullet.ind = ind;
        this.activeBullets.chocolateShields.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireLollipop(myX, myY, angle, lollipopData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'lollipop');
        myBullet = this.setStandardBulletValues(myBullet, lollipopData, angle, currentTime);
        this.activeBullets.lollipops.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireCottonCandy(myX, myY, angle, ccData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'cottonCandy');

        myBullet = this.setStandardBulletValues(myBullet, ccData, angle, currentTime);

        this.activeBullets.cottonCandies.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireCandyBag(myX, myY, angle, candyBagData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'candyBag');
        myBullet = this.setStandardBulletValues(myBullet, candyBagData, angle, currentTime);
        this.activeBullets.candyBags.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    firePeppermint(myX, myY, angle, peppermintData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'peppermint');
        myBullet = this.setStandardBulletValues(myBullet, peppermintData, angle, currentTime);

        myBullet.hSpeed = Phaser.Math.Between(-10, 10);
        myBullet.vSpeed = Phaser.Math.Between(-10, 10);
        myBullet.moveTime = currentTime + 500

        this.activeBullets.peppermints.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireCake(myX, myY, angle, cakeData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'cake');
        myBullet = this.setStandardBulletValues(myBullet, cakeData, angle, currentTime);
        this.activeBullets.cakes.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireBonBon(myX, myY, angle, bonbonData, currentTime) {
        let myBullet = this.add.image(myX, myY, 'bonbon');
        myBullet = this.setStandardBulletValues(myBullet, bonbonData, angle, currentTime);

        // Apply a random hue to the bullet
        const randomHue = Phaser.Math.Between(0, 359);
        myBullet.setTint(Phaser.Display.Color.HSLToColor(randomHue / 360, 1, 0.5).color);

        this.activeBullets.bonbons.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }
    fireCupCake(myX, myY, angle, data, currentTime) {
        let myBullet = this.add.image(myX, myY, 'cupCake');
        myBullet = this.setStandardBulletValues(myBullet, data, angle, currentTime);
        this.activeBullets.cupCakes.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }

    fireIceCream(myX, myY, angle, icData, currentTime, gen = 1) {
        const randomX = Phaser.Math.Between(-200, 200) / (gen * gen);
        const randomY = Phaser.Math.Between(-200, 200) / (gen * gen);

        let myBullet = this.add.image(myX + randomX, myY + randomY, 'iceCream');


        myBullet = this.setStandardBulletValues(myBullet, icData, angle, currentTime);

        myBullet.generation = gen;
        myBullet.scale = icData.scale * (.1 * (11.5 - gen * 1.5));
        myBullet.size = icData.size * (.1 * (11.5 - gen * 1.5));
        myBullet.nextHitAt = currentTime + 300;

        this.activeBullets.iceCreams.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }

    fireCandyCorn(myX, myY, angle, data, currentTime) {
        let myBullet = this.add.image(myX, myY, 'candyCorn');

        myBullet = this.setStandardBulletValues(myBullet, data, angle, currentTime);

        this.activeBullets.candyCorns.push(myBullet);
        this.frontWorldContainer.add(myBullet);
    }

    manageBullets(currentTime) {
        for (let i = this.activeBullets.jellyBeans.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('jellyBeans', i, currentTime)) {
                this.processOneHitBullet('jellyBeans', i);
            }
        }
        for (let i = this.activeBullets.chocolateShields.length - 1; i >= 0; i--) {
            if (this.processShieldBulletMovement('chocolateShields', i, currentTime)) {
                this.processOneHitBullet('chocolateShields', i);
            }
        }
        for (let i = this.activeBullets.candyCorns.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('candyCorns', i, currentTime)) {
                this.processOneHitBullet('candyCorns', i);
            }
        }
        for (let i = this.activeBullets.cottonCandies.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('cottonCandies', i, currentTime)) {
                this.processRepeatHitBullet('cottonCandies', i, currentTime);
            }
        }
        for (let i = this.activeBullets.iceCreams.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('iceCreams', i, currentTime)) {
                this.processIcecreamBullet('iceCreams', i, currentTime)
            }
        }
        for (let i = this.activeBullets.lollipops.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('lollipops', i, currentTime)) {
                this.processBouncingBullet('lollipops', i, currentTime);
            }
        }
        for (let i = this.activeBullets.peppermints.length - 1; i >= 0; i--) {
            if (this.processPeppermentMovement('peppermints', i, currentTime)) {
                this.processRepeatHitBullet('peppermints', i, currentTime);
            }
        }
        for (let i = this.activeBullets.cakes.length - 1; i >= 0; i--) {
            this.processLinearBulletMovement('cakes', i, currentTime);
        }
        for (let i = this.activeBullets.bonbons.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('bonbons', i, currentTime)) {
                this.processBonBonHitBullet('bonbons', i, currentTime)
            }
        }
        for (let i = this.activeBullets.cupCakes.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('cupCakes', i, currentTime)) {
                this.processOneHitBullet('cupCakes', i);
            }
        }
        for (let i = this.activeBullets.candyBags.length - 1; i >= 0; i--) {
            if (this.processLinearBulletMovement('candyBags', i, currentTime)) {
                this.processCandyBag('candyBags', i, currentTime)
            }

        }
    }

    // Processes movement for bullets that only move in the direction they are shot
    processLinearBulletMovement(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];
        if (currentTime > myBullet.removeAt) {
            myBullet.destroy();
            this.activeBullets[myBulletGroupName].splice(ind, 1);
            return false;
        } else {
            // Move
            myBullet.x += myBullet.hSpeed;
            myBullet.y += myBullet.vSpeed;

            // Rotate the lollipop
            if ('spin' in myBullet.settings) {
                myBullet.rotation += myBullet.settings.spin;
            }
            return true;
        }
    }

    processShieldBulletMovement(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];
        if (currentTime > myBullet.removeAt) {
            myBullet.destroy();
            this.activeBullets[myBulletGroupName].splice(ind, 1);
            return false;
        } else {
            let data = myBullet.settings;
            let angle = (currentTime / (data.turnSpeed * 100)) + ((Math.PI / 2) * myBullet.ind);

            myBullet.x = this.worldX + (Math.cos(angle) * myBullet.settings.radius);
            myBullet.y = this.chestY + (Math.sin(angle) * myBullet.settings.radius);

            return true;
        }
    }

    processPeppermentMovement(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];
        if (currentTime > myBullet.removeAt) {
            myBullet.destroy();
            this.activeBullets[myBulletGroupName].splice(ind, 1);
            return false;
        } else {
            // Move

            if (myBullet.moveTime < currentTime) {
                myBullet.hSpeed = Phaser.Math.Between(-5, 5);
                myBullet.vSpeed = Phaser.Math.Between(-5, 5);
                myBullet.moveTime = currentTime + Phaser.Math.Between(200, 500);
            }

            myBullet.x += myBullet.hSpeed;
            myBullet.y += myBullet.vSpeed;

            // Rotate the lollipop
            if ('spin' in myBullet.settings) {
                myBullet.rotation += myBullet.settings.spin;
            }
            return true;
        }
    }

    // process colisions fo bullets that only hit once.
    processOneHitBullet(myBulletGroupName, ind) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];

        for (let j = 0; j < this.enemies.length; j++) {
            const enemy = this.enemies[j];
            if (this.checkForCollision(enemy, myBullet, false, false, true)) {
                this.hitEnemy(enemy, myBullet, j);
                // Destroy Bean
                this.activeBullets[myBulletGroupName].splice(ind, 1);
                myBullet.destroy();
                break;
            }
        }
    }

    // process colisions fo bullets that only hit once.
    processBonBonHitBullet(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];

        if (currentTime > myBullet.nextHitAt) {
            myBullet.nextHitAt = currentTime + myBullet.settings.hitDelay;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (this.checkForCollision(enemy, myBullet, false, false, true)) {
                    let enemyHealth = enemy.health;
                    this.hitEnemy(enemy, myBullet, j);
                    // Destroy Bean
                    if (enemyHealth > myBullet.settings.power) {
                        this.activeBullets[myBulletGroupName].splice(ind, 1);
                        myBullet.destroy();
                    }
                    break;
                }
            }
        }
    }

    processCandyBag(myBulletGroupName, ind, currentTime) {

        let bag = this.activeBullets[myBulletGroupName][ind];
        let rate = bag.settings.candyRate;

        if (Math.random() < .1 * rate) {
            this.fireJellyBean(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.jellyBeans, currentTime);
        }

        if (this.powerups.cotton_active.active && Math.random() < .02 * rate) {
            this.fireCottonCandy(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.cottonCandy, currentTime);
        }

        if (this.powerups.lollipop_active.active && Math.random() < .03 * rate) {
            this.fireLollipop(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.lollipop, currentTime);
        }

        if (this.powerups.cc_active.active && Math.random() < .05 * rate) {
            this.fireCandyCorn(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.candyCorn, currentTime);
        }

        if (this.powerups.peppermint_active.active && Math.random() < .02 * rate) {
            this.firePeppermint(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.peppermint, currentTime);
        }

        if (this.powerups.bonbon_active.active && Math.random() < .04 * rate) {
            this.fireBonBon(bag.x, bag.y, Phaser.Math.Between(0, Math.PI * 2), this.weapons.bonbon, currentTime);
        }

    }

    // process colisions for icecream that fracture.
    processIcecreamBullet(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];

        if (currentTime > myBullet.nextHitAt) {
            myBullet.nextHitAt = currentTime + myBullet.settings.hitDelay;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (this.checkForCollision(enemy, myBullet, false, false, true)) {
                    this.hitEnemy(enemy, myBullet, j);

                    if (myBullet.generation < myBullet.settings.generationMax) {
                        this.fireIceCream(
                            myBullet.x,
                            myBullet.y,
                            0,
                            myBullet.settings,
                            currentTime,
                            myBullet.generation + 1
                        );
                        this.fireIceCream(
                            myBullet.x,
                            myBullet.y,
                            0,
                            myBullet.settings,
                            currentTime,
                            myBullet.generation + 1
                        );
                    }
                    // Destroy 
                    this.activeBullets[myBulletGroupName].splice(ind, 1);
                    myBullet.destroy();
                    break;
                }
            }
        }
    }


    // process colisions for bullets that hit repeatedly.
    processRepeatHitBullet(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];

        if (currentTime > myBullet.nextHitAt) {

            myBullet.nextHitAt = currentTime + myBullet.settings.hitDelay;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (this.checkForCollision(enemy, myBullet, false, false, true)) {
                    this.hitEnemy(enemy, myBullet, j);
                }
            }
        }
    }

    processBouncingBullet(myBulletGroupName, ind, currentTime) {
        let myBulletGroup = this.activeBullets[myBulletGroupName];
        let myBullet = myBulletGroup[ind];

        if (currentTime > myBullet.nextHitAt) {
            myBullet.nextHitAt = currentTime + myBullet.settings.hitDelay;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (this.checkForCollision(enemy, myBullet, false, false, true)) {
                    let angle = Phaser.Math.Between(0, Math.PI * 2);
                    myBullet.angle = angle;
                    myBullet.hSpeed = Math.cos(angle) * myBullet.settings.speed;
                    myBullet.vSpeed = Math.sin(angle) * myBullet.settings.speed;
                    this.hitEnemy(enemy, myBullet, j);
                }
            }
        }
    }


    hitEnemy(enemy, bullet, ind) {
        const damage = bullet.settings.power;
        if (damage <= 0) {
            return;
        }
        enemy.health -= damage;
        this.createDamageText(enemy.x, enemy.y, damage);
        const currentTime = this.time.now;
        if (enemy.health <= 0) {
            // Play destroy sound when enemy is destroyed
            if (currentTime - this.lastEnemySoundTime > 100) { // 100ms = 0.1 seconds
                this.sound.play('enemyDestroySound');
                this.lastEnemySoundTime = currentTime;
            }
            // Create leaves before destroying the enemy
            this.createLeaves(
                enemy.x,
                enemy.y,
                enemy.size,
                2 + Math.ceil(enemy.size * enemy.tall / 100)
            );
            if (enemy.type === 'largeSkeleton') {
                // Spawn two little skeletons
                this.addEnemy('smallSkeleton', enemy.x, enemy.y, this.enemyProperties.smallSkeleton);
                this.addEnemy('smallSkeleton', enemy.x - 20, enemy.y, this.enemyProperties.smallSkeleton);

                this.addEnemy('birdMummy', enemy.x + 20, enemy.y, this.enemyProperties.birdMummy);
                this.addEnemy('birdMummy', enemy.x, enemy.y + 20, this.enemyProperties.birdMummy);
                this.addEnemy('birdMummy', enemy.x, enemy.y - 20, this.enemyProperties.birdMummy);

            }
            enemy.destroy();
            this.enemies.splice(ind, 1);
        } else {
            // Play hit sound only if enemy is not destroyed and cooldown has passed
            if (currentTime - this.lastEnemySoundTime > 100) { // 100ms = 0.1 seconds
                this.sound.play('enemyHitSound');
                this.lastEnemySoundTime = currentTime;
            }
        }
    }
    createDamageText(x, y, damage) {
        const text = this.add.text(x, y, damage.toString(), {
            font: '26px Arial',
            fill: '#ff0000'
        });
        text.setOrigin(0.5, 0.5);
        text.removeAt = this.time.now + 300;
        this.frontWorldContainer.add(text);
        this.damageTexts.push(text);

    }

    processDamageText(currentTime) {
        for (let j = 0; j < this.damageTexts.length; j++) {
            let myText = this.damageTexts[j];
            if (currentTime > myText.removeAt) {
                myText.destroy();
                this.damageTexts.splice(j, 1);
                return;
            } else {
                myText.y -= 4;
            }
        }
    }

    //Key Words:
    //      rate: how may to create per second
    //      spawn_distance: how far away they spawn
    //      spacing: spreads out the grouping of the placement
    //      pattern=circle : spawn enemies all around the player
    //      pattern=angle: spawn enemies in a direction from the player.
    //          angle: the angle that points to the spawy point
    //      pattern=angle: spawn enemies in a direction from the player.
    //          angle: the angle that points to the spawy point
    //      pattern=point: spawn enemies at a point on the pmap
    //          x: the x cords
    //          y: the y cords



    runTimetime() {
        // find out which time segment we are using.
        const currentTimelineKey = this.getCurrentTimelineKey();

        const enemyConfigs = this.timeline[currentTimelineKey];

        if (enemyConfigs.length == 1) {
            // This is just a "wait" section.  Do nothing
            return;
        }

        this.funcOverride = '';

        enemyConfigs.forEach(timelineSettings => {

            if (
                typeof timelineSettings === 'number'
            ) {

                // Skip over the (first) int value (it the time key) 

            } else if (typeof timelineSettings === 'string') {

                let rawSettings = timelineSettings.split("|");

                if (rawSettings[0] == 'func') {
                    this.funcOverride = rawSettings[1];
                    return;
                } else {
                    let myTimelineSettings = {
                        pattern: rawSettings[1],
                        type: rawSettings[0],
                    }

                    for (let j = 2; j < rawSettings.length; j++) {
                        let com = rawSettings[j]
                        let myInfo = com.split(":");
                        switch (myInfo[0]) {
                            case 'r':
                                myTimelineSettings.rate = Number(myInfo[1]);
                                break;
                            case 's':
                                myTimelineSettings.spacing = Number(myInfo[1]);
                                break;
                        }

                    }

                    const enemySettings = this.enemyProperties[myTimelineSettings.type];
                    const settings = {
                        ...enemySettings,
                        ...myTimelineSettings
                    };

                    this.spawnEnemyGroup(settings);
                }

            } else if (typeof timelineSettings === 'object') {
                // Old timeline methods
                const enemyType = timelineSettings.type;
                const enemySettings = this.enemyProperties[enemyType];
                const settings = {
                    ...enemySettings,
                    ...timelineSettings
                };

                this.spawnEnemyGroup(settings);
            }
        });
    }

    spawnEnemyGroup(settings) {
        let spawnRate = 1;
        const enemyType = settings.type;

        if ('rate' in settings) {
            spawnRate = settings.rate;
        }

        let enemiesToSpawn = 0;
        // calculate the enemy spawn rate
        if (spawnRate >= 1) {
            enemiesToSpawn = Math.floor(spawnRate);
        } else if (Math.random() < spawnRate) {
            enemiesToSpawn = 1;
        }

        if (enemiesToSpawn > 0) {

            let spawn_distance = this.ENEMY_SPAWN_DISTANCE;

            if ('spawn_distance' in settings) {
                spawn_distance = settings.spawn_distance;
            }

            let spacing = 1;

            if ('spacing' in settings) {
                spacing = settings.spacing;
            }

            if (settings.pattern == 'circle') {
                let angle = Math.random() * Math.PI * 2;
                for (let i = 0; i < enemiesToSpawn; i++) {

                    let myAngle = angle + ((i * Math.PI * 2) / enemiesToSpawn);
                    if (i > i) {
                        myAngle += i * ((Math.PI * 2) / enemiesToSpawn);
                    }

                    let offsetX = Math.floor(Math.random() * 2 * spacing) - spacing;
                    let offsetY = Math.floor(Math.random() * 2 * spacing) - spacing;

                    const enemyX = offsetX + this.worldX + Math.cos(myAngle) * spawn_distance;
                    const enemyY = offsetY + this.worldY + Math.sin(myAngle) * spawn_distance;
                    this.addEnemy(enemyType, enemyX, enemyY, settings);
                }
            } else if (settings.pattern == 'line') {
                for (let i = 0; i < enemiesToSpawn; i++) {
                    //...

                }
            } else if (settings.pattern == 'angle') {
                let myAngle = 0;
                if ('angle' in settings) {
                    myAngle = (settings.angle / 180) * Math.PI;
                } else {
                    myAngle = Phaser.Math.Between(0, Math.PI * 2);
                }

                for (let i = 0; i < enemiesToSpawn; i++) {

                    let offsetX = Math.floor(Math.random() * 2 * spacing) - spacing;
                    let offsetY = Math.floor(Math.random() * 2 * spacing) - spacing;

                    const enemyX = offsetX + this.worldX + Math.cos(myAngle) * spawn_distance;
                    const enemyY = offsetY + this.worldY + Math.sin(myAngle) * spawn_distance;
                    this.addEnemy(enemyType, enemyX, enemyY, settings);
                }
            } else if (settings.pattern == 'point') {
                let targetX = 0;
                let targetY = 0;
                if ('x' in settings) {
                    targetX = settings.x;
                }
                if ('y' in settings) {
                    targetY = settings.y;
                }

                for (let i = 0; i < enemiesToSpawn; i++) {
                    let offsetX = Math.floor(Math.random() * 2 * spacing) - spacing;
                    let offsetY = Math.floor(Math.random() * 2 * spacing) - spacing;

                    const enemyX = offsetX + targetX - this.worldContainer.x;
                    const enemyY = offsetY + targetY - this.worldContainer.y;
                    this.addEnemy(enemyType, enemyX, enemyY, settings);
                }
            }
        }

    }

    moveEnemies() {
        this.enemies.forEach(enemy => {
            let strategy = 'approach';
            if ('strategy' in enemy.settings) {
                strategy = enemy.settings.strategy;
            }
            if (strategy == 'approach') {
                const angle = Phaser.Math.Angle.Between(
                    enemy.x, enemy.y,
                    this.worldX, this.worldY
                );
                let speed = 1;
                if ('speed' in enemy.settings) {
                    speed = enemy.settings.speed;
                }
                enemy.x += Math.cos(angle) * speed;
                enemy.y += Math.sin(angle) * speed;
            }
            if (enemy.settings.type == 'witch') {
                if (Math.random() < .005) {
                    this.addEnemy('smallPumpkin', enemy.x, enemy.y, this.enemyProperties.smallPumpkin);
                }
                if (Math.random() < .001) {
                    this.addEnemy('blackBat', enemy.x, enemy.y, this.enemyProperties.blackBat);
                }
            }
        });
    }

    addEnemy(enemyType, enemyX, enemyY, settings) {
        const enemy = this.physics.add.sprite(
            enemyX, enemyY - (settings.size * 0.2) / 2, enemyType
        );
        enemy.setScale(settings.scale);
        enemy.setOrigin(0.5, 1);
        enemy.health = settings.health;
        enemy.size = settings.size;
        if ('tall' in settings) {
            enemy.tall = settings.tall;
        } else {
            enemy.tall = enemy.size * 2;
        }
        enemy.damage = settings.damage;
        enemy.type = enemyType;
        enemy.startingX = enemyX;
        enemy.startingY = enemyY;
        enemy.settings = settings;
        enemy.isContained = true;
        this.enemies.push(enemy);
        this.worldContainer.add(enemy);
    }


    getCurrentTimelineKey() {

        let gameTimeInSeconds = this.gameTimer / 1000;

        for (let i = 0; i < this.timeline.length; i++) {
            if (i > this.completedSegment) {
                if (this.timeline[i][0] == '-1') {
                    // this is an "unlimited time" section.  Pause the timer and do.
                    this.paused = true;
                }
                this.completedSegment = i;
                return i;
            }

            gameTimeInSeconds -= this.timeline[i][0];
            if (gameTimeInSeconds <= 0) {
                return i;
            }
        }
        return this.timeline.length - 1;
    }

    updateObjectDepths() {
        let allObjects = [
            ...this.background_objects,
            ...this.enemies,
            this.duplicatePlayer
        ];
        // Sort the array based on Y position
        allObjects.sort((a, b) => a.y - b.y);
        // Remove all objects from the worldContainer
        this.worldContainer.removeAll();
        // Re-add objects to the worldContainer in the sorted order
        allObjects.forEach(obj => {
            this.worldContainer.add(obj);
        });
    }

    updateTextDisplays() {
        const textConfig = {
            font: '24px Arial',
            fill: '#ffffff'
        };
        if (this.textNotCreated) {
            this.textFields = [
                'Leaves',
                'Timer',
            ];
            this.textObjects = this.textFields.map((text, index) => {
                const textObject = this.add.text(10, 10 + index * 28, text, textConfig);
                textObject.setScrollFactor(0);
                textObject.setDepth(100);
                return textObject;
            });
            this.textNotCreated = false;
        }
        const texts = [
            `${this.collectedLeaves}`,
            `${Math.floor(this.gameTimer / 1000)}`,
        ];
        this.textObjects.forEach((textObject, index) => {
            textObject.setText(this.textFields[index] + ': ' + texts[index]);
        });
    }

    isWithinBounds(x, y) {
        return x >= this.worldBounds.left && x <= this.worldBounds.right &&
            y >= this.worldBounds.top && y <= this.worldBounds.bottom;
    }

    createRandomBackgroundObjects() {
        Object.entries(this.backgroundObjects).forEach(([name, object]) => {
            for (let i = 0; i < object.count; i++) {
                let x, y;
                do {
                    x = Phaser.Math.Between(this.worldBounds.left, this.worldBounds.right + 600);
                    y = Phaser.Math.Between(this.worldBounds.top, this.worldBounds.bottom + 600);
                } while (!this.isSpaceClear(x, y));
                const bgObject = this.add.image(x, y, name);
                bgObject.setOrigin(0.5, 1);
                bgObject.setScale(object.scale);
                this.worldContainer.add(bgObject);
                this.background_objects.push(bgObject);
                this.totalItems++;
            }
        });
    }
    isSpaceClear(x, y) {
        let clear = true;
        this.background_objects.forEach(object => {
            if (Phaser.Math.Distance.Between(x, y, object.x, object.y) < this.MIN_OBJECT_DISTANCE) {
                clear = false;
            }
        });
        return clear;
    }

    removeDistantEnemies() {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            let check_distance = this.ENEMY_REMOVAL_DISTANCE;
            if ('remove_distance' in enemy.settings) {
                check_distance = enemy.settings.remove_distance;
            }
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                enemy.x + this.worldContainer.x, enemy.y + this.worldContainer.y
            );
            if (distance > check_distance) {
                enemy.destroy();
                this.enemies.splice(i, 1);
            }
        }
    }

    createLeaves(x, y, enemySize, count) {
        const numLeaves = Phaser.Math.Between(1, count);
        for (let i = 0; i < numLeaves; i++) {
            // Randomize leaf position within the enemy's area
            const leafX = x + Phaser.Math.Between(-enemySize, enemySize);
            const leafY = y + Phaser.Math.Between(-enemySize, enemySize);
            const leaf = this.add.image(leafX, leafY, 'leaf');
            leaf.creationTime = this.time.now; // Add creation time
            leaf.setOrigin(0.5, 1);
            leaf.setScale(0.5); // Set scale to 50% of current size
            leaf.setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(0, 360))); // Random rotation
            // Random color between #ff0 and #f00
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                Phaser.Display.Color.ValueToColor('#ff0'),
                Phaser.Display.Color.ValueToColor('#f00'),
                100,
                Math.random() * 100
            );
            leaf.size = this.leafSize;
            leaf.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            this.leafContainer.add(leaf);
            this.leaves.push(leaf); // Add the leaf to our array
        }
    }

    restartGame() {
        // Remove all enemies
        this.enemies.forEach(enemy => enemy.destroy());
        this.enemies = [];
        // Reset player health to maximum
        this.playerHealth = 1000;
        // Update health bar
        this.healthBar.width = 500;
        // Reset player position (optional)
        this.playerX = 0;
        this.playerY = 0;
        this.worldContainer.x = 0;
        this.worldContainer.y = 0;
        this.frontWorldContainer.x = 0;
        this.frontWorldContainer.y = 0;
        // Reset game timer
        this.gameTimer = 0;
    }

    // Movies

    /*
                    break;
                case 'createStars':
                    this.createStars();
                break;
                case 'slideStars':
                    this.slideStars();
                break;
                case 'fadeStars':
                    this.fadeStars();
                break;
            }
    */

    createStars() {
        console.log('createStars:' + this.cinematicStep);
        // Create a black overlay
        // THis is now done in create to prevent flashing
        //this.introOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000);
        //this.introOverlay.setDepth(1000);

        // Create white spots for stars
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 600);
            const star = this.add.circle(x, y, 1, 0xffffff);
            star.setDepth(1001);
            this.stars.push(star);
        }
        // Add the moon
        this.moon = this.add.image(400, 700, 'moon');
        this.moon.setOrigin(0.5, 0.5);
        this.moon.setScale(0.5);
        this.moon.setDepth(1001);

        // Set up variables for the cinematic effect
        this.cinematicStep = 0;

        this.paused = false;
    }


    slideStars() {
        console.log('slideStars:' + this.cinematicStep);
        this.stars.forEach(star => {
            star.y += this.scrollSpeed;
            if (star.y > 600) {
                star.y = 0;
            }
        });
        // Move the moon
        this.moon.y -= this.scrollSpeed * 0.5; // Move the moon slower than the stars

        this.cinematicStep += 1;
        if (this.cinematicStep > 100) {
            this.cinematicStep = 1;
            this.paused = false;
        }
    }

    fadeStars() {
        console.log('fadeStars:' + this.cinematicStep);
        // Scroll stars

        let progress = 1 - (100 / (this.cinematicStep));

        this.introOverlay.setAlpha(1 - progress);
        // Remove cinematic elements when done
        if (this.cinematicStep == 100) {
            this.introOverlay.destroy();
            this.stars.forEach(star => star.destroy());
            this.stars = [];
            this.moon.destroy();
            this.cinematicStep = 0;
            this.paused = false;
            return;
        }

        this.slideStars();
    }



}

const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
};

window.phaserGame = new Phaser.Game(config);
