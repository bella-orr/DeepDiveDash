// Assignment: Deep Dive Dash Final Project
// Contributors: Addison Hatfield, Bella Orr, Nicole Miller, Peter Nguyen
// Course: IT3049C
// Professor: Professor Andrew Lively
// Due Date: 4/30/2025

class gameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" });
  }

  // Initialize the scene with data passed from the previous scene
  init(data) {
    this.finalScore = data.score || 0;
    this.playerName = "";
    this.cursorVisible = true;
    this.cursorBlinkDelay = 500;
    this.lastCursorTime = 0;
  }

  create() {
    // Format the score with leading zeros
    const scoreFormatted = this.zeroPad(this.finalScore, 6);

    // Add background
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);

    // Add decorations to the background
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
      300,
      50,
      10
    );

    // Create name prompt (will disappear when typing starts)
    this.namePrompt = this.add.bitmapText(
      this.cameras.main.centerX - 140,
      this.scoreText.y + this.scoreText.height + 45,
      'arcadeFont',
      'ENTER NAME:',
      24
    );

    // Create name text display
    this.nameDisplay = this.add.bitmapText(
      this.cameras.main.centerX - 140,
      this.scoreText.y + this.scoreText.height + 45,
      'arcadeFont',
      '',
      24
    );

    // Create cursor
    this.cursor = this.add.bitmapText(
      this.nameDisplay.x + this.nameDisplay.width,
      this.nameDisplay.y,
      'arcadeFont',
      '|',
      24
    );

    // Set up keyboard input
    this.input.keyboard.on('keydown', (event) => {
      // Hide prompt when first character is typed
      if (this.playerName.length === 0 && event.key.length === 1) {
        this.namePrompt.setVisible(false);
      }

      if (event.key === 'Backspace') {
        this.playerName = this.playerName.slice(0, -1);
        // Show prompt again if all text is deleted
        if (this.playerName.length === 0) {
          this.namePrompt.setVisible(true);
        }
        this.updateNameDisplay();
      } 
      else if (event.key === 'Enter') {
        this.submitName();
      }
      else if (event.key.length === 1 && this.playerName.length < 10) {
        this.playerName += event.key;
        this.updateNameDisplay();
      }
    });

    // Submit button background
    this.submitBG = this.add.graphics();
    this.submitBG.fillStyle(0xb18bdc, 0.8);
    this.submitBG.fillRoundedRect(
      this.cameras.main.centerX - 100,
      this.scoreText.y + this.scoreText.height + 90,
      200,
      50,
      10
    );

    // Submit button
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
  }

  // Function to update the scene
  update(time) {
    // Blink cursor effect
    if (time > this.lastCursorTime + this.cursorBlinkDelay) {
      this.cursorVisible = !this.cursorVisible;
      this.cursor.setAlpha(this.cursorVisible ? 1 : 0);
      this.lastCursorTime = time;
    }
  }

  // Function to update the name display and cursor position
  updateNameDisplay() {
    this.nameDisplay.setText(this.playerName);
    // Update cursor position
    this.cursor.x = this.nameDisplay.x + this.nameDisplay.width;
  }

  // Function to handle name submission
  submitName() {
    if (this.playerName === "") {
      this.playerName = "Player";
      this.namePrompt.setVisible(true); // Show prompt again if empty
    }
    
    // Clean up input elements
    this.input.keyboard.off('keydown');
    this.nameInputBG.destroy();
    this.namePrompt.destroy();
    this.nameDisplay.destroy();
    this.cursor.destroy();
    this.submitBG.destroy();
    this.submitButton.destroy();

    // Save score
    this.saveScore();
    
    // Show confirmation
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

  // Function to save the score
  saveScore() {
    const scoreData = {
        name: this.playerName,
        score: this.finalScore,
        date: new Date().toLocaleString()
    };

    //Get existing scores from localStorage as fallback
    const scores = JSON.parse(localStorage.getItem('highScores') || '[]');
    scores.push(scoreData);
    
    //Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10); // Keep top 10 scores
    
    //Save back to localStorage as backup
    localStorage.setItem('highScores', JSON.stringify(topScores));
    
    //Format for text file
    const textContent = topScores.map(score => 
        `${score.name}: ${score.score} (${score.date})`
    ).join('\n');
    
    // 5. Create downloadable file
    this.downloadScoreboard(textContent);
}

//helper function to create downloadable file
downloadScoreboard(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scoreBoard.txt';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

//using fetch() to send to a server. Uncomment if you have a server to send data to.
//Github only hosts static files.
/*
async saveScoreToServer() {
  try {
      const response = await fetch('your-server-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              name: this.playerName,
              score: this.finalScore
          })
      });
      const data = await response.json();
      console.log('Score saved to server:', data);
  } catch (error) {
      console.error('Error saving score:', error);
  }
}
*/


  // Function to create the restart button
  createRestartButton(yPosition) {
    this.restartBG = this.add.graphics();
    this.restartBG.fillStyle(0xb18bdc, 0.8); 
    this.restartBG.fillRoundedRect(
      this.cameras.main.centerX - 125,
      yPosition,
      250,
      60,
      10
    );

    // Restart button
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

  // Function to add leading zeros to a number
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}