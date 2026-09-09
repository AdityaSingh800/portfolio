let questions = [

    {
        question: "Which language is used to structure webpages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style webpages?",
        options: ["HTML", "CSS", "JavaScript", "Java"],
        answer: "CSS"
    },

    {
        question: "Which language is used to add behavior to webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "$"],
        answer: "#"
    },

    {
        question: "Which keyword creates a variable that can be changed?",
        options: ["const", "let", "fixed", "static"],
        answer: "let"
    },

    {
        question: "Which method adds an item to the end of an array?",
        options: ["pop()", "shift()", "push()", "add()"],
        answer: "push()"
    },

    {
        question: "Which method converts JSON into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.object()",
            "JSON.convert()"
        ],
        answer: "JSON.parse()"
    },

    {
        question: "Which method selects an element by its ID?",
        options: [
            "document.getElementById()",
            "document.getId()",
            "document.selectId()",
            "getElement()"
        ],
        answer: "document.getElementById()"
    },

    {
        question: "Which keyword is used to create a constant?",
        options: ["let", "var", "const", "constant"],
        answer: "const"
    },

    {
        question: "Which function is commonly used to make API requests?",
        options: [
            "request()",
            "fetch()",
            "api()",
            "getData()"
        ],
        answer: "fetch()"
    }

];


let questionNumber =
    document.getElementById("questionNumber");

let questionElement =
    document.getElementById("question");

let optionsElement =
    document.getElementById("options");

let nextButton =
    document.getElementById("nextButton");

let result =
    document.getElementById("result");

let timerElement =
    document.getElementById("timer");


let currentQuestion = 0;

let score = 0;

let answerSelected = false;

let timeLeft = 10;

let timer;


function displayQuestion() {

    let current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent =
        current.question;

    optionsElement.innerHTML = "";

    result.textContent = "";

    answerSelected = false;

    current.options.forEach(function(option) {

        let button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option");

        button.addEventListener("click", function() {

            checkAnswer(option, button);

        });

        optionsElement.appendChild(button);

    });

    startTimer();
}


function startTimer() {

    clearInterval(timer);

    timeLeft = 10;

    timerElement.textContent =
        `Time: ${timeLeft}`;

    timerElement.style.color = "";

    timer = setInterval(function() {

        timeLeft--;

        timerElement.textContent =
            `Time: ${timeLeft}`;


        // Bonus:
        // Warning when 3 seconds or less remain

        if (timeLeft <= 3) {

            timerElement.style.color = "red";

        }


        if (timeLeft === 0) {

            clearInterval(timer);

            timeUp();

        }

    }, 1000);
}


function checkAnswer(selectedAnswer, selectedButton) {

    if (answerSelected) {

        return;

    }

    answerSelected = true;

    clearInterval(timer);

    let correctAnswer =
        questions[currentQuestion].answer;


    let allButtons =
        document.querySelectorAll(".option");


    allButtons.forEach(function(button) {

        button.disabled = true;


        if (button.textContent === correctAnswer) {

            button.style.backgroundColor =
                "lightgreen";

        }

    });


    if (selectedAnswer === correctAnswer) {

        score++;

        selectedButton.style.backgroundColor =
            "lightgreen";

        result.textContent =
            "Correct! ✅";

    }

    else {

        selectedButton.style.backgroundColor =
            "lightcoral";

        result.textContent =
            `Wrong! ❌ Correct answer: ${correctAnswer}`;

    }

}


function timeUp() {

    if (answerSelected) {

        return;

    }

    answerSelected = true;

    let correctAnswer =
        questions[currentQuestion].answer;


    let allButtons =
        document.querySelectorAll(".option");


    allButtons.forEach(function(button) {

        button.disabled = true;


        if (button.textContent === correctAnswer) {

            button.style.backgroundColor =
                "lightgreen";

        }

    });


    result.textContent =
        `⏰ Time's up! Correct answer: ${correctAnswer}`;


    // Bonus:
    // Automatically move to next question

    setTimeout(function() {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            displayQuestion();

        }

        else {

            showResult();

        }

    }, 1500);

}


nextButton.addEventListener("click", function() {

    if (!answerSelected) {

        result.textContent =
            "Please select an answer first.";

        return;

    }


    clearInterval(timer);

    currentQuestion++;


    if (currentQuestion < questions.length) {

        displayQuestion();

    }

    else {

        showResult();

    }

});


function showResult() {

    clearInterval(timer);

    questionNumber.textContent = "";

    questionElement.textContent =
        "🎉 Quiz Completed!";

    optionsElement.innerHTML = "";

    nextButton.style.display = "none";

    timerElement.textContent = "";

    result.textContent =
        `Your Score: ${score} / ${questions.length}`;


    let restartButton =
        document.createElement("button");

    restartButton.textContent =
        "Restart Quiz";

    restartButton.id =
        "restartButton";


    document.querySelector(".quiz-container")
        .appendChild(restartButton);


    restartButton.addEventListener("click", function() {

        currentQuestion = 0;

        score = 0;

        answerSelected = false;

        restartButton.remove();

        nextButton.style.display =
            "inline-block";

        displayQuestion();

    });

}


displayQuestion();