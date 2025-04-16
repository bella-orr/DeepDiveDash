// Assignment: Deep Dive Dash Final Project
// Contributors:  Addison Hatfield (Lead Game Developer), Bella Orr (Game Developer/ Tester), Nicole Miller (Lead Game Designer), Peter Nguyen 
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
        //sets variables for game settings
        this.score = 0; //score variable
        this.health = 3; //health variable
        this.oxygen = 100; //oxygen variable
        this.gameOver = false; //game over variable

        

        //loads the background
        this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0).setDisplaySize(config.width, config.height); 

        //loads the falling objects

        this.fish1 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish1");
        this.fish1.setScale(0.10);
        this.fish1.speed = Phaser.Math.Between(1, 3); 

        this.fish2 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish2");
        this.fish2.setScale(0.10);
        this.fish2.speed = Phaser.Math.Between(1, 3); 

        this.fish3 = this.add.image(Phaser.Math.Between(0, config.width), 0, "fish3");
        this.fish3.setScale(0.10);
        this.fish3.speed = Phaser.Math.Between(1, 3); 

        //loads the bubble object for oxygen
        this.bubble = this.add.sprite(Phaser.Math.Between(0, config.width), 0, "bubble");
        this.bubble.setScale(0.08);
        this.bubble.anims.play('bubble', true); 

        //bubble drops every 7 seconds
        this.time.addEvent({
            delay: 7000,
            callback: this.resetBubble,
            callbackScope: this,
            loop: true
        });

        //Pufferfish acts as an enemy to the player and causes damage
        this.pufferFish = this.add.image(Phaser.Math.Between(0, config.width), 0, "pufferFish");
        this.pufferFish.setScale(0.10);
        this.pufferFish.speed = Phaser.Math.Between(1, 3); 

        this.deadFish = this.add.image(Phaser.Math.Between(0, config.width), 0, "deadFish"); 
        this.deadFish.setScale(0.70); 
        this.deadFish.speed = Phaser.Math.Between(1, 3); 

        //creates enemy group
        this.enemies = this.physics.add.group();
        this.enemies.add(this.pufferFish);
        this.enemies.add(this.deadFish);

        //sets the objects to be interactive
        this.deadFish.setInteractive();
        this.fish1.setInteractive();
        this.fish2.setInteractive();
        this.fish3.setInteractive();
        this.pufferFish.setInteractive();
        this.bubble.setInteractive();


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

        this.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNumbers('bubble'),
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
        this.fishMovement(this.deadFish, this.deadFish.speed);
        this.fishMovement(this.fish1, this.fish1.speed);
        this.fishMovement(this.fish2, this.fish2.speed);
        this.fishMovement(this.fish3, this.fish3.speed);
        this.fishMovement(this.pufferFish, this.pufferFish.speed);
        this.fishMovement(this.bubble, 1);
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

    //resets the fish to the top of the screen at a random x position
    resetFish(fish)
    {
        fish.y = 0;
        fish.x = Phaser.Math.Between(0, config.width);
        fish.speed = Phaser.Math.Between(1, 3); 
    }
    

    //function to handle when the player collides with an enemy
    //takes player and enemy as parameters
    hurtPlayer(player, enemy) {

        this.resetFish(enemy); //reset the enemy position
        this.health -= 1; //subtracts 1 from health

        //don't hurt the player if it is invincible
        if(this.player.alpha < 1){
        return;
        }
    
        //disable the player and hide it
        player.disableBody(true, true);

        //after a time enable the player again
        this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
        });
    }

    //function to handle reseting the player
    resetplayer(){
    //enable the player again
    var x = config.width / 2 - 8;
    var y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);

    //make the player transparent to indicate invulnerability
    this.player.alpha = 0.5;

    //move the player back to its original position
        var tween = this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat:0,
            onComplete: function(){
            this.player.alpha = 1; //set the player alpha back to 1
            },
            callbackScope: this
        });
    }



}