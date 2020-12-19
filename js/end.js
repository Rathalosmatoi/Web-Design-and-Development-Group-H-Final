//Nathan Fitzgerald//
const username = document.querySelector('#username')
const saveScorebtn = document.querySelector('#saveScorebtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
