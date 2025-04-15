// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen 
// (Game Designer/Documentation)
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

//This scene will display the game itself
class playScene extends Phaser.Scene{

    constructor()
    {
        super("playGame");
    }

   
    create()
    {
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);

    }
}