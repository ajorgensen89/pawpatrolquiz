/** Fixed score and question total value */
const MAX_SCORE = 1;
const MAX_QUESTIONS = 10;

/**Query selector used to targert either class/id */
let question = document.querySelector("#question");
let choices = Array.from(document.querySelectorAll(".choice-box"));
let progressName = document.querySelector("#progress-name");
let scoreTotal = document.querySelector('#score');
let wrongScore = document.querySelector("#wrong");
let endScore = document.querySelector("#end-score");

/**To store previous score for user at the top of the page if they choose to try the quiz again */
let previousScore = localStorage.getItem("previousScore");

/** variable created to iterate through quiz array of numberOfQuestions */
let actualQuestion = {};
let otherQuestions = [];
/**Setting 0 value for variables to start */
let score = 0;
let wrong = 0;
let questionCount = 0;


/**remove default false start to checking the quiz answer */
let checkAnswer = true;

/** Iterating Questions. All with 3 choices and the answer(read by data-number 1,2 or 3 in HTML) */
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
    },
    {
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
        question: "What colour clothing does Rubble mostly wear?",
        choice1: "Red",
        choice2: "Orange",
        choice3: "Yellow",
        answers: 3,
    },
    {
        question: "What colours are the clothing Rocky mostly wear?",
        choice1: "Blue",
        choice2: "Red",
        choice3: "Green",
        answers: 3,
    },
    {

        question: "What is the name of the Red Dragon in Paw Patrol, Rescue Knights?",
        choice1: "Sparks",
        choice2: "Flames",
        choice3: "Ignites",
        answers: 1,
    },
];

/*Credit to https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2996s included in README.md*/
/**Start the quiz function*/
let startGame;

startGame = () => {
    questionCount = 0;
    score = 0;
    /**Spread operator to get any values from numberOfQuestions */
    otherQuestions = [...numberOfQuestions];
    getNextQuestion();
    console.log("start game");
};

/**To get new question function*/
let getNextQuestion;

getNextQuestion = () => {
    if (otherQuestions.length === 0 || questionCount >= MAX_QUESTIONS) {
        /**Track score. Add +1 to score for each correct answer*/
        localStorage.setItem("previousScore", score);
        /**Go to this html page */
        console.log("get next qu");
        return window.location.assign("quiz.html");
    }
    /**Question counter  */
    questionCount++;
    progressName.textContent = `Question ${questionCount} of ${MAX_QUESTIONS}`;
    console.log("questionCount area");
    /**Track the question the user is currently on and create quesion index for iterating*/
    let questionId = Math.floor(Math.random() * otherQuestions.length);
    actualQuestion = otherQuestions[questionId];
    question.textContent = actualQuestion.question;
/**Parameter to set data-type(number), from HTML sections that hold the choices*/
    choices.forEach(choice => {
        let number = choice.dataset["number"];
        choice.textContent = actualQuestion["choice" + number];
        console.log("choices");
    });
    /**Enter new */
    otherQuestions.splice(questionId, 1);

    checkAnswer = true;
};
/**Change text content to equal new value */
endScore.textContent = previousScore;

/**click event for correct scores */
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!checkAnswer) return
        /**Check user answer against javascript quiz array answer */
        checkAnswer = false;
        let selectedChoice = e.target;
        let selectedAnswer = selectedChoice.dataset["number"];
        let classToApply = selectedAnswer == actualQuestion.answers ? "correct" : "incorrect";
        /**Score is incremented */
        if (classToApply === 'correct') {
            /**iterate questions until MAX_SCORE is met. (5)*/
            incrementScore(MAX_SCORE);
            console.log("correct zone");
            correctImageScore();
        }
        /**Incorrect score is incremented */
        if (classToApply === 'incorrect') {
            badScore(MAX_SCORE);
            incorrectImageScore();
            console.log("incorrect zone");
        }
        selectedChoice.parentElement.classList.add(classToApply);
        /**Time to show the correct selection and then iterate next question. Removing class of correct/incorrect each time.*/
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNextQuestion();
            console.log("time out");
            /**Set time count */
        }, 1000);
    });
});

/**increases score of quiz when correct answer is selected */
let incrementScore;
incrementScore = num => {
    score += num;
    scoreTotal.textContent = score;
    console.log("increase score durring quiz");
};

/**increaes wrong score when incorrect answer is selected */
let badScore;
badScore = num => {
    wrong += num;
    wrongScore.textContent = wrong;
    console.log("wrong increased!!");
};

/**Call start quiz function */
startGame();

/** Function to show image for correct score. Credit to www.moonbooks.org in README.md */
function correctImageScore() {
/**Getting image from source */
    let img = document.createElement("img");
    img.src = "./assets/images/quiz-images/yesPupCP.png";
    let imageBlock1 = document.getElementById("yes-pup");
    /**If statment for correct image used */
    if (score) {
        imageBlock1.appendChild(img);
        console.log("image1");
    }
    console.log("6");
}

/** Function to show image for incorrect score. Credit to www.moonbooks.org in README.md */
function incorrectImageScore() {
/**Getting image from source */
    let img = document.createElement("img");
    img.src = "./assets/images/quiz-images/NoPupCP.png";
    let imageBlock2 = document.getElementById("no-pup");
     /**If statment for correct image used */
    if (wrong) {
        imageBlock2.appendChild(img);
        console.log("image2");
    }
    console.log("7");
}