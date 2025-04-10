//Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen 
// (Game Designer/Documentation)
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

//Declare variable  for game settings
var gameSettings = {
//store game settings here

}

//Declare variable for game configuration
//This is where the game will be configured
var config = {
  width: 256,
  height: 272,
  backgroundColor: '#000000',
  scene: [],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
      debug: false
    }
  }
}

//Create a new Phaser game instance using config variable
var game = new Phaser.Game(config);