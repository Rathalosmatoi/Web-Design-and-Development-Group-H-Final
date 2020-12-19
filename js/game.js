//Nathan Fitzgerald//
const question = document.querySelector('#question')
//nutureal way of doinging thing, still tagerts if I change ID or class 
const choices = Array.from(document.querySelectorAll('.choice-text'))
//stores variables and calling them forth
const progressText = document.querySelector('#progressText') 
const scoreText = document.querySelector('#score')
const progressBarfull = document.querySelector('#progressBarfull') 

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//check spellings
//random element, questions are given out to the player in a randomised order.
let questions = [
    {
        question: "Which of these where the First, Nature Documentries?",
        choice1: "Nanook of the North",
        choice2: "True-Life Adventures",
        choice3: "The Sixth Continent",
        choice4: "The Silent World",
        answer: 2,
    },
    {
        question: "What is the fastest Animal in the World?",
        choice1: "Peregrine Falcon",
        choice2: "Sword Fish",
        choice3: "Brown Hare",
        choice4: "Cheetah",
        answer: 1,
    },
   {
        question: "What year was the first ever, photograph of the Giant Squid taken?",
        choice1: "1995",
        choice2: "2004",
        choice3: "2010",
        choice4: "2013",
        answer: 2,
    },
    {
        question: "Which one of these rare animals only eat seaweed?",
        choice1: "Marine Iguana",
        choice2: "Eurasian Otter",
        choice3: "Yeti Crab ",
        choice4: "Vampire Squid",
        answer: 1,
    },
    {
        question: "Which of these animals has the strongest Bite force?",
        choice1: "Siberain Tiger",
        choice2: "Great White Shark",
        choice3: "Salt Water Crocodile",
        choice4: "Polar Bear",
        answer: 3,
    },
   {
        question: "When was the First Camera Invented?",
        choice1: "1598",
        choice2: "1685",
        choice3: "1743",
        choice4: "1814",
        answer: 2,
    },
    {
        question: "Which of these big cats can't roar?",
        choice1: "Jaguar",
        choice2: "Tiger",
        choice3: "Lion",
        choice4: "Cheetah",
        answer: 4,
    },
    {
        question: "Which of these are the smartest Animals in the world?",
        choice1: "Elephant",
        choice2: "Orangutan",
        choice3: "Chimpanzee",
        choice4: "Dolphin",
        answer: 3,
    },
    {
        question: "How many Animals are in Dublin Zoo?",
        choice1: "90",
        choice2: "160",
        choice3: "280",
        choice4: "400",
        answer: 4,
    },
    {
        question: "Which magizine featured the First ever Wild Life Photo?",
        choice1: "Zoobooks",
        choice2: "BBC WildLife",
        choice3: "National Geographic",
        choice4: "National Wildlife",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] //spread operator 
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('End.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` 
    progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    //Question 1,2,3, 4, adding one each time
    //calculates what question it's on.

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    //calculates question
    //keeps track what question that the player is on
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'choice-container-correct' : 'choice-container-incorrect'
        //will toggle css for progress bar. red for inccorect, green for correct

        if(classToApply === 'choice-container-correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()