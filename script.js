const questions = [
    {
        question: "Gazety noforonin'i Jean Ralaimongo ?",
        answers: [
            {text: "GAZETINTSIKA", correct: false},
            {text: "NY GAZETIKO", correct: false},
            {text: "LA LIBERTE", correct: true}
        ]
    },
    {
        question: "Inona no mifanohitra amin'ny marary ?",
        answers: [
            {text: "MATANJAKA", correct: true},
            {text: "MAFY", correct: false},
            {text: "MALAHELO", correct: false}
        ]
    },
    {
        question: "Taona firy no nahazoan'i Madagasikara ny fahaleovantena ?",
        answers: [
            {text: "1960", correct: true},
            {text: "1958", correct: false},
            {text: "1965", correct: false}
        ]
    },
    {
        question: "Inona ilay fombafomba mampody ny taolambalon'ny razana ?",
        answers: [
            {text: "ALAHAMADIBE", correct: false},
            {text: "FAMADIHANA", correct: true},
            {text: "KABARY", correct: false}
        ]
    },
    {
        question: "Inona no renivohitr'i Itasy ?",
        answers: [
            {text: "ANTANANARIVO", correct: false},
            {text: "MIARINARIVO", correct: true},
            {text: "FIANARANTSOA", correct: false}
        ]
    },
    {
        question: "Inona no ala lehibe indrindra eto Madagasikara ?",
        answers: [
            {text: "KIRINDY", correct: false},
            {text: "RANOMAFANA", correct: false},
            {text: "MASOALA", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Manaraka";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
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
    questionElement.innerHTML = 'Manana isa '+ score +' / ' + questions.length +' ! ';
    nextButton.innerHTML = "Afaka mamerina";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();