const questions = [
    {
        question: "Where did the BSP went to?",
        answers: [
            { text: "Palayan", correct: true},
            { text: "Boracay", correct: false},
            { text: "Zoobic Safari", correct: false},
            { text: "Cebu", correct: false}
        ]
    },
    {
        question: "When did the BSP come go to the jamboree?",
        answers: [
            { text: "Monday", correct: true},
            { text: "Tuesday", correct: false},
            { text: "Wednesday", correct: false},
            { text: "Thursday", correct: false}
        ]
    },
    {
        question: "When did the BSP come back?",
        answers: [
            { text: "Monday", correct: false},
            { text: "Tuesday", correct: false},
            { text: "Wednesday", correct: false},
            { text: "Thursday", correct: true}
        ]
    },
    {
        question: "Was the Jamboree fun?",
        answers: [
            { text: "No", correct: true},
            { text: "Maybe", correct: true},
            { text: "Yes", correct: true},
            { text: "Truly was fun", correct: true}
        ]
    },
    {
        question: "Are the BSP excused on this week catch-up Friday?",
        answers: [
            { text: "No", correct: false},
            { text: "Yes they are excuse", correct: true},
            { text: "I don't know", correct: false},
            { text: "I'm absent so I don't know", correct: false}
        ]
    }
];

const questionElement = document.getElementById("Q");
const answerbutton = document.getElementById("choices");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.style.display = "none";
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.classList.add("fade-in"); // Add fade-in animation

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answerbutton.appendChild(button);
    });
    answerbutton.style.display = "block"; // Ensure answer buttons are displayed
}

function resetState(){
    questionElement.classList.remove("fade-in"); // Remove animation class
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(correct){
    if(correct){
        score++;
    }
    nextbutton.style.display = "block"; // Show next button after selecting an answer
}

function goToNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        questionElement.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
        answerbutton.style.display = "none"; // Hide answer buttons
        nextbutton.innerHTML = "Restart";
        nextbutton.removeEventListener("click", goToNextQuestion);
        nextbutton.addEventListener("click", startQuiz);
        currentQuestionIndex = 0; // Reset current question index to loop back to the first question
    }
}

nextbutton.addEventListener("click", goToNextQuestion);

startQuiz();
