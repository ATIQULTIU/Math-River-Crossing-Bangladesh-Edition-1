let score = 0;
let highScore = localStorage.getItem("riverHighScore") || 0;
let timeLeft = 60;
let timerInterval;
let correctAnswer;
let boatPosition = 0;

document.getElementById("highScore").innerText = highScore;

function startGame(){
    score = 0;
    boatPosition = 0;
    timeLeft = 60;
    updateUI();
    generateQuestion();
    startTimer();
}

function startTimer(){
    clearInterval(timerInterval);
    timerInterval = setInterval(()=>{
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            endGame();
        }
    },1000);
}

function generateQuestion(){
    const level = document.getElementById("level").value;
    let max = level === "easy" ? 10 : level === "medium" ? 20 : 50;

    let a = Math.floor(Math.random()*max);
    let b = Math.floor(Math.random()*max);
    let ops = ["+","-","*"];
    let op = ops[Math.floor(Math.random()*ops.length)];

    correctAnswer = eval(`${a}${op}${b}`);
    document.getElementById("question").innerText = `${a} ${op} ${b} = ?`;
}

function submitAnswer(){
    let answer = Number(document.getElementById("answer").value);

    if(answer === correctAnswer){
        score++;
        boatPosition += 5;
        document.getElementById("result").innerText = "✅ Correct! Boat moves forward!";
    } else {
        boatPosition -= 5;
        if(boatPosition < 0) boatPosition = 0;
        document.getElementById("result").innerText = "❌ Wrong! Boat moves back!";
    }

    document.getElementById("boat").style.left = boatPosition + "%";
    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = "";
    generateQuestion();

    if(boatPosition >= 90){
        endGame();
    }
}

function endGame(){
    if(score > highScore){
        highScore = score;
        localStorage.setItem("riverHighScore", highScore);
    }
    document.getElementById("highScore").innerText = highScore;
    document.getElementById("result").innerText = "🏆 Game Over!";
}

function restartGame(){
    clearInterval(timerInterval);
    startGame();
}

function updateUI(){
    document.getElementById("score").innerText = score;
    document.getElementById("boat").style.left = boatPosition + "%";
    document.getElementById("time").innerText = timeLeft;
}