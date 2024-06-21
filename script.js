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
let streakCounter = 0;
let streakMulti = 1;

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

initLevel(1); // default difficulty

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
    const levelGroupIdx = Math.ceil((level/3)-1);
    answerLength = level + 1;
    let diffStr = "";
    const levelGroup = ["Easy - ", "Medium - ", "Hard - ", "Expert - "];
    
   
    // calculate base score values
    diffStr = levelGroup[levelGroupIdx] + level;
    scoreValueWin = Math.pow(10,levelGroupIdx+1);
    scoreValueLose = Math.pow(10,levelGroupIdx);

    // differentiate per level within group
    if (level % 3 === 0){//3 6 9 12
        scoreValueWin *= 2;
        scoreValueLose = Math.floor(scoreValueLose) * 5;
    } else if(level % 3 === 2){ //2 5 8 11
        scoreValueWin *= 1.5;
        scoreValueLose = Math.floor(scoreValueLose) * 3;
    } else {
    } 

    if (levelGroupIdx <= 1) { // level setup
        disableStrokeCounter();
        turnOffTimer();
    } else if (levelGroupIdx === 2){
 
        enableStrokeCounter(answerLength);
        turnOffTimer();
    } else {
        answerLength = 10;
        enableStrokeCounter(answerLength);
        switch (level) {
            case level = 10:
                turnOnTimer(12);
            break;
            case level = 11:
                turnOnTimer(10);
            break;
            case level = 12:
                turnOnTimer(8);
            break;
        }
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
    let tempPoints = 0;

    if (answer === "") {
        return alert("Please choose a difficulty first!");
    } else if ( userAnswer == answer) {
        totalWins++;
        setStreakCounter();
        tempPoints = Math.floor(streakMulti * scoreValueWin);
        fixPoints(tempPoints);
        alert(`${streakMulti > 1 ? 
            "Hot Streak! " + streakCounter + " in a row!" + " Multiplier: " + streakMulti : 
            "You Won!"} \nYou got ${tempPoints} points! Congratulations!`);
    } else {
        tempPoints = Math.floor(scoreValueLose);
        fixPoints(-tempPoints);
        streakCounter = 0;
        alert(`WRONG! You lost ${tempPoints} points!\nThe correct answer was ${answer}! \nBetter luck next time!`);
    }
    
    totalGames++;
    endGame();
}

function setStreakCounter(){
    streakCounter++;
    if(streakCounter <= 2){
        streakMulti = 1;
    } else {
        streakMulti += .05;
    }
    streakMulti = Math.trunc(streakMulti * 100)/100;
}

function fixPoints (points) {
    score += Math.floor(points);
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
    }else if (element.classList.contains("invisText")) {
        element.classList.toggle("invisText");
    }
}

function toggleVisibilityOff (element) {
    if(element == answerTextBox) {
        element.classList.toggle("invisText");
    }else if (!element.classList.contains("hidden")){
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