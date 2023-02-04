// Constants for the game
const questions = [
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    }
];
const totalTime = 60; // Total time for the quiz, in seconds
const penaltyTime = 10; // Time penalty for each wrong answer, in seconds

// Variables for the game
let currentQuestion = 0;
let timeRemaining = totalTime;
let timerId;

// Start the game when the start button is clicked
document.querySelector("#start-btn").addEventListener("click", function () {
    startGame();
});

// Function to start the game
function startGame() {
    // Hide the start button and show the quiz
    document.querySelector("#start-btn").style.display = "none";
    document.querySelector("#quiz").style.display = "block";

    // Start the timer
    timerId = setInterval(function () {
        timeRemaining--;
        document.querySelector("#time-remaining").innerHTML = timeRemaining;

        // End the game if the timer reaches 0
        if (timeRemaining === 0) {
            endGame();
        }
    }, 1000);

    // Show the first question
    showQuestion(currentQuestion);
}

// Function to show a question
function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    document.querySelector("#question").innerHTML = question.question;

    // Clear the previous answer choices
    document.querySelector("#choices").innerHTML = "";

    // Show the answer choices for the current question
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const btn = document.createElement("button");
        btn.innerHTML = choice;
        btn.addEventListener("click", function () {
            checkAnswer(choice);
        });
        document.querySelector("#choices").appendChild(btn);
    }
}

// Function to check the answer
function checkAnswer(answer) {
    const question = questions[currentQuestion];
    if (answer === question.answer) {
        // The answer is correct, move on to the next question
        currentQuestion++;
        if (currentQuestion === questions.length) {
            // No more questions, end the game
            endGame();
        } else {
            // Show the next question
            showQuestion(currentQuestion);
        }
    } else {
        // The answer is incorrect, subtract time from the timer
        timeRemaining -= penaltyTime;
    }
}

// Function to end the game
function endGame() {
    // Stop the timer
    clearInterval(timerId);
    // Show the final score and prompt for initials
    const score = timeRemaining;
    document.querySelector("#quiz").innerHTML = `
  <h2>Game Over</h2>
  <p>Your final score is ${score}</p>
  <p>Enter your initials:</p>
  <input type="text" id="initials">
  <button id="save-btn">Save</button>
`;

    // Save the score and initials to local storage
    document.querySelector("#save-btn").addEventListener("click", function () {
        const initials = document.querySelector("#initials").value;
        localStorage.setItem(initials, score);
    });
}  