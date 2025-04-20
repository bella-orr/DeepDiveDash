// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen (Game Designer/ Documentation/ Deverloper)
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

//This scene will display the game itself
class playScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    //sets the audio settings
    this.backgroundSound = this.sound.add("oceanNoise");
    this.hurtSound = this.sound.add("hurtSound");
    this.collectSound = this.sound.add("collectingSound");

    var soundConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };

    this.backgroundSound.play(soundConfig); //plays the background sound

    //sets variables for game settings
    this.score = 0; //score variable
    this.health = 5; //health variable
    this.oxygen = 100; //oxygen variable
    this.gameOver = false; //game over variable
    this.healthDrainTimer = null;
    this.isDrainingHealth = false;

    //loads the background
    this.background = this.add
      .tileSprite(0, 0, config.width, config.height, "background")
      .setOrigin(0, 0);

    //score background
    this.scoreBG = this.add.graphics();
    this.scoreBG.fillStyle(0xb18bdc, 0.8);
    this.scoreBG.fillRoundedRect(config.width - 230, 15, 200, 30, 10);

    //Creates the score
    this.scoreLabel = this.add.bitmapText(
      config.width - 205,
      20,
      "arcadeFont",
      "",
      12
    );
    this.scoreLabel.setOrigin(0, 0);

    //Create the health and oxygen bars
    this.healthBarBG = this.add.graphics();
    this.healthBarBG.fillStyle(0x222222, 0.6);
    this.healthBarBG.fillRoundedRect(20, 20, 120, 15, 5);
    this.healthBar = this.add.graphics();

    this.oxygenBarBG = this.add.graphics();
    this.oxygenBarBG.fillStyle(0x222222, 0.6);
    this.oxygenBarBG.fillRoundedRect(20, 45, 120, 15, 5);
    this.oxygenBar = this.add.graphics();

    this.add.bitmapText(15, 15, "arcadeFont", "Health", 12).setTint(0xffffff);
    this.add.bitmapText(15, 40, "arcadeFont", "Oxygen", 12).setTint(0xffffff);

    this.updateBars();

    //creates the fish group
    this.fishGroup = this.physics.add.group();

    //loads the falling objects
    this.fish1 = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "fish1"
    );
    this.fish1.setScale(0.1);
    this.fish1.speed = Phaser.Math.Between(1, 5);
    this.fishGroup.add(this.fish1);

    this.fish2 = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "fish2"
    );
    this.fish2.setScale(0.1);
    this.fish2.speed = Phaser.Math.Between(1, 5);
    this.fishGroup.add(this.fish2);

    this.fish3 = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "fish3"
    );
    this.fish3.setScale(0.1);
    this.fish3.speed = Phaser.Math.Between(1, 5);
    this.fishGroup.add(this.fish3);

    //Pufferfish acts as an enemy to the player and causes damage
    this.pufferFish = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "pufferFish"
    );
    this.pufferFish.setScale(0.1);
    this.pufferFish.speed = Phaser.Math.Between(1, 3);

    this.deadFish = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "deadFish"
    );
    this.deadFish.setScale(0.7);
    this.deadFish.speed = Phaser.Math.Between(1, 3);

    //creates enemy group
    this.enemies = this.physics.add.group();
    this.enemies.add(this.pufferFish);
    this.enemies.add(this.deadFish);

    //loads decorations behind player
    let purpleCoral1 = this.add
      .image(120, config.height - 60, "purpleCoral")
      .setOrigin(0.5, 1)
      .setScale(1);
    let purpleCoral2 = this.add
      .image(config.width - 90, config.height - 60, "purpleCoral")
      .setOrigin(0.5, 1)
      .setScale(1.5);
    let orangeStar1 = this.add
      .image(555, config.height - 60, "orangeStar")
      .setOrigin(0.5, 1)
      .setScale(0.8);
    let blueCoral = this.add
      .image(20, config.height - 60, "blueCoral")
      .setOrigin(0.5, 1)
      .setScale(1.25);
    let smallGCoral = this.add
      .image(30, config.height - 60, "smallGCoral")
      .setOrigin(0.5, 1)
      .setScale(0.5);
    let rock2 = this.add
      .image(config.width - 3, config.height - 60, "rock2")
      .setOrigin(0.5, 1)
      .setScale(1.8);

    //loads the player/ character sprite
    this.player = this.physics.add.sprite(
      config.width / 2,
      config.height * 0.8,
      "playerRight"
    );
    this.player.setOrigin(0.5, 0.5);
    this.player.setScale(0.25);

    //creates the player animations
    this.anims.create({
      key: "swimRight",
      frames: this.anims.generateFrameNumbers("playerRight"),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "swimLeft",
      frames: this.anims.generateFrameNumbers("playerLeft"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bubble",
      frames: this.anims.generateFrameNumbers("bubble"),
      frameRate: 20,
      repeat: -1,
    });

    //loads the bubble object for oxygen
    this.bubble = this.physics.add.sprite(
      Phaser.Math.Between(0, config.width),
      0,
      "bubble"
    );
    this.bubble.setScale(0.08);
    this.bubble.anims.play("bubble", true);

    //loads the decorations infront of player
    let rock1 = this.add
      .image(150, config.height - 60, "rock")
      .setOrigin(0.5, 1)
      .setScale(0.8);
    let greenCoral1 = this.add
      .image(100, config.height - 60, "bigCoral")
      .setOrigin(0.5, 1)
      .setScale(0.8);
    let greenCoral2 = this.add
      .image(config.width - 110, config.height - 60, "bigCoral")
      .setOrigin(0.5, 1)
      .setScale(1);

    let toggle = true;
    let sandWidth = 64;
    let yPosition = config.height - 64;

    //alternates between sand 1 and 2
    for (let i = 0; i < config.width; i += sandWidth) {
      let key = toggle ? "sand1" : "sand2";
      this.add.image(i, yPosition, key).setOrigin(0, 0).setScale(1); // Adjust scale if needed
      toggle = !toggle;
    }

    //colliders
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(
      this.player,
      this.fishGroup,
      this.collectFish,
      null,
      this
    ); //collect fish
    this.physics.add.collider(
      this.player,
      this.bubble,
      this.collectBubble,
      null,
      this
    ); //collect bubble
    this.physics.add.collider(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    ); //hurt player

    //timer that decreses oxygen overtime
    this.time.addEvent({
      delay: 3000,
      callback: this.decreaseOxygen,
      callbackScope: this,
      loop: true,
    });

    //allows for player movement
    this.cursors = this.input.keyboard.createCursorKeys();

    //creates key object for 'o' key
    //used for debugging. can be commented out later
    this.skipKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
  }

  update() {
    this.movePlayer();

    this.fishMovement(this.deadFish, this.deadFish.speed);
    this.fishMovement(this.fish1, this.fish1.speed);
    this.fishMovement(this.fish2, this.fish2.speed);
    this.fishMovement(this.fish3, this.fish3.speed);
    this.fishMovement(this.pufferFish, this.pufferFish.speed);
    this.fishMovement(this.bubble, 1);

    this.background.tilePositionX -= 0.5;

    //debugging tool to see game Over screne can be commented out later
    //allows us to see the game over screen by pressing 'o' for testing
    if (Phaser.Input.Keyboard.JustDown(this.skipKey)) {
      this.scene.start("gameOver", {
        score: this.score,
        health: this.health,
        oxygen: this.oxygen,
      });
    }
  }

  //determines player movement and animation
  movePlayer() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
      this.player.anims.play("swimLeft", true);
      this.lastDirection = "left"; // store last direction
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
      this.player.anims.play("swimRight", true);
      this.lastDirection = "right"; // store last direction
    } else {
      //sets the player to only move left and right on the x-axis
      this.player.setVelocityX(0);

      if (this.lastDirection === "left") {
        this.player.anims.play("swimLeft", true);
      } else if (this.lastDirection === "right") {
        this.player.anims.play("swimRight", true);
      } else {
        this.player.anims.stop();
      }

      this.player.setVelocityY(0);
    }
  }

  //fish movement
  fishMovement(fish, speed) {
    fish.y += speed;
    if (fish.y > config.height) {
      this.resetFish(fish);
    }
  }

  //resets the fish to the top of the screen at a random x position
  resetFish(fish) {
    fish.y = 0;
    fish.x = Phaser.Math.Between(0, config.width);
    fish.speed = Phaser.Math.Between(1, 5);
    fish.setVelocityX(0);
    fish.allowGravity = false;
  }

  //function to handle collecting fish
  collectFish(player, fish) {
    if (fish.speed === 1) {
      this.score += 1;
    } else if (fish.speed > 1 && fish.speed <= 4) {
      this.score += 2;
    } else if (fish.speed > 4) {
      this.score += 3;
    }

    this.resetFish(fish);
    this.collectSound.play(); //plays the collecting sound

    //updates the score label
    var scoreFormatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE: " + scoreFormatted;
  }

  //collects bubble
  collectBubble(player, bubble) {
    this.oxygen += 5;
    if (this.oxygen > 100) {
      this.oxygen = 100;
    }
    this.collectSound.play(); //plays the collecting sound
    this.resetFish(bubble);
    this.updateBars();
  }

  //function to handle when the player collides with an enemy
  //takes player and enemy as parameters
  hurtPlayer(player, enemy) {
    //don't hurt the player if it is invincible
    if (this.player.alpha < 1) {
      return;
    }

    this.resetFish(enemy);
    this.health -= 1;

    this.updateBars();

    this.hurtSound.play({volume: 0.5}); //plays the hurt sound

    //if the player is dead, go to game over screen
    if (this.health <= 0) {
      this.scene.start("gameOver", {
        score: this.score,
        health: this.health,
        oxygen: this.oxygen,
      });
    }

    //disable the player and hide it
    player.disableBody(true, true);

    //after a time enable the player again
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }

  //function to handle reseting the player
  resetPlayer() {
    //enable the player again
    var x = config.width / 2 - 8;
    var y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);

    //make the player transparent to indicate invulnerability
    this.player.alpha = 0.5;

    //move the player back to its original position
    var tween = this.tweens.add({
      targets: this.player,
      y: config.height * 0.8,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1; //set the player alpha back to 1
      },
      callbackScope: this,
    });
  }

  //decreases oxygen over time
  decreaseOxygen() {
    this.oxygen -= 5;

    //prevents oxygen from becoming negative int
    if (this.oxygen < 0) {
      this.oxygen = 0;
    }

    this.updateBars();

    if (this.oxygen <= 0 && !this.isDrainingHealth) {
      this.startHealthDrain();
    } else if (this.oxygen > 0 && this.isDrainingHealth) {
      this.stopHealthDrain();
    }
  }

  //starts draining health when oxygen is 0
  startHealthDrain() {
    this.isDrainingHealth = true;
    this.healthDrainTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.health -= 0.2;
        this.updateBars();

        if (this.health <= 0) {
          this.scene.start("gameOver", {
            score: this.score,
            health: this.health,
            oxygen: this.oxygen,
          });
        }
      },
      loop: true,
    });
  }

  //stops draining health when oxygen is above 0
  stopHealthDrain() {
    this.isDrainingHealth = false;
    if (this.healthDrainTimer) {
      this.healthDrainTimer.remove(false);
      this.healthDrainTimer = null;
    }
  }

  //updates the health and oxygen bars
  updateBars() {
    //health bar
    this.healthBar.clear();
    let healthWidth = (this.health / 5) * 120;
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRoundedRect(20, 20, healthWidth, 15, 5);

    //oxygen bar
    this.oxygenBar.clear();
    let oxygenWidth = (this.oxygen / 100) * 120;
    this.oxygenBar.fillStyle(0x00bfff, 1);
    this.oxygenBar.fillRoundedRect(20, 45, oxygenWidth, 15, 5);
  }

  //zero pad
  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}
