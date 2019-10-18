// TO DO:
// END SCREEN DESIGN AND FUNCTION DEFINITION
// MAKE START SCREEN AND QUIZ IN ONE HTML FILE


const question = document.getElementById('root-question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreDisplay = document.getElementById('scoreDisplay');
const progressBarDisplay = document.getElementById('progessBar');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

const CORRECT_BONUS = 100;
let MAX_QUESTIONS = 3;
// Make MAX_QUESTIONS selectable by user at start

// Generate a clock to count

let time = 0;
let timer;
// Set TIME_BONUS multiplier for time added to the clock
// TIME_BONUS should be a higher multipler for lower timed scores,
// and lower multiplier for higher timed scores
// start temp variable for start and end time
let TIME_BONUS;

// set a fixed bonus to score for answering all the questions correct

let PEFECTION_BONUS;

// set a consecutive correct questions bonus
let CONSECUTIVE_CORRECT_BONUS;




startGame = () => {
  questionCounter = 0;
  score = 0;
  time = 0;
  availableQuestions = [...questions];

  let incrementTime = () => {
    time++;
    document.getElementById('time-display').innerHTML = time;
  }
  timer = setInterval(incrementTime, 900);
};



getNewQuestion = () => {
const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  $(".choice-container").css("background","white");

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

// splice currentQuestion out of availableQuestions pool to prevent repeats
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
  questionCounter++ ;

  // increment progessBar percent for each question attempted
  let progressPercent = progressBarDisplay.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  progressBarDisplay.innerText = '%';

};


choices.forEach( choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      if(classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
        TIME_BONUS = CORRECT_BONUS + parseInt((1/time));
        console.log(TIME_BONUS);
      }

    // selectedAnswer.parentElement.classList.add(classToApply)


    if(selectedAnswer == currentQuestion.answer) {

      $("#" + selectedAnswer).css("background-color","ForestGreen");
      // use JS to dynamically create a "feedback div" that includes
      // green checkmark with short answer description plus reference (+link list to archive for review?)
    } else {
      $("#" + selectedAnswer).css("background-color","red");
      // use JS to dynamically create a "feedback div" that includes
      // red X with short answer description plus reference (+link to archive list for review?)
    }
      // for a setTimeOut (to prevent multiple selectedAnswers)

    setTimeout(function(){
      if( availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        let endTime = () => {
          clearInterval(timer);
        }

        localStorage.setItem('mostRecentScore', score);
        // tally bonuses to high score
        // if top 10 prompt user for ID info to record best performances
        // refer user to list of references / short descriptions of submitted answers
        return window.location.assign('endgame.html');

      } else {

        getNewQuestion();
      }
    }, 1000);
  })
});

incrementScore = num => {
  score += Math.floor(num + (1/parseInt(time) * 50));
  scoreDisplay.innerText = score;
}

startGame();
// getting error when restart game and getNewQuestion() is called when questionIndex is null
 //add eventlistener on play again button???
getNewQuestion();
