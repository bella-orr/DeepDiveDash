//This scene will display the game itself
class Scene2 extends Phaser.Scene{

    constructor()
    {
        super("playGame");
    }

   
    create()
    {

        //creates the background for the game
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);

        
    }
}