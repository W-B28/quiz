// TO DO:
// END SCREEN DESIGN AND FUNCTION DEFINITION
// MAKE START SCREEN AND QUIZ IN ONE HTML FILE


const question = document.getElementById('root-question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

  {
    question: 'How many moons does Jupiter have?',
    choice1: '4',
    choice2: '14',
    choice3: '27',
    choice4: '67',
    answer: 4
  },

  {
    question: 'What is the longest continuous time a human has spent in space?',
    choice1: '167 days',
    choice2: '114 days',
    choice3: '437 days',
    choice4: '713 days',
    answer: 3
  },

  {
    question: 'The hottest place in the universe is located in which constellation?',
    choice1: 'Virgo',
    choice2: 'Pisces',
    choice3: 'Hercules',
    choice4: 'Orion',
    answer: 1
  },
];

// const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
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

  availableQuestions.splice(questionIndex, 1);

  // acceptingAnswers = true;
  questionCounter++ ;

};

// DEFINE HERE A function for end screen generation

choices.forEach( choice => {
  choice.addEventListener('click', e => {
    // if(!acceptingAnswers) return;
// setTimeOut to delay
    // acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    if(selectedAnswer == currentQuestion.answer) {
      score++;
      $("#" + selectedAnswer).css("background-color","ForestGreen");
    } else {
      $("#" + selectedAnswer).css("background-color","red");
    }
    setTimeout(function(){
      if( availableQuestions.length === 0 ) {
        console.log('Quiz Ended');
        // function to go to end screen
      } else {
        getNewQuestion();
      }
    },150);
  })
});

startGame();
getNewQuestion();
