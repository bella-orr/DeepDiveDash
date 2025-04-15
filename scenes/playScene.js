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
        this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0).setDisplaySize(config.width, config.height); ;

        //loads the player/ character sprite
        this.player = this.physics.add.sprite(config.width/2, config.height/2, "playerRight");
        this.player.setOrigin(0.5, 0.5); 
        this.player.setScale(0.25);

        this.anims.create({
            key: 'swimRight',
            frames: this.anims.generateFrameNumbers('playerRight'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'swimLeft',
            frames: this.anims.generateFrameNumbers('playerLeft'),
            frameRate: 20,
            repeat: -1
        });

        //allows for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        
    }

    update()
    {
        this.movePlayer();
    }

    movePlayer()
    {
        if(this.cursors.left.isDown)
        {
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play('swimLeft', true);
        }
        else if(this.cursors.right.isDown)
        {
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play('swimRight', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.stop();
        }
    }
}