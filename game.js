//Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen (Game Designer/ Documentation/ Deverloper)
// (Game Designer/Documentation)
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

//Declare variable  for game settings
var gameSettings = {
  //store game settings here
  playerSpeed: 250
  }
  
  
  //Declare variable for game configuration
  //This is where the game will be configured
  var config = {
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [startScene, playScene, gameOverScene],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };
  
  var game = new Phaser.Game(config);