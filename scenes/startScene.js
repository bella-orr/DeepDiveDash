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

  //load spritesheets here
    this.load.spritesheet("background", "assets/sprite-sheets/background-sprite-sheet.png", {
      frameWidth: 1820,
      frameHeight: 1024
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