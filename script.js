const questions=[
    {
        question:"which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: "false"},
            { text: "Blue whale", correct: "true"},
            { text: "Elephant", correct: "false"},
            { text: "Lion", correct: "false"},
        ]
    },
    {
       question:"which is Smallest continent in the world?",
        answers: [
            { text: "Asia", correct: "false"},
            { text: "Australlia", correct: "true"},
            { text: "Arctic", correct: "false"},
            { text: "Africa", correct: "false"},
        ] 
    },
     {
       question:"which is largest desart in the world?",
        answers: [
            { text: "Kalahari", correct: "false"},
            { text: "Gobi", correct: "false"},
            { text: "Sahara", correct: "false"},
            { text: "Antarctica", correct: "true"},
        ] 
    },
     {
       question:"which is the first Solar village in Karnataka?",
        answers: [
            { text: "Halady", correct: "false"},
            { text: "Rattady", correct: "false"},
            { text: "Amasebail", correct: "true"},
            { text: "Nitte", correct: "false"},
        ] 
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
         currentQuestionIndex=0;
         score=0;
         nextButton.innerHTML="Next";
         showQuestion();
}
function showQuestion(){
       resetState();
         let currentQuestion=questions[currentQuestionIndex];
         let questionNo=currentQuestionIndex + 1;
         questionElement.innerHTML=questionNo + ". "+currentQuestion.question;

         currentQuestion.answers.forEach(answer=>{
            const button=document.createElement("button");
            button.innerHTML=answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if(answer.correct){
                button.dataset.correct=answer.correct;
            }
            button.addEventListener("click",selectAnswer);
         });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";


}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz()
    }
})

startQuiz();