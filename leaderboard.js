
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById("highScoresList");

console.log(highScores);

highScoresList.innerHTML = highScores
.map(score => {
  return `<li class="high-score">${score.score} ${score.name} ${score.program}</li>`;
})
.join("");

console.log(highScoresList)

// ${score.provider}
