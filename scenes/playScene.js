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
        this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0).setDisplaySize(config.width, config.height); 

        //loads the falling objects
        this.deadFish = this.add.image(Phaser.Math.Between(0, config.width), 0, "deadFish"); 
        this.deadFish.setScale(0.70);

        this.fish1 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish1");
        this.fish1.setScale(0.10);

        this.fish2 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish2");
        this.fish2.setScale(0.10);

        this.fish3 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish3");
        this.fish3.setScale(0.10);


        //loads the player/ character sprite
        this.player = this.physics.add.sprite(config.width/2, config.height * 0.8, "playerRight");
        this.player.setOrigin(0.5, 0.5); 
        this.player.setScale(0.25);
        this.player.setCollideWorldBounds(true); // prevents player from going out of bounds

        //creates the player animations
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

        //may want to create a method that assigns random speed to the fish
        this.fishMovement(this.deadFish, 2);
        this.fishMovement(this.fish1, 1);
        this.fishMovement(this.fish2, 3);
        this.fishMovement(this.fish3, 0.5);
    }

    //determines player movement and animation
    movePlayer()
    {
        if(this.cursors.left.isDown)
        {
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play('swimLeft', true);
            this.lastDirection = 'left'; // store last direction
        }
        else if(this.cursors.right.isDown)
        {
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play('swimRight', true);
            this.lastDirection = 'right'; // store last direction
        }
        else
        {
            //sets the player to only move left and right on the x-axis
            this.player.setVelocityX(0);

            if(this.lastDirection === 'left')
                {
                    this.player.anims.play('swimLeft', true);
                }
            else if(this.lastDirection === 'right')
                {
                    this.player.anims.play('swimRight', true);
                }
            else
                {
                    this.player.anims.stop();
                }
            
            this.player.setVelocityY(0);
        }
    }

    
    //fish movement
    fishMovement(fish, speed)
    {
        fish.y += speed;
        if(fish.y > config.height)
        {
            this.resetFish(fish);
        }
    }

    resetFish(fish)
    {
        fish.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        fish.x = randomX;
    }
}