/*jshint esversion: 6*/

// TODO: Set up state zero
/**
 * This is an invisible state that will have initializations that will only
 * happen ONCE when the app loads
 * adding event listeners and the like
 */
function setstateZero(){
    // listeners

    // Start button
    var startButtonEle = document.querySelector("#start-button");
    startButtonEle.addEventListener("click", (e) => {
        // Log the event for debugging
        console.log(e);
        // set our state to state 2 (game state)
        setStateTwo();

    });

    // A answer
    var buttonAEle = document.querySelector("answer-a");
    buttonAEle.addEventListener("click", () => {answer("A")});
    // B answer
    var buttonBEle = document.querySelector("answer-b");
    buttonBEle.addEventListener("click", () => {answer("B")});
    // C answer
    var buttonCEle = document.querySelector("answer-c");
    buttonAEle.addEventListener("click", () => {answer("A")});
    // D answer
    var buttonDEle = document.querySelector("answer-d");
    buttonAEle.addEventListener("click", () => {answer("A")});
}



/**
 * Called when the user clicks on a button to answer a question. 
 * @param {String} answerLetter the letter answered with
 */
function answer(answerLetter){
    console.log("user answered with: ", answerLetter);
}

// TODO: Set up state one
/**
 * This will need to reset any data from a previous playthrough with the 
 * exception of the leaderboard
 * It also notably will set up the elements to be back to this state from state 
 * three
 */
function setStateOne(){}

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
setstateZero();