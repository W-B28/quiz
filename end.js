
const username = document.getElementById('usernameForm');
const providers = document.getElementById('providersForm');
const programName = document.getElementById('programNameForm');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value

  // ??? || saveScoreBtn.disabled = !providersForm.value;

  //make providersType && programName required;
  // && !providers.value && !programName.value;

});

saveHighScore = e => {
  e.preventDefault();

  const score = {
    name: username.value,
    score: mostRecentScore,
    provider: providers.value,
    program: programName.value
  };
  highScores.push(score);
  console.log(highScores);
};

saveScoreBtn.addEventListener("click", saveHighScore);
