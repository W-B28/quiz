
const username = document.getElementById('usernameForm');
const providersForm= document.getElementById('providersForm');
const programNameForm = document.getElementById('programNameForm');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;

  // ??? || saveScoreBtn.disabled = !providersForm.value;

  //make providersType && programName required;

});

// saveHighScore = event => {
//   e.preventDefault();
//   console.log("Clicked Button");
// }
