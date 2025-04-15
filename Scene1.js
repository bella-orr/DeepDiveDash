//This scene will boot the game
class Scene1 extends Phaser.Scene 
{
    constructor()
    {
        super("bootGame");
    }

    preload()
    {
        //preloads the background
        this.load.image("background", "assets/images/background.png");
    }

    create()
    {
        this.add.text(20, 20, "Deep Dive Dash", {font: "25px Arial", fill: "#ffffff"});
        this.add.text(20, 50, "Loading...", {font: "25px Arial", fill: "#ffffff"});

        // Starts scene 2
        this.time.delayedCall(2000, () => {
            this.scene.start("playGame");
        });
    }
    
}