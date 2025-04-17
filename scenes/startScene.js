// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

// extend Phaser.Scene to create a new scene
// this scene will be used to load assets and start the game
class startScene extends Phaser.Scene {
  constructor() {
    super("startScene"); // name of the scene
  }

  // preload function is called before the scene is created
  preload() {
    //load images here
    this.load.image("big-character", "assets/images/home-character.png");

    this.load.image("deadFish", "assets/images/dead_fish.png");
    this.load.image("fish1", "assets/images/fish-1.png");
    this.load.image("fish2", "assets/images/fish-2.png");
    this.load.image("fish3", "assets/images/fish-3.png");
    this.load.image("pufferFish", "assets/images/puffer-fish.png");
    this.load.image("eel", "assets/images/eel.png");

    this.load.image("sand1", "assets/images/sand1.png");
    this.load.image("sand2", "assets/images/sand2.png");
    this.load.image("bigCoral", "assets/images/bigGreenCoral.png");
    this.load.image("purpleCoral", "assets/images/purpleCoral.png");
    this.load.image("rock", "assets/images/rock.png");
    this.load.image("orangeStar", "assets/images/orange_star.png");
    this.load.image("smallGCoral", "assets/images/smallGCoral.png");
    this.load.image("blueCoral", "assets/images/blueCoral.png");
    this.load.image("rock2", "assets/images/rock2.png");
    //load spritesheets here
    this.load.spritesheet(
      "background",
      "assets/sprite-sheets/background-sprite-sheet.png",
      {
        frameWidth: 1820,
        frameHeight: 1024,
      }
    );

    this.load.spritesheet(
      "playerLeft",
      "assets/sprite-sheets/swimming-left-sprite-sheet.png",
      {
        frameWidth: 306,
        frameHeight: 313,
      }
    );

    this.load.spritesheet(
      "playerRight",
      "assets/sprite-sheets/swimming-right-sprite-sheet.png",
      {
        frameWidth: 305,
        frameHeight: 344,
      }
    );

    this.load.spritesheet(
      "bubble",
      "assets/sprite-sheets/Bubble-Sprite-Sheet.png",
      {
        frameWidth: 396,
        frameHeight: 413,
      }
    );
    //load font here
    this.load.bitmapFont(
      "arcadeFont",
      "assets/font/gameFont.png",
      "assets/font/gameFont.xml"
    );

    //load audio here
    this.load.audio(
      "oceanWaves",
      "assets/sounds/148283__rmutt__oceanwaves-5.wav"
    );

    this.load.audio("oceanNoise", "assets/sounds/oceanNoise.wav");
  }

  // create function is called after the preload function
  // this function will create the game objects and start the game
  create() {
    //background
    this.background = this.add
      .tileSprite(0, 0, config.width, config.height, "background")
      .setOrigin(0, 0);

    //buttons
    const buttonBackground = this.add.graphics();
    buttonBackground.fillStyle(0x92a6f0, 1); // Set color and opacity
    buttonBackground.fillRoundedRect(
      config.width / 2 , // x position
      config.height / 2 , // y position
      300, // width
      60, // height
      20 // corner radius
    );

    const startButton = this.add
      .text(config.width / 2, config.height / 2, "Start Game", {
        font: "64px arcadeFont",
        fill: "#000000",
      })
      .setOrigin(0.5)
      .setInteractive();

    startButton.on("pointerdown", () => {
      this.time.delayedCall(2000, () => {
        this.scene.start("playGame");
      });
    });

    //animations here
  }
}
