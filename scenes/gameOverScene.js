// Assignment: Deep Dive Dash Final Project
// Contributors: Addison Hatfield, Bella Orr, Nicole Miller, Peter Nguyen
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

/***IMPORTANT NOTE, Please read!***
 * The text field for the name input for some reason is not working 
 * and I am aware of it. The player is unable to actively type their name into the text field. It is currently a Work in Progress, but in 
 * the meantime, the rest of the scene functions as intended.
 * 
 * Also, incase you are wondering, the game does not have a scoreboard yet. I plan to implement a scoreboard that will save the scores from highest to lowest. Hence, why the text file is empty.
 * 
 * Press enter to delete the name input field and submit the score or click the submit button.
 * --Addison Hatfield 4/17/2025
 */

class gameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" });
  }


  // stores the final score and player name
  init(data) {
    this.finalScore = data.score || 0;
    this.playerName = "";
  }

  create() {
    // Format the score with leading zeros
    const scoreFormatted = this.zeroPad(this.finalScore, 6);

    // Add background
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);

    //Add decorations to the background
    let greenCoral3 = this.add.image(500, config.height, "bigCoral").setOrigin(0.5, 1).setScale(4.5);
    let purpleCoral3 = this.add.image(350, config.height, "purpleCoral").setOrigin(0.5, 1).setScale(3.0);
    let smallGCoral2 = this.add.image(200, config.height, "smallGCoral").setOrigin(0.5, 1).setScale(3.0);
    let purpleCoral4 = this.add.image(650, config.height, "purpleCoral").setOrigin(0.5, 1).setScale(2.5);    
    let orangeStar2 = this.add.image(550, config.height, "orangeStar").setOrigin(0.5, 1).setScale(1.5);

    let deadFish1 = this.add.image(250, config.height - 145, "deadFish").setOrigin(0.5, 1).setScale(1.5).setAngle(15);
    let deadFish2 = this.add.image(650, config.height - 425, "deadFish").setOrigin(0.5, 1).setScale(1.5).setAngle(135);


    // Add "Game Over" text
    this.gameOverText = this.add.bitmapText(
      this.cameras.main.centerX, 
      80,
      'arcadeFont', 
      'GAME OVER', 
      64
    ).setOrigin(0.5);

    // Display the score
    this.scoreText = this.add.bitmapText(
      this.cameras.main.centerX, 
      this.gameOverText.y + this.gameOverText.height + 30, 
      'arcadeFont', 
      `SCORE: ${scoreFormatted}`, 
      32
    ).setOrigin(0.5);

    // Create name input background
    this.nameInputBG = this.add.graphics();
    this.nameInputBG.fillStyle(0xffffff, 0.8);
    this.nameInputBG.fillRoundedRect(
      this.cameras.main.centerX - 150,
      this.scoreText.y + this.scoreText.height + 30,
      300, //width of the input field
      50,  //height of the input field
      10  //rounded corners
    );

    // Create name label
    this.nameLabel = this.add.bitmapText(
      this.cameras.main.centerX - 140,
      this.scoreText.y + this.scoreText.height + 45,
      'arcadeFont',
      'ENTER NAME:',
      24
    );

    //input field using Phaser's DOM system
    this.nameInput = this.add.dom(
      this.cameras.main.centerX + 40,
      this.scoreText.y + this.scoreText.height + 55
    ).createElement('input', {
      type: 'text',
      style: 'width: 180px; height: 30px; font-size: 20px; text-align: center;',
      maxLength: '10',
      placeholder: 'Your name'
    });

    // Focus the input field immediately
    this.nameInput.node.focus();

    //submit button background
    this.submitBG = this.add.graphics();
    this.submitBG.fillStyle(0xb18bdc, 0.8);
    this.submitBG.fillRoundedRect(
      this.cameras.main.centerX - 100,
      this.scoreText.y + this.scoreText.height + 90,
      200, //width of the button
      50, //height of the button
      10 //rounded corners
    );

    //submit button
    this.submitButton = this.add.bitmapText(
      this.cameras.main.centerX,
      this.scoreText.y + this.scoreText.height + 115,
      'arcadeFont',
      'SUBMIT',
      24
    ).setOrigin(0.5).setInteractive();

    // Button interactivity
    this.submitButton.on('pointerover', () => this.submitButton.setTint(0x00ff00));
    this.submitButton.on('pointerout', () => this.submitButton.clearTint());
    this.submitButton.on('pointerdown', () => this.submitName());

    // Also allow Enter key to submit
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {

    // Check if the Enter key is pressed
    // If so, call the submitName function
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.submitName();
    }
  }

  // Function to handle name submission
  submitName() {
    // Get the input value
    this.playerName = this.nameInput.node.value.trim() || "Player";
    
    // Save to localStorage
    this.saveScore();
    
    // Transition to showing the restart button
    this.showFinalScreen();
  }

  // Function to save the score to localStorage. 
  // ****Plans to change to save to txt file for scoreboard****
  saveScore() {
    const scoreData = {
      name: this.playerName,
      score: this.finalScore,
      date: new Date().toLocaleString()
    };
    
    // Get existing scores or initialize array
    const scores = JSON.parse(localStorage.getItem('highScores') || '[]');
    scores.push(scoreData);
    
    // Sort by score (descending) and keep top 10
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('highScores', JSON.stringify(topScores));
  }

  // Function to show the final screen with confirmation message and restart button
  showFinalScreen() {
    // Remove input elements
    this.nameInput.destroy();
    this.nameInputBG.destroy();
    this.nameLabel.destroy();
    this.submitBG.destroy();
    this.submitButton.destroy();

    // Show confirmation message
    this.add.bitmapText(
      this.cameras.main.centerX,
      this.scoreText.y + this.scoreText.height + 50,
      'arcadeFont',
      `Saved: ${this.playerName}`,
      24
    ).setOrigin(0.5);

    // Show restart button
    this.createRestartButton(this.scoreText.y + this.scoreText.height + 100);
  }

  // Function to create the restart button
  createRestartButton(yPosition) {
    // Rectangle behind the restart button text
    this.restartBG = this.add.graphics();
    this.restartBG.fillStyle(0xb18bdc, 0.8); 
    this.restartBG.fillRoundedRect(
      this.cameras.main.centerX - 125,
      yPosition,
      250,
      60,
      10
    );

    // Create restart button
    const restartButton = this.add.bitmapText(
      this.cameras.main.centerX, 
      yPosition + 25, 
      'arcadeFont', 
      'Restart', 
      32
    ).setOrigin(0.5).setInteractive();
    
    // Button interactivity
    restartButton.on('pointerover', () => restartButton.setTint(0x00ff00));
    restartButton.on('pointerout', () => restartButton.clearTint());
    restartButton.on('pointerdown', () => {
      this.scene.start('startScene');
    });
  }

  // Function to format numbers with leading zeros
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}