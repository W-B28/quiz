
const username = document.getElementById('usernameForm');
const providers = document.getElementById('providersForm');
const programName = document.getElementById('programNameForm');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
finalScore.innerText = mostRecentScore;

const MAXIMUM_HIGHSCORES = 5;


username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value

  // ??? || saveScoreBtn.disabled = !providersForm.value;

  //make providers && programName required;
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
  highScores.sort( (a,b) =>  b.score - a.score);
  highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));

// GO to leaderboard later then reassign to index from leaderboard
window.location.assign('index.html')
};

saveScoreBtn.addEventListener("click", saveHighScore);
