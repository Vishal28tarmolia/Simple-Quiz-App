const questions = [
    {
        question: "Which of the following is not an HTML tag?",
        answers: [
            { text: "Doctype", correct: true },
            { text: "P", correct: false },
            { text: "Table", correct: false },
            { text: "Style", correct: false },


        ]
    },
    {
        question: "How many ways can you apply colors in CSS?",
        answers: [
            { text: "2", correct: false },
            { text: "4", correct: false },
            { text: "3", correct: true },
            { text: "1", correct: false },
        ]

    },
    {
        question: "How can you clear a floated element?",
        answers: [
            { text: "Clear.both", correct: true },
            { text: "Press the delete key", correct: false },
            { text: "Del tag", correct: false },
            { text: "Strike tag", correct: false },
        ]
    },
    {
        question: "What are the two methods of forms transfer?",
        answers: [
            { text: "Get and receive", correct: false },
            { text: "Get and post", correct: true },
            { text: "Post and receive", correct: false },
            { text: "Post and take", correct: false },
        ]
    },
    {
        question: "What should be the very last thing in an HTML document?",
        answers: [
            { text: "The heading", correct: false },
            { text: "Title", correct: false },
            { text: "Body", correct: false },
            { text: "Doc type", correct: true },
        ]
    },
    {
        question: "A collection of data containing both properties and methods is called...",
        answers: [
            { text: "Tag", correct: false },
            { text: "Selector", correct: false },
            { text: "Object", correct: true },
            { text: "Class", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    console.log(isCorrect);
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();