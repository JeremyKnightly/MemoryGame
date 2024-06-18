let gameDifficulty = null;
let totalGames = 0;
let totalWins = 0;
let winRate = "N/A";
let score = 0;
let answerLength = 0;
let answer = "";
let numKeyStrokes = 0;
let maxKeyStrokes = 10;
let scoreValueWin = 0;
let scoreValueLose = 0;
let timerCurrentTime = 0;
let timerEnabled = false;

const timer = setInterval(() => {
    if(timerEnabled){
        timerCurrentTime--;
        updateTimerDisplay(timerCurrentTime);
        if(timerCurrentTime <= 0) checkAnswer();
    }
} ,1000);
const timerDisplay = document.getElementById("timer");
const button = document.getElementById("submitButton");
const answerTextBox = document.getElementById("generatedNum");
document.getElementById("userNum")
    .addEventListener('keyup', checkStroke);

toggleVisibilityOn(button);
toggleVisibilityOn(answerTextBox);

function resetAnswer(){
    answerLength = 0;
    answer = "";
    numKeyStrokes = 0;
    document.getElementById("userNum").value = "";
    toggleVisibilityOn(answerTextBox);
}

function initLevel(levelNum){
    resetAnswer();

    setGameDifficulty(levelNum);
    generateAnswer(answerLength);
    uploadAnswer();

    initDifficultyMeasures();
}

function setGameDifficulty (level) {
    gameDifficulty = level;
    answerLength = level + 1;
    let diffStr = "";

    switch (level) {
        case level = 1:
            diffStr = "Easy - 1";
            scoreValueWin = 10;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 2:
            diffStr = "Easy - 2";
            scoreValueWin = 15;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 3:
            diffStr = "Easy - 3";
            scoreValueWin = 20;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 4:
            diffStr = "Medium - 4";
            scoreValueWin = 100;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 5:
            diffStr = "Medium - 5";
            scoreValueWin = 150;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 6:
            diffStr = "Medium - 6";
            scoreValueWin = 200;
            scoreValueLose = 0;
            disableStrokeCounter();
            turnOffTimer();
        break;
        case level = 7:
            diffStr = "Hard - 7";
            scoreValueWin = 1000;
            scoreValueLose = -500;
            enableStrokeCounter(answerLength);
            turnOffTimer();
        break;
        case level = 8:
            diffStr = "Hard - 8";
            scoreValueWin = 1500;
            scoreValueLose = -600;
            enableStrokeCounter(answerLength);
            turnOffTimer();
        break;
        case level = 9:
            diffStr = "Hard - 9";
            scoreValueWin = 2000;
            scoreValueLose = -700;
            enableStrokeCounter(answerLength);
            turnOffTimer();
        break;
        case level = 10:
            diffStr = "Expert - 10";
            scoreValueWin = 10000;
            scoreValueLose = -3000;
            answerLength = 10;
            enableStrokeCounter(answerLength);
            turnOnTimer(12);
        break;
        case level = 11:
            diffStr = "Expert - 11";
            scoreValueWin = 15000;
            scoreValueLose = -4000;
            answerLength = 10;
            turnOnTimer(10);
            enableStrokeCounter(answerLength);
        break;
        case level = 12:
            diffStr = "Expert - 12";
            scoreValueWin = 20000;
            scoreValueLose = -5000;
            answerLength = 10;
            enableStrokeCounter(answerLength);
            turnOnTimer(8);
        break;
    }

    document.getElementById("difficulty").innerHTML = diffStr;
}

function generateAnswer (length) {
    charToPush = '';
    for( let i = 0; i < length; i ++){
        charToPush = Math.floor(Math.random()*10).toString();
        answer += charToPush.toString();
    }
}   

function uploadAnswer () {
    document.getElementById("generatedNum").innerHTML = answer;
}

function checkAnswer () {
    const userAnswer = document.getElementById("userNum").value;

    if (answer === "") {
        return alert("Please choose a difficulty first!");
    } else if ( userAnswer == answer) {
        alert('You won! Congratulations!');
        totalWins++;
        fixPoints(scoreValueWin);
    } else {
        fixPoints(scoreValueLose);
        alert(`WRONG!\nThe correct answer was ${answer}! \nBetter luck next time!`);
    }
    
    totalGames++;
    endGame();
}

function fixPoints (points) {
    score += points;
}

function updateScore () {
    document.getElementById("score").innerHTML = score;
}

function endGame () {
    resetAnswer();
    updateScore();

    document.getElementById("gamesPlayed").innerHTML = totalGames;
    document.getElementById("totalWins").innerHTML = totalWins;
    winRate = Math.round((totalWins/totalGames) * 100);
    document.getElementById("winRate").innerHTML = winRate + '%';

    initLevel(gameDifficulty);
}

function toggleVisibilityOn (element) {
    if (element.classList.contains("hidden")){
        element.classList.toggle("hidden");
    }
}

function toggleVisibilityOff (element) {
    if (!element.classList.contains("hidden")){
        element.classList.toggle("hidden");
    }
}

function enableStrokeCounter (maxStrokes) {
    maxKeyStrokes = maxStrokes;
    toggleVisibilityOff(button);
}

function disableStrokeCounter () {
    toggleVisibilityOn(button);
    maxKeyStrokes = Infinity;
}

function checkStroke () {
    numKeyStrokes++;
    if(numKeyStrokes === 1) toggleVisibilityOff(answerTextBox);
    if (numKeyStrokes >= maxKeyStrokes) {
        checkAnswer();
    } 
}

function turnOffTimer () {
    toggleVisibilityOff(timerDisplay);
    timerCurrentTime = 5;
    timerEnabled = false;
}

function turnOnTimer (seconds) {
    timerCurrentTime = seconds;
    timerEnabled = true;
    toggleVisibilityOn(timerDisplay);
}

function updateTimerDisplay (seconds) {
    timerDisplay.innerHTML = seconds;
}