/*jshint esversion: 6*/
//  df@ts-check

/*******************************************************************************
 * Global constants
 ******************************************************************************/

/**
 * The amount of time that we start with on the 
 */
var startingTime = 120;

/**
 * An array of questions for the test. Each question is an object with the 
 * following properties: question, a, b, c, d, and answer
 */
var questions = [ 
    {
        // What the question is
        question: "What are the values you send into functions called?",
        // The answers for each question
        a: "arguments",
        b: "debates",
        c: "aquisitions",
        d: "aggressive negotiations",
        // which answer is correct
        answer: "A"
    },{
        question: "What do you get if you add a number to a string with the plus \"+\" operator?",
        a: "a number",
        b: "an object",
        c: "a string",
        d: "an array",
        answer: "C"
    },{
        question: "how many arguments can you pass into a function?",
        a: "there is no limit",
        b: "the limit is defined by the browser",
        c: "255",
        d: "not enough",
        answer: "B"
    }


    /*
    Template
    {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: ""
    }*/
];

/*******************************************************************************
 * Element references
 ******************************************************************************/

/**
 * An object that holds references to each answer element on the DOM, used for
 * updating their text
 */
var answers = {
    a: document.querySelector("#answer-wrapper-a p"),
    b: document.querySelector("#answer-wrapper-b p"),
    c: document.querySelector("#answer-wrapper-c p"),
    d: document.querySelector("#answer-wrapper-d p")
    
}

var questionEle = document.querySelector("#question");
var timerTextEle = document.querySelector("#time-signiture");

/**
 * A list of the elements for the leaderboard
 */
var leaderBoardEles = [];

/**
 * The element to submit your initials to 
 */
var submitScoreEle = document.querySelector("#submit-score");

var initialsInputEle = document.querySelector("#initials");

/*******************************************************************************
 * Global variables
 ******************************************************************************/

/**
 * The current state the page is in. Should only be 1, 2, or 3 after set up.
 * @type {number}
 */
var currentState = 0;

/**
 * The index in the questions[] array that we are currently at. Will be 
 * @type {number}
 */
var currentQuestionIndex = 0

/**
 * 
 * @type {string}
 */
var currentQuestionText = "The Wheel of Time turns, and Ages come and pass, leaving\
 memories that become legend. Legend fades to myth, and even myth is long \
 forgotten when the Age that gave it birth comes again.";

 /**
  * The text to display for answer A 
  * @type {string}
  */
var answerA = "Aes Sedai";
 /**
  * The text to display for answer B
  * @type {string}
  */
var answerB = "Asha'man";
 /**
  * The text to display for answer C 
  * @type {string}
  */
var answerC = "The Two Rivers";
 /**
  * The text to display for answer D 
  * @type {string}
  */
var answerD = "The three-fold land";

/**
 * The answer that is considered correct for the current question. Should only 
 * be "A", "B", "C", or "D"
 */
var correctAnswer = "";

/**
 * The number of seconds remaining in the quiz
 * @type {number} 
 */
var timeRemaining = 0;

/**
 * The text to display on the timer. Should only be set using 
 * convertTimeSignature(). 
 * @type {string}
 */
var timerText = "00:00:00";

/**
 * Placeholder for the timer's ID made by setInterval();
 */
var timerID;

/**
 * All the elements that need to be made visible for us to be in state one
 * @type {Element[]}
 */
var stateOneEles = [];

 /**
  * All the elements that need to be made visible for us to be in state two
  * @type {Element[]}
  */
var stateTwoEles = [];
 
 /**
  * All the elements that need to be made visible for us to be in state three
  * @type {Element[]}
  */
 var stateThreeEles = [];

/**
 * The player's score at the end.
 * @type {number}
 */
var playerScore = 0;

/**
 * The type of the 
 * @type {string}
 */
var playerInitials = "";

var leaderboard = [
    {
        initials: 'JVB',
        score: 700,
    },
    {
        initials: 'JVB',
        score: 600,
    },
    {
        initials: 'JVB',
        score: 500,
    },
    {
        initials: 'JVB',
        score: 400,
    },
    {
        initials: 'JVB',
        score: 300,
    },
]
/*******************************************************************************
 * Global Functions 
 ******************************************************************************/

/**
 * This is the initialization function that runs at the beginning. It sets up 
 * all needed references and puts on all relevant listeners.
 */
function init(){
    // state 1

    // Start button
    var startButtonEle = document.querySelector("#start-button");
    startButtonEle.addEventListener("click", (e) => {
        // set our state to state 2 (game state) to start the game
        setState(2);
    });

    // push the element into the array
    stateOneEles.push(startButtonEle);
    // stateOneEles.push(document.querySelector("#title"));

    // state 2

    // A answer
    var buttonAEle = document.querySelector("#answer-a");
    
    buttonAEle.addEventListener("click", () => {answer("A")});
    // B answer
    var buttonBEle = document.querySelector("#answer-b");
    buttonBEle.addEventListener("click", () => {answer("B")});
    // C answer
    var buttonCEle = document.querySelector("#answer-c");
    buttonCEle.addEventListener("click", () => {answer("C")});
    // D answer
    var buttonDEle = document.querySelector("#answer-d");
    buttonDEle.addEventListener("click", () => {answer("D")});

    // push relevant elements onto the array.

    // timer
    stateTwoEles.push(document.querySelector("#timer-wrapper"))

    // questions/answers
    stateTwoEles.push(document.querySelector("#question"));

    stateTwoEles.push(buttonAEle);
    stateTwoEles.push(document.querySelector("#answer-wrapper-a p"));
    stateTwoEles.push(buttonBEle);
    stateTwoEles.push(document.querySelector("#answer-wrapper-b p"));
    stateTwoEles.push(buttonCEle);
    stateTwoEles.push(document.querySelector("#answer-wrapper-c p"));
    stateTwoEles.push(buttonDEle);
    stateTwoEles.push(document.querySelector("#answer-wrapper-d p"));

    // state 3

    // push the leader board elements on 
    leaderBoardEles.push(document.querySelector("#score-1"));
    leaderBoardEles.push(document.querySelector("#score-2"));
    leaderBoardEles.push(document.querySelector("#score-3"));
    leaderBoardEles.push(document.querySelector("#score-4"));
    leaderBoardEles.push(document.querySelector("#score-5"));

    // event listener for submitting your score
    submitScoreEle.addEventListener("click", ()=>{
        playerInitials = convertInitials(initialsInputEle.value);
        submitScore();
    });

    // add all of the leaderboard eles to state 3 eles
    leaderBoardEles.forEach((value) => {
        stateThreeEles.push(value);
    })

    stateThreeEles.push(submitScoreEle);
    stateThreeEles.push(initialsInputEle);
    // everything is done! Set the state to be state one
    setState(1);
}

/**
 * Called when the user clicks on a button to answer a question. Will resolve if
 * the user clicked the correct answer or not.
 * @param {String} answerLetter the letter answered with
 */
function answer(answerLetter){
    console.log("user answered with: " + answerLetter);
    if (answerLetter == correctAnswer){
        questionCorrect();
        return;
    }
    questionIncorrect();
}

// TODO: Set up state one

/**
 * 
 * @param {number} stateNumber which state we are setting it to (1,2,3)
 */
function setState(stateNumber){
    console.log("setting state: " + stateNumber);
    switch (stateNumber){
        case 1:
            setNotVisible(stateTwoEles);
            setNotVisible(stateThreeEles);
            setVisible(stateOneEles);
        break;
        case 2: 
            setNotVisible(stateOneEles);
            setNotVisible(stateThreeEles);
            setVisible(stateTwoEles);
            currentQuestionIndex = 0;
            setQuestion(questions[0]);
            startTimer();
        break;
        case 3: 
            setNotVisible(stateOneEles);
            setNotVisible(stateTwoEles);
            setVisible(stateThreeEles);
        break;
        default: throw "current state is not a defined number!";
    }

    updateDOM();
}

/**
 * Sets all elements in the array to be visible
 * @param {Element[]} elements 
 */
function setVisible(elements){
    elements.forEach((element) => {
        // TODO: check if this actually is wrong
        element.style.display = "";
    })
}

/**
 * Sets all elements in the array to not be displayed
 * @param {Element[]} elements 
 */
function setNotVisible(elements){
    elements.forEach((element) => {
        element.style.display = "none";
    });
}


/**
 *  Updates all DOM values as is appropriate
 */
function updateDOM(){
    
    questionEle.textContent = currentQuestionText
    answers.a.textContent = answerA;
    answers.b.textContent = answerB;
    answers.c.textContent = answerC;
    answers.d.textContent = answerD;

    // need to update the text for the timer with a conversion function
    timerText = convertTimeSignature(timeRemaining);
    timerTextEle.textContent = timerText;

    // scores
    for (var i = 0; i < leaderboard.length; i++){
        var currEle = leaderBoardEles[i];
        var currScore = leaderboard[i];
        currEle.textContent = currScore.initials + "     " + currScore.score;
    }   
}
/**
 * This will need to reset any data from a previous playthrough with the 
 * exception of the leaderboard
 * It also notably will set up the elements to be back to this state from state 
 * three
 */
function setStateOne(){
    currentState = 1;
}

// TODO: Set up state two
/**
 * This will switch all the elements from state one to state two
 * It will also set up the first question and start the timer
 */
function setStateTwo(){}

// TODO: Make a data format for questions

// TODO: setQuestion() function

/**
 * Sets the current question to be the one given as an argument, must be a 
 * member of questions[]
 * @param {object} question 
 */
function setQuestion(question){
    // sets the varibles from the question
    answerA = question.a;
    answerB = question.b;
    answerC = question.c;
    answerD = question.d;
    currentQuestionText = question.question;
    correctAnswer = question.answer;

    // pushing them to the DOM
    updateDOM();
}

// TODO: questionCorrect() function

/**
 * Called if the user answers the question correctly
 */
function questionCorrect(){
    console.log("questionCorrect()");
    if (currentQuestionIndex >= questions.length){
        endGame();
    } else {
        nextQuestion();
    }
}

/**
 * Called if the user answers the question incorrectly
 */
function questionIncorrect(){
    console.log("questionIncorrect()")
    // lose 5 seconds on the timer
    timeRemaining -= 5;

    // also hit their score more for guessing wrong! MUAHAHAHAHAHA
    playerScore -= 20;
}


/**
 * Updates us to the next question. If we are out of questions, end the game
 */
function nextQuestion(){
    currentQuestionIndex++;
    if (!(currentQuestionIndex < questions.length)){
        endGame();
        return;
    }
    setQuestion(questions[currentQuestionIndex]);
}


// TODO: Set up state three
/**
 * This will switch all the elements from state two to state three. 
 * It should record the timer's time remaining
 * It should calculate the current score given what has happened
 * It should calculate the place the person is in on the leaderboard
 */
function setStateThree(){}

// TODO: addScore() function

// TODO: idea: set the title to be the time remaining

/**
 * Starts the timer when we enter state2
 */
function startTimer(){
    console.log("starting timer");
    // reset the time remaining to be appropriate
    timeRemaining = startingTime;
    // propogate value to the DOM
    updateDOM();
    // This is our countdown function
    timerID = setInterval(()=>{
        // if we've run out of time get us out of here!
        if (timeRemaining < 1) {
            endGame();
            return;
        }

        // otherwise decrement the timer
        timeRemaining--;
        // and update the DOM
        updateDOM();
    }, 1000);
}

/**
 * Stops the timer and takes any other appropriate actions;
 */
function stopTimer(){   
    clearInterval(timerID);
}   

/**
 * Ends the game and calculates the player's score. Will then send them to
 * state 3
 */
function endGame(){
    console.log("endGame()");
    stopTimer();
    setScore();
    setState(3);
}

/**
 * Calculates the player's score and sends it to the DOM
 */
function setScore(){
    // give the player a bonus for finishing faster
    playerScore += timeRemaining * 5;
    // debugging
    console.log("player score: " + playerScore);
    // send the info where it belongs
    updateDOM();
}

/**
 * Returns a string in the fomrat "hours:minutes:seconds"
 * @param {number} seconds how many seconds to convert
 */
function convertTimeSignature(seconds){
    var hours = Math.floor(seconds/3600);
    var minutes = Math.floor((seconds - (hours * 3600))/60);
    var endingSeconds = seconds - ( (hours * 3600) + (minutes * 60) );

    var hoursStr;
    var minutesStr;
    var secondsStr;

    if (hours < 10){
        hoursStr = "0" + hours;
    } else {
        hoursStr = "" + hours;
    }

    if (minutes < 10){
        minutesStr = "0" + minutes;
    } else {
        minutesStr = "" + minutes;
    }
    if (endingSeconds < 10){
        secondsStr = "0" + endingSeconds;
    } else {
        secondsStr = "" + endingSeconds;
    }

    return (hoursStr + ":" + minutesStr + ":" + secondsStr);
}

/**
 * Converts a string to be a valid score
 * @param {String} input 
 * @returns {string} the first 3 characters of the string if applicable
 */
function convertInitials(input){
    if (input.length > 3){
        return input.substring(0,3).toUpperCase();
    }
    return input.toUpperCase();
}

/**
 * Submits the player's current score to the scoreboard
 */
function submitScore(){
    console.log("Submitting score: "+ playerScore + " with initials: " + playerInitials);
    // if the score is too low to be on the leader board we are done
    if (playerScore < leaderboard[leaderboard.length - 1]){
        return;
    }

    // if we are bigger than all, we deserve to be at the top!
    if (playerScore > leaderboard[0]){
        leaderboard.pop();
        leaderboard.unshift({
            score: playerScore,
            initials: playerInitials
        });
    }

    // iterate through the leaderboard array
    for (var i = 0; i < leaderboard.length; i++){
        // if we are greater than the current index, we need to be one above it
        // this also favors older scores to newer ones
        if (playerScore > leaderboard[i].score){
           
            addScore(i);
            // we are done! lets not do that again
            break;
       }
    }
    updateDOM();
    // TODO: local storage
}

/**
 * Adds the current score to the scores array at a given index
 * @param {number} index the index we are inserting the score to
 */
function addScore(index){
    console.log("adding the score into position: " + index);
    // kick the smallest guy off
    leaderboard.pop()
    // add currentone in
    leaderboard.splice(index, 0, {
        initials: playerInitials,
        score:playerScore,
    });
}
// everything is set up lets run this puppy!
init();
