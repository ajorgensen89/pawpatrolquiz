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
        question: "What is the naughty Majors name in Paw Patrol who causes problems for the Paw Patrol gang?",
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
        question: "What name is given to the puppy who wears a blue Pup Tag with a star on?",
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
        question: "Which Pup can fly a Helicopter and wears a Pink Uniform?",
        choice1: "Everest",
        choice2: "Zuma",
        choice3: "Skye",
        answers: 3,
    },
    {
        question: "What is the name of the boy who put together the Mini-Patrol?",
        choice1: "Rex",
        choice2: "Alex",
        choice3: "Andy",
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
        question: "What colour clothing does Rocky mostly wear?",
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
    {

        question: "What Uniform does Marshall wear?",
        choice1: "Doctors",
        choice2: "Firemans",
        choice3: "Detectives",
        answers: 2,
    },
    {

        question: "In Paw Patrol, what sweet treats do Dragons like to eat?",
        choice1: "Candy Canes",
        choice2: "Marshmallows",
        choice3: "Chocolate",
        answers: 2,
    },
    {
        question: "What is the name of the boy in Paw Patrol who gives the puppies their missions?",
        choice1: "Stryder",
        choice2: "Hyda",
        choice3: "Ryder",
        answers: 3,
    },
    {
        question: "What main colour does Zuma wear?",
        choice1: "Black",
        choice2: "Purple",
        choice3: "Orange",
        answers: 3,
    },
    {
        question: "What Sign is on Zuma's Pup Tag?",
        choice1: "Boat",
        choice2: "Anchor",
        choice3: "Fish",
        answers: 2,
    },
    {
        question: "Who says 'Rubble on the double' when ready to take action?",
        choice1: "Zuma",
        choice2: "Marshall",
        choice3: "Rubble",
        answers: 3,
    },
    {
        question: "Who loves snow and is the best at riding a Snowboard?",
        choice1: "Everest",
        choice2: "Tracker",
        choice3: "Skye",
        answers: 1,
    },
    {
        question: "Which Puppy lives in the Mountains when they are not helping the Paw patrol?",
        choice1: "Everest",
        choice2: "Tracker",
        choice3: "Rocky",
        answers: 1,
    },
    {
        question: "Which Puppy lives in the Forest when they are not helping the Paw Patrol?",
        choice1: "Zuma",
        choice2: "Tracker",
        choice3: "Rocky",
        answers: 2,
    },
    {
        question: "What type of animal is named 'Big Hairy' in Paw Patrol?",
        choice1: "Elephant",
        choice2: "Monkey",
        choice3: "Cheetah",
        answers: 2,
    },
    {
        question: "Who's Paw Patrol Truck has big water cannons to help with danger?",
        choice1: "Marshall",
        choice2: "Rubble",
        choice3: "Chase",
        answers: 1,
    },
    {
        question: "Who loves to recycle and make new items out of old objects?",
        choice1: "Skye",
        choice2: "Zuma",
        choice3: "Rocky",
        answers: 3,
    },
    {
        question: "Which Pup loves the Sea and has a car that can change into a boat on the water?",
        choice1: "Tracker",
        choice2: "Zuma",
        choice3: "Everest",
        answers: 2,
    },
    {
        question: "Which of the puppys has purple fur and wears a green and orange outfit?",
        choice1: "Everest",
        choice2: "Chase",
        choice3: "Ryder",
        answers: 1,
    },
    {
        question: "Who drives a Snowmobile?",
        choice1: "Everest",
        choice2: "Marshall",
        choice3: "Rubble",
        answers: 1,
    },
    {
        question: "Who drives a Big Digger?",
        choice1: "Ryder",
        choice2: "Rubble",
        choice3: "Tracker",
        answers: 2,
    },
    {
        question: "Which puppy has big ears to hear far away noises to help track others with?",
        choice1: "Chase",
        choice2: "Rocky",
        choice3: "Tracker",
        answers: 3,
    },
    {
        question: "Whos Pup Tag is green and has a tall white tree on it?",
        choice1: "Marshall",
        choice2: "Everest",
        choice3: "Skye",
        answers: 2,
    },
    {
        question: "Whos Pup Tag is yellow and has a spanner head on it?",
        choice1: "Rocky",
        choice2: "Zuma",
        choice3: "Rubble",
        answers: 3,
    },
    {
        question: "Which puppy gets around in a wheelchair to help others?",
        choice1: "Skye",
        choice2: "Rex",
        choice3: "Everest",
        answers: 2,
    },
    {
        question: "Which Puppy can talk to the Dinosaurs in Paw Patrol, Dino Rescue?",
        choice1: "Chase",
        choice2: "Rex",
        choice3: "Tracker",
        answers: 2,
    },
    {
        question: "What is the name of the robot that drives the Paw Patroller?",
        choice1: "Robo-Pup",
        choice2: "Robo-Ryder",
        choice3: "Robo-Dog",
        answers: 3,
    },
    {
        question: "Which Puppy causes problems for the Paw Patrol in Paw Patrol, Rescue Knights?",
        choice1: "Claw",
        choice2: "Claude",
        choice3: "Chase",
        answers: 1,
    },
    {
        question: "Which Puppys name mean Peace in Arabic?",
        choice1: "Zuma",
        choice2: "Skye",
        choice3: "Rocky",
        answers: 1,
    },
    {
        question: "Where do the Paw Patrol travel to, to become Rescue Knights?",
        choice1: "Adventure Bay",
        choice2: "Barkingburg",
        choice3: "Dino Wilds",
        answers: 2,
    },
    {
        question: "Which Puppy is always clusmy and says 'I'm ok!' when he gets back up?",
        choice1: "Chase",
        choice2: "Rex",
        choice3: "Marshall",
        answers: 3,
    },
    {
        question: "Who is the new puppy the Paw Patrol meet when they travel to the Dino Wilds?",
        choice1: "Everest",
        choice2: "Tracker",
        choice3: "Rex",
        answers: 3,
    },
    {
        question: "Which puppy always responds with 'Ice and Snow, I'm Ready to go?",
        choice1: "Marshall",
        choice2: "Everest",
        choice3: "Rubble",
        answers: 2,
    },
    {
        question: "What is on Rex's Pup Tag?",
        choice1: "Dog footpraint",
        choice2: "Dinosaur footprint",
        choice3: "Frog footprint",
        answers: 2,
    },
    {
        question: "Which Pup's breed is a Bernese Mountain Dog and wears a blue helmet?",
        choice1: "Chase",
        choice2: "Rex",
        choice3: "Rocky",
        answers: 2,
    },
    {
        question: "When ready to rescue, who says 'Let's dino do this!'?",
        choice1: "Rubble",
        choice2: "Skye",
        choice3: "Rex",
        answers: 3,
    },
    {
        question: "What Does Robo-Dog drive through to get the Paw Patrol to the Dino Wilds?",
        choice1: "A waterfall",
        choice2: "A fountain",
        choice3: "A portal",
        answers: 1,
    },
    {
        question: "Who owns the Pet Parlor in Paw Patrol where the Pups visit to help brush their teeth?",
        choice1: "Callie",
        choice2: "Skye",
        choice3: "Katie",
        answers: 3,
    },
    {
        question: "Who lives in a Lighthouse on Seal Island in Paw Patrol?",
        choice1: "Captain Turbot",
        choice2: "Claude",
        choice3: "Ryder",
        answers: 1,
    },
    {
        question: "Who is Captain Turbot's Cousin in Paw Patrol?",
        choice1: "Major Humdinger",
        choice2: "Francois",
        choice3: "Ryder",
        answers: 2,
    },
    {
        question: "Who gets in trouble while taking pictures of wildlife and needs the Paw Patrol to save them?",
        choice1: "Ryder",
        choice2: "Claude",
        choice3: "Captain Turbot",
        answers: 3,
    },
    {
        question: "What is the name of the Farmer in Paw Patrol?",
        choice1: "Bob",
        choice2: "Kal-el",
        choice3: "Al",
        answers: 3,
    },
    {
        question: "Who is Farmer Al's Wife who helps on the farm in Adventure Bay?",
        choice1: "Farmer Goodway",
        choice2: "Farmer Yumi",
        choice3: "Farmer Zuma",
        answers: 2,
    },
    {
        question: "What is the name of Farmers Al's favourite Cow on the farm?",
        choice1: "Bettina",
        choice2: "Bessy",
        choice3: "Millie",
        answers: 1,
    },
    {
        question: "Where do the pups go to when they travel in the Paw Patroller in The Movie?",
        choice1: "Adventure City",
        choice2: "New York City",
        choice3: "Birmingham City",
        answers: 1,
    },
    {
        question: "What is the name of the female sausage dog pup the Team meet in Paw Patrol, The Movie?",
        choice1: "Liberty",
        choice2: "Lindsey",
        choice3: "Lady",
        answers: 1,
    },
    {
        question: "Which character accidently traps people and animals in bubbles when he is scared?",
        choice1: "Wally",
        choice2: "Bettina",
        choice3: "Space Alien",
        answers: 3,
    },
    {
        question: "What is on Liberty's Pup Tag?",
        choice1: "Trees",
        choice2: "Mountains",
        choice3: "Skyscrapers",
        answers: 3,
    },
    {
        question: "Who drives a Scooter in Adventure City?",
        choice1: "Skye",
        choice2: "Liberty",
        choice3: "Everest",
        answers: 2,
    },
    {
        question: "What symbol is on Rocky's pup tag?",
        choice1: "Five pointed Star",
        choice2: "Three arrows in a triangle",
        choice3: "Two pointed arrows on a compass",
        answers: 2,
    },
    {
        question: "Who says 'Green Means Go!' when ready to help?",
        choice1: "Rocky",
        choice2: "Rex",
        choice3: "Ryder",
        answers: 1,
    },
    {
        question: "Whos catchphase is 'Let's drive in!'?",
        choice1: "Skye",
        choice2: "Zuma",
        choice3: "Tracker",
        answers: 2,
    },
    {
        question: "Which pup has big ears and has a catchphase of 'I'm all ears!'?",
        choice1: "Zuma",
        choice2: "Rex",
        choice3: "Tracker",
        answers: 3,
    },
    {
        question: "Who's got a compass on their Pup Tag?",
        choice1: "Chase",
        choice2: "Tracker",
        choice3: "Marshall",
        answers: 2,
    },
    {
        question: "Which puppy did Ryder find in Adventure City when he was very small?",
        choice1: "Rubble",
        choice2: "Marshall",
        choice3: "Chase",
        answers: 3,
    },
    {
        question: "What type of animal is Callie?",
        choice1: "Bird",
        choice2: "Cat",
        choice3: "Elephant",
        answers: 2,
    },
    {
        question: "What is the name of the Island where Captain Turbot and Francois live?",
        choice1: "Seal Island",
        choice2: "Whale Island",
        choice3: "Dolphin Island",
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