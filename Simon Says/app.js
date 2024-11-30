let LevelUpSound = new Audio("win.mp3");
let LostLevelSound = new Audio("lost.mp3");

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0; // Define and initialize high score variable

let h2 = document.querySelector("h2");

// Create and display the high score element
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.body.appendChild(highScoreDisplay); // Append to the document body

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    if(level>1){
        LevelUpSound.play();
    }
    

    // Corrected the range to include all colors
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Update the high score if necessary
        if (level > highScore) {
            highScore = level;
            highScoreDisplay.innerText = `High Score: ${highScore}`;
            LostLevelSound.play();  
        }

        // Game over logic
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
