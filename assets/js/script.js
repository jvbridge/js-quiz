/*jshint esversion: 6*/
//  df@ts-check

/*******************************************************************************
 * Global constants
 ******************************************************************************/

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
    }
];

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
 forgotten when the Age that gave it birth comes again";

 /**
  * The text to display for answer A 
  * @type {string}
  */
var answerA = "Aies Sedai";
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
        // Log the event for debugging
        console.log(e);
        // set our state to state 2 (game state) to start the game
        setState(2);
    });

    // push the element into the array
    stateOneEles.push(startButtonEle);
    stateOneEles.push(document.querySelector("#title"));

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

    // everything is done! Set the state to be state one
    setState(1);
}

/**
 * Called when the user clicks on a button to answer a question. Will resolve if
 * the user clicked the correct answer
 * @param {String} answerLetter the letter answered with
 */
function answer(answerLetter){
    console.log("user answered with: ", answerLetter);

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
            setVisible(stateOneEles);
            setNotVisible(stateTwoEles);
            setNotVisible(stateThreeEles);
        break;
        case 2: 
            setVisible(stateTwoEles);
            setNotVisible(stateOneEles);
            setNotVisible(stateThreeEles);
        break;
        case 3: 
            setVisible(stateThreeEles);
            setNotVisible(stateOneEles);
            setNotVisible(stateTwoEles);
        break;
        default: throw "current state is not a defined number!";
    }


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

// TODO: questionCorrect() function

// TODO: questionIncorrect() function

// TODO: nextQuestion() function



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


// everything is set up lets run this puppy!
init();