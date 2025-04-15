// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen 
// (Game Designer/Documentation)
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
  preload(){
  //load images here
  this.load.image("deadFish", "assets/images/dead_fish.png");
  this.load.image("fish1", "assets/images/fish-1.png");
  this.load.image("fish2", "assets/images/fish-2.png");
  this.load.image("fish3", "assets/images/fish-3.png");
  this.load.image("orangeStar", "assets/images/orange_star.png");

  //load spritesheets here
    this.load.spritesheet("background", "assets/sprite-sheets/background-sprite-sheet.png", {
      frameWidth: 1820,
      frameHeight: 1024
    });

    this.load.spritesheet('playerLeft', 'assets/sprite-sheets/swimming-left-sprite-sheet.png', {
      frameWidth: 306,
      frameHeight:313
    });

    this.load.spritesheet('playerRight', 'assets/sprite-sheets/swimming-right-sprite-sheet.png', {
      frameWidth: 305,
      frameHeight: 344
    });
  //load font here
    this.load.font("arcadeFont", "assets/font/arcadeclassic.regular.ttf");

  //load audio here
    this.load.audio("oceanWaves", "assets/sounds/148283__rmutt__oceanwaves-5.wav");

    this.load.audio("oceanNoise", "assets/sounds/oceanNoise.wav");
  }

  // create function is called after the preload function
  // this function will create the game objects and start the game
  create() {
    //Loading game
    this.add.text(20, 20, "Loading game...");

    // Start playScene after the delay
    this.time.delayedCall(2000, () => {
        this.scene.start("playGame");  
      });
    //animations here

  }
}