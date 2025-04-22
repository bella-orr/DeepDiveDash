// Assignment: Deep Dive Dash Final Project  
// Contributors: Addison Hatfield, Bella Orr, Nicole Miller, Peter Nguyen  
// Course: IT3049C  
// Professor: Professor Andrew Lively  
// Due Date: 4/30/2025  
  
// Declare variable for game settings  
var gameSettings = {  
  playerSpeed: 250,  
  currentScore: 0  
};  

// Define your startScene and gameOverScene  
var startScene = {  
  key: 'startScene',  
  create: function() {  
      this.add.text(200, 300, 'Press space to start', { fontSize: '32px', fill: '#fff' });  
      this.input.keyboard.once('keydown-SPACE', () => {  
          this.scene.start('playScene');  
      });  
  }  
};  

var gameOverScene = {  
  key: 'gameOverScene',  
  create: function() {  
      this.add.text(200, 300, 'Game Over', { fontSize: '32px', fill: '#fff' });  
      // Maybe add a restart button here  
  }  
};  

// The playScene integrates both geolocation and fetch API usage.  
class playScene extends Phaser.Scene {  
  constructor() {  
      super('playScene');  
      this.scoreUrl = 'http://localhost:3000/scores'; //API Endpoint
  }  
    
  preload() {  
      // Load day and night background images  
      this.load.image('bgDay', 'assets/bg_day.png');  
      this.load.image('bgNight', 'assets/bg_night.png');  
  }  
    
  create() {  
      // Use geolocation to set the background image based on local time  
      this.setBackgroundByGeo();  
        
      // Create a score display  
      this.score = gameSettings.currentScore;  
      this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#fff' });  
        
      // use a keyboard press to simulate increasing score and saving it  
      this.input.keyboard.on('keydown-UP', () => {  
          this.score += 10;  
          this.scoreText.setText('Score: ' + this.score);  
      });  
      this.input.keyboard.on('keydown-S', () => {  
          // On pressing S, submit score via the fetch API  
          this.submitScore(this.score);  
      });  
        
      // On scene start, try to fetch scores from the backend  
      this.fetchScores();  
  }  
    
  setBackgroundByGeo() {  
      if (navigator.geolocation) {  
          navigator.geolocation.getCurrentPosition(  
              (position) => {  
                  // Use device time 
                  let currentHour = new Date().getHours();  
                  console.log('Current Hour:', currentHour);  
                  console.log('Geolocation Position:', position);  
                    
                  let isDay = currentHour >= 6 && currentHour < 18;  
                  let bgKey = isDay ? 'bgDay' : 'bgNight';  
                    
                  // Set the background image covering the entire game canvas  
                  this.add.image(400, 300, bgKey).setDisplaySize(800, 600);  
              },  
              (error) => {  
                  console.error('Geolocation error:', error);  
                  // In case of error, default to day background  
                  this.add.image(400, 300, 'bgDay').setDisplaySize(800, 600);  
              }  
          );  
      } else {  
          console.error('Geolocation is not supported by your browser.');  
          // Fallback: default to day background  
          this.add.image(400, 300, 'bgDay').setDisplaySize(800, 600);  
      }  
  }  
    
  fetchScores() {  
      // GET request to retrieve scores  
      fetch(this.scoreUrl)  
          .then(response => {  
              if (!response.ok) {  
                  throw new Error('Failed to fetch scores');  
              }  
              return response.json();  
          })  
          .then(data => {  
              console.log('Fetched Scores:', data);  
              // Optionally display scores on screen  
              if (!this.highScoreText && Array.isArray(data)) {  
                  let scoreText = 'High Scores:\\n';  
                  data.forEach((item, index) => {  
                      scoreText += (index + 1) + '. ' + item.score + '\\n';  
                  });  
                  this.highScoreText = this.add.text(550, 16, scoreText, { fontSize: '24px', fill: '#fff' });  
              }  
          })  
          .catch(error => console.error('Error fetching scores:', error));  
  }  
    
  submitScore(score) {  
      // Post the new score to the server  
      fetch(this.scoreUrl, {  
          method: 'POST',  
          headers: {  
              'Content-Type': 'application/json'  
          },  
          body: JSON.stringify({  
              score: score,  
              timestamp: new Date().toISOString()  
          })  
      })  
      .then(response => {  
          if (!response.ok) {  
              throw new Error('Failed to submit score');  
          }  
          return response.json();  
      })  
      .then(data => {  
          console.log('Score submitted successfully:', data);  
          // Re-fetch scores to update display  
          this.fetchScores();  
      })  
      .catch(error => console.error('Error submitting score:', error));  
  }  
    
  update() {  
      // game update logic here (if needed)  
  }  
}  

// Game configuration
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