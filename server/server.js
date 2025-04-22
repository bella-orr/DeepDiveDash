const express = require('express');  
const cors = require('cors');  
const app = express();  
const port = 3000;  
  
// Enable CORS and JSON parsing  
app.use(cors());  
app.use(express.json());  
  
// Store scores in memory (you might want to use a database in a real app)  
let scores = [];  
  
// Get all scores  
app.get('/scores', (req, res) => {  
    res.json(scores);  
});  
  
// Add a new score  
app.post('/scores', (req, res) => {  
    const newScore = {  
        score: req.body.score,  
        timestamp: req.body.timestamp  
    };  
    scores.push(newScore);  
    // Keep only top 10 scores  
    scores.sort((a, b) => b.score - a.score);  
    scores = scores.slice(0, 10);  
    res.json(newScore);  
});  
  
// Start the server  
app.listen(port, () => {  
    console.log(`Score server running at http://localhost:${port}`);  
});  