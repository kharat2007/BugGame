const questions = [
    {
        difficulty: "Easy",
        code: `function add(a, b) {
    return a - b;
}

console.log(add(5, 3));`,
        answers: [
            "Line 1: function add(a, b)",
            "Line 2: return a - b",
            "Line 4: console.log",
            "There is no bug"
        ],
        correct: 1
    },

    {
        difficulty: "Easy",
        code: `let name = "Aryan";
let age = 19;

console.log(nam);`,
        answers: [
            "Line 1: let name",
            "Line 2: let age",
            "Line 4: console.log(nam)",
            "There is no bug"
        ],
        correct: 2
    },

    {
        difficulty: "Easy",
        code: `for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log("Done");`,
        answers: [
            "Line 1: for loop",
            "Line 2: console.log",
            "Line 4: closing bracket",
            "There is no bug"
        ],
        correct: 3
    },

    {
        difficulty: "Medium",
        code: `function greet(name) {
    console.log("Hello " + name
}

greet("Developer");`,
        answers: [
            "Line 1: function declaration",
            "Line 2: console.log",
            "Line 3: missing closing bracket",
            "Line 5: function call"
        ],
        correct: 2
    },

    {
        difficulty: "Medium",
        code: `let numbers = [1, 2, 3, 4];

for (let i = 0; i <= numbers.length; i++) {
    console.log(numbers[i]);
}`,
        answers: [
            "Line 1: numbers array",
            "Line 3: i <= numbers.length",
            "Line 4: console.log",
            "There is no bug"
        ],
        correct: 1
    },

    {
        difficulty: "Medium",
        code: `const user = {
    name: "Alex",
    age: 20
};

console.log(user.email);`,
        answers: [
            "Line 1: const user",
            "Line 2: name property",
            "Line 3: age property",
            "Line 7: user.email"
        ],
        correct: 3
    },

    {
        difficulty: "Hard",
        code: `function multiply(a, b) {
    if (a > 0) {
        return a * b;
    }

    return 0;
}

console.log(multiply(5));`,
        answers: [
            "Line 1: function declaration",
            "Line 2: if statement",
            "Line 3: multiplication",
            "Line 9: missing second argument"
        ],
        correct: 3
    },

    {
        difficulty: "Hard",
        code: `const numbers = [1, 2, 3];

const doubled = numbers.map(function(num) {
    return num * 2;
});

console.log(doubled);`,
        answers: [
            "Line 1: array declaration",
            "Line 3: map function",
            "Line 4: return statement",
            "There is no bug"
        ],
        correct: 3
    },

    {
        difficulty: "Hard",
        code: `let score = 50;

if (score = 100) {
    console.log("Perfect!");
} else {
    console.log("Keep trying!");
}`,
        answers: [
            "Line 1: score declaration",
            "Line 3: score = 100",
            "Line 4: console.log",
            "There is no bug"
        ],
        correct: 1
    },

    {
        difficulty: "Hard",
        code: `function calculateTotal(price, quantity) {
    const total = price * quantity;

    return total;
}

let result = calculateTotal(100, 2);

console.log(result);`,
        answers: [
            "Line 1: function declaration",
            "Line 2: multiplication",
            "Line 7: calculateTotal",
            "There is no bug"
        ],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;
let streak = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 20;
let timerInterval;
let answered = false;

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const streakElement = document.getElementById("streak");
const timerElement = document.getElementById("timer");
const questionNumberElement = document.getElementById("questionNumber");
const progressElement = document.getElementById("progress");
const questionElement = document.getElementById("question");
const codeElement = document.getElementById("code");
const answersElement = document.getElementById("answers");
const difficultyElement = document.getElementById("difficulty");
const messageElement = document.getElementById("message");

const gameOverElement = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");
const finalCorrectElement = document.getElementById("finalCorrect");
const finalWrongElement = document.getElementById("finalWrong");
const finalBestElement = document.getElementById("finalBest");

const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");


function loadQuestion() {

    clearInterval(timerInterval);

    answered = false;

    const question = questions[currentQuestion];

    questionNumberElement.textContent = currentQuestion + 1;

    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    difficultyElement.textContent = question.difficulty;

    questionElement.textContent = "Which line contains the bug?";

    codeElement.textContent = question.code;

    answersElement.innerHTML = "";

    messageElement.textContent = "";
    messageElement.className = "message";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });

    startTimer();
}


function startTimer() {

    timeLeft = 20;

    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (!answered) {
                timeUp();
            }
        }

    }, 1000);
}


function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    clearInterval(timerInterval);

    const question = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === question.correct) {

        buttons[selectedIndex].classList.add("correct");

        score += 10;

        streak++;
        correctAnswers++;

        if (streak >= 3) {
            score += 5;
        }

        messageElement.textContent =
            streak >= 3
                ? "🔥 Correct! Streak bonus +5!"
                : "✅ Correct! +10 points";

        messageElement.classList.add("correct-message");

    } else {

        buttons[selectedIndex].classList.add("wrong");

        buttons[question.correct].classList.add("correct");

        lives--;

        streak = 0;

        wrongAnswers++;

        messageElement.textContent =
            "❌ Wrong answer!";

        messageElement.classList.add("wrong-message");

        if (lives <= 0) {

            updateStats();

            setTimeout(() => {
                endGame();
            }, 1000);

            return;
        }
    }

    updateStats();

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion >= questions.length) {
            endGame();
        } else {
            loadQuestion();
        }

    }, 1200);
}


function timeUp() {

    if (answered) return;

    answered = true;

    lives--;

    streak = 0;

    wrongAnswers++;

    const question = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;
    });

    buttons[question.correct].classList.add("correct");

    messageElement.textContent =
        "⏰ Time's up!";

    messageElement.classList.add("wrong-message");

    updateStats();

    if (lives <= 0) {

        setTimeout(() => {
            endGame();
        }, 1000);

        return;
    }

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion >= questions.length) {
            endGame();
        } else {
            loadQuestion();
        }

    }, 1200);
}


function updateStats() {

    scoreElement.textContent = score;

    livesElement.textContent = lives;

    streakElement.textContent = streak;

    timerElement.textContent = timeLeft;
}


function endGame() {

    clearInterval(timerInterval);

    const oldBest =
        Number(localStorage.getItem("bugHunterBest")) || 0;

    const bestScore = Math.max(oldBest, score);

    localStorage.setItem("bugHunterBest", bestScore);

    finalScoreElement.textContent = score;

    finalCorrectElement.textContent = correctAnswers;

    finalWrongElement.textContent = wrongAnswers;

    finalBestElement.textContent = bestScore;

    gameOverElement.classList.remove("hidden");
}


function restartGame() {

    clearInterval(timerInterval);

    currentQuestion = 0;

    score = 0;

    lives = 3;

    streak = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    gameOverElement.classList.add("hidden");

    updateStats();

    loadQuestion();
}


restartBtn.addEventListener("click", restartGame);

playAgainBtn.addEventListener("click", restartGame);


loadQuestion();