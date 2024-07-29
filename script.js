const questions = [
    {
        question: 'Which is largest animal in the world?',
        answers:[
            {text: 'Shark', correct: false},
            {text: 'Blue whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Giraffe', correct: false},
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answers:[
            {text: 'Vatican City', correct: true},
            {text: 'Bhutan', correct: false},
            {text: 'Nepal', correct: false},
            {text: 'Shri Lanka', correct: false},
        ]
    },
    {
        question: 'Which is the largest desert in the world?',
        answers:[
            {text: 'Kalahari', correct: false},
            {text: 'Gobi', correct: false},
            {text: 'Sahara', correct: false},
            {text: 'Antarctica', correct: true},
        ]
    },
    {
        question: 'Which is the smallest continent in the world?',
        answers:[
            {text: 'Asia', correct: false},
            {text: 'Austraila', correct: true},
            {text: 'Arctic', correct: false},
            {text: 'Africa', correct: false},
        ]
    },
];

const questionElement = document.querySelector('#question')
const answerButtons = document.querySelector('.answer-buttons')
const nextButton = document.querySelector('#next-btn')
const SimpleTime = document.querySelector('.Simple-time')
const questionIndex = document.querySelector('.questionIndex')
const SimpleNumber = document.querySelector('.Simple-number')

let currentQuestionIndex = 0;
let score = 0;
let setTime 
let setTimeOut

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next'
    showQuestion();
    TimeOut()
}

function showQuestion(){
    resetState()
    SimpleNumber.innerHTML = 15
    setTime =  setInterval(()=>{
        SimpleNumber.innerHTML--
    },1000)
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
    questionIndex.innerHTML = questionNo + ' ' + ' of ' + ' ' +  questions.length + ' ' + ' questions'

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
    questionIndex.style.display = 'none'
}

function handleNextButton(){
    clearInterval(setTime)
    clearInterval(setTimeOut)
    TimeOut()
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function TimeOut(){
    setTimeOut = setTimeout(()=>{
        handleNextButton()
    },15000)
}

startQuiz();