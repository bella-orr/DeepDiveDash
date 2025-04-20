// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), 
// Nicole Miller (Lead Game Designer), Peter Nguyen (Game Designer/ Documentation/ Support Deverloper)
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
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);

    //buttons
    const buttonBackground = this.add.graphics();
    buttonBackground.fillStyle(0x92a6f0, 1); // Set color and opacity
    buttonBackground.fillRoundedRect(
      config.width / 2 - 175, // x position
      config.height / 2 - 155, // y position
      350, // width
      60, // height
      20 // corner radius
    );

    const startButton = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 - 125,
        "arcadeFont",
        "Start Game",
        24
      )
      .setOrigin(0.5)
      .setInteractive();

    startButton.on("pointerdown", () => {
      this.scene.start("playGame");
    });

    let buttonBackground2 = buttonBackground; // Clone the button background
    buttonBackground2.fillStyle(0x92a6f0, 1);
    buttonBackground2.fillRoundedRect(
      config.width / 2 - 165,
      config.height / 2 - 55,
      325,
      60,
      20
    );

    const resumeButton = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 - 25,
        "arcadeFont",
        "Resume Game",
        24
      )
      .setOrigin(0.5)
      .setInteractive();

    // resumeButton.on("pointerdown", () => {});
    // add resume gameplay here

    let buttonBackground3 = buttonBackground; // Clone the button background
    buttonBackground3.fillStyle(0x92a6f0, 1);
    buttonBackground3.fillRoundedRect(
      config.width / 2 - 130,
      config.height / 2 + 45,
      255,
      60,
      20
    );

    const exitButton = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 75,
        "arcadeFont",
        "Exit Game",
        24
      )
      .setOrigin(0.5)
      .setInteractive();

    // exitButton.on("pointerdown", () => {});
    // add exit logic here
    exitButton.on("pointerdown", () => {
      const confirmExit = confirm("Are you sure you want to exit the game?");
      if (confirmExit) {
        window.close(); // Close the window
      }
    });
    
    //character and other decors
    let homeCharacter = this.add.image(
      config.width / 2 - 240,
      config.height / 2 + 50,
      "big-character" 
    ).setOrigin(0.5, 0.5);
    homeCharacter.setScale(0.3); 

    let fish1 = this.add.image(
      config.width / 2 + 250,
      config.height / 2 - 100,
      "fish1"
    ).setOrigin(0.5, 0.5);
    fish1.setScale(0.3);
    fish1.flipX = true;
    fish1.angle = -28.65; 

    let fish3 = this.add.image(
      config.width / 2 - 250,
      config.height / 2 - 150,
      "fish3"
    ).setOrigin(0.5, 0.5);
    fish3.setScale(0.3);
    fish3.angle = 28.65; 

    //more background decor (reuse gameScene decor)
    let purpleCoral1 = this.add.image(120, config.height - 60, "purpleCoral").setOrigin(0.5, 1).setScale(1);
    let purpleCoral2 = this.add.image(config.width - 90, config.height - 60, "purpleCoral").setOrigin(0.5, 1).setScale(1.5);
    let orangeStar1 = this.add.image(555, config.height - 60, "orangeStar").setOrigin(0.5, 1).setScale(0.8);
    let blueCoral = this.add.image(20, config.height - 60, "blueCoral").setOrigin(0.5, 1).setScale(1.25);
    let smallGCoral = this.add.image(30, config.height - 60, "smallGCoral").setOrigin(0.5, 1).setScale(0.5);
    let rock2 = this.add.image(config.width - 3, config.height - 60, "rock2").setOrigin(0.5, 1).setScale(1.8);
   
    let toggle = true; 
        let sandWidth = 64;
        let yPosition = config.height -64;


        //alternates between sand 1 and 2
        for(let i = 0; i < config.width; i += sandWidth)
            {
                let key = toggle ? "sand1" : "sand2";
                this.add.image(i, yPosition, key).setOrigin(0, 0).setScale(1); // Adjust scale if needed
                toggle = !toggle;
            }

    //animations here
  }

  update(){
    this.background.tilePositionX += 0.5; 
  }
}
