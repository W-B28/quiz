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

let questions = [
  {
    question: "How many moons does Jupiter have?",
    choice1: "4",
    choice2: "14",
    choice3: "27",
    choice4: "67",
    answer: 4
  },

  {
    question: "What is the longest continuous time a human has spent in space?",
    choice1: "167 days",
    choice2: "114 days",
    choice3: "437 days",
    choice4: "713 days",
    answer: 3
  },

  {
    question: "The hottest place in the universe is located in which constellation?",
    choice1: "Virgo",
    choice2: "Pisces",
    choice3: "Hercules",
    choice4: "Orion",
    answer: 1
  },
  {
    question: "What is is the farthest individual star ever seen?",
    choice1: "Sirus",
    choice2: "Icarus",
    choice3: "Vega",
    choice4: "Thuban",
    answer: 2
  },
  {
    question: "What is the closest planet to earth where it rains diamonds?",
    choice1: "Venus",
    choice2: "Mercury",
    choice3: "Jupiter",
    choice4: "Saturn",
    answer: 3
  }
];

let availableQuestions = [...questions];


fetch("astronomy.json").then(res => {
  return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
});

const CORRECT_BONUS = 100;
let MAX_QUESTIONS = 5;
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

// let PEFECTION_BONUS;
// set a consecutive correct questions bonus
// let CONSECUTIVE_CORRECT_BONUS;




startGame = () => {
  questionCounter = 0;
  score = 0;
  time = 0;
  // availableQuestions = [...questions];

  let incrementTime = () => {
    time++;
    document.getElementById('time-display').innerText = time;
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


getNewQuestion();
// startGame();
