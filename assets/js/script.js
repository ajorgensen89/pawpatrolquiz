console.log("Fudge");
/** Fixed score and question total value */
const MAX_SCORE = 1;
const MAX_QUESTIONS = 5;
/**Query selector used to targert either class/id */
let question = document.querySelector("#question");
let choices = Array.from(document.querySelectorAll(".choice-box"));
let progressName = document.querySelector("#progress-name");
let scoreTotal = document.querySelector('#score');

let actualQuestion = {};
let checkAnswer = true;
let score = 0;
let questionCount = 0;
let otherQuestions = [];


let numberOfQuestions = [{
        question: "What is naughty Majors name in Paw Patrol who causes problems for the Paw Patrol gang?",
        choice1: "Major Goodway",
        choice2: "Major Humdinger",
        choice3: "Major Johnson",
        answers: 2,
    },
    {
        question: "What name is given to the puppy who wears a blue police unifrom in Paw Patrol?",
        choice1: "Chase",
        choice2: "Rumble",
        choice3: "Tracker",
        answers: 1,
    },
    {
        question: "What is the name of Major Goodways pet chicken?",
        choice1: "Wally",
        choice2: "Chickaletta",
        choice3: "Ryder",
        answers: 2,
    },
    {
        question: "What name is given to the puppy who wears blue Pup Tag with a star on?",
        choice1: "Chase",
        choice2: "Rumble",
        choice3: "Tracker",
        answers: 1,
    },
    {
        question: "Which Major is trying to rule Adventure City in Paw Patrol, The Movie?",
        choice1: "Major Johnson",
        choice2: "Major Humdinger",
        choice3: "Major Goodway",
        answers: 2,
    },
    {
        question: "Which Pup can fly a Helocopter and wears a Pink Uniform?",
        choice1: "Everest",
        choice2: "Zuma",
        choice3: "Skye",
        answers: 3,
    }
];
/**Start the quiz function*/
startGame = () => {
    questionCount = 0;
    score = 0;
    /**Spread operator to get any values from numberOfQuestions */
    otherQuestions = [...numberOfQuestions];
    getNextQuestion();
}
/**To get new question function*/
getNextQuestion = () => {
    if (otherQuestions.length === 0 || questionCount >= MAX_QUESTIONS) {
        /**Track score */
        localStorage.setItem("previousScore", score);
        /**Go to this html page */
        return window.location.assign("end.html");
    }
    
    questionCount++;
    progressName.textContent = `Question ${questionCount} of ${MAX_QUESTIONS}`;
/**Track the question the user is currently on and create quesion index*/
    let questionId = Math.floor(Math.random() * otherQuestions.length);
    actualQuestion = otherQuestions[questionId];
    question.textContent = actualQuestion.question;

    choices.forEach(choice => {
        let number = choice.dataset["number"];
        choice.textContent = actualQuestion["choice" + number];

    });
    otherQuestions.splice(questionId, 1);

    checkAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!checkAnswer) return

        checkAnswer = false;
        let selectedChoice = e.target;
        let selectedAnswer = selectedChoice.dataset["number"];
        let classToApply = selectedAnswer == actualQuestion.answers ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(MAX_SCORE);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNextQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreTotal.textContent = score;
}

startGame();


// function submission(event) {
//     event.preventDefault();
//     let nameStored = document.forms["id"]["name"].value;
//     sessionStorage.setItem("name", nameStored);
//     console.log("username log")
// }
/**Send email function from StackOverflow - see in 'README.md' credits.*/
function sendMail() {
    var link = "ajorgensen89@gmail.com"
             + "?cc=ajorgensen89@gmail.com"
             + "&subject=" + encodeURIComponent("Paw Patrol Quiz")
             + "&body=" + encodeURIComponent(document.querySelector('#my-text').textContent).value;
    ;
    return window.location.assign("back-form.html");
    // window.location.href = "back-form.html";
}