// Establish an array of 5 objects with properties composed of quiz question, multiple choices and correct answer

const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include?",
        A: "Strings",
        B: "Alerts",
        C: "Booleans",
        D: "Numbers",
        correct: "B",
    },
    {
        question: "The condition in an if/else statement is enclosed within _.",
        A: "Parentheses",
        B: "Curly Brackets",
        C: "Quotes",
        D: "Square Brackets",
        correct: "A",
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.",
        A: "Quotes",
        B: "Curly Brackets",
        C: "Commas",
        D: "Parentheses",
        correct: "A",   
    },
    {
        
        question: "Arrays in JavaScript can be used to store __.",
        A: "Numbers and Arrays",
        B: "Other Arrays",
        C: "Booleans",
        D: "All of the Above",
        correct: "D",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        A: "Javascript",
        B: "Terminal/Bash",
        C: "Console Log",
        D: "For Loops",
        correct: "C",
    },
];


const timerEl = document.getElementById("countdown");
const finalScore = document.getElementById("final-score");

let time = quizQuestions.length * 20;
let interval = setInterval(countDown, 1000);


function countDown() {
    time--;
    showClock();
    if (time < 1) {
        finishedQuiz();
    }
}

function showClock() {
    timerEl.innerText = time;
}


const quiz = document.getElementById("quiz");

quiz.removeAttribute("hidden");


const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("A-question")
const b_text = document.getElementById("B-question");
const c_text = document.getElementById("C-question");
const d_text = document.getElementById("D-question");


let currentQuiz = 0;

beginQuiz();

function beginQuiz() {
    removeUnselected();

    const quizQ = quizQuestions[currentQuiz];

    questionEl.innerText = quizQ.question;
    a_text.innerText = quizQ.A;
    b_text.innerText = quizQ.B;
    c_text.innerText = quizQ.C;
    d_text.innerText = quizQ.D;
}


function removeUnselected() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// User clicks on radio button and those checked radio buttons are defined by below function
function selectAnswer(){
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}


const scoreBoard = document.getElementById("score-contain");
const confirmAnswer = document.getElementById("answer");
const submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener("click", () => {
    let answer = selectAnswer();
    if (answer) {
        if (answer === quizQuestions[currentQuiz].correct) {
            confirmAnswer.innerText = "Correct!";
        } else {
            time = time - 20;
            confirmAnswer.innerText = "Incorrect!";
        }
        currentQuiz++;
        if (currentQuiz < quizQuestions.length) {
            beginQuiz();
        } else {
            finishedQuiz();
        }
    }
})


function finishedQuiz() {
    clearInterval(interval);
    quiz.setAttribute("hidden", true);
    scoreBoard.removeAttribute("hidden");
    finalScore.innerText = time;
}

const initials = document.getElementById("initials-form");
const storeBtn = document.getElementById("score-submit");
const initialsEl = document.getElementById("initials-form");
const leads = document.getElementById("leader-contain");
const highScores = document.getElementById("scores");
  
  storeBtn.addEventListener("click", storeScores);
  
  function storeScores(event) {
    
    
    event.preventDefault();
  
    
    if (!initialsEl.value) {
      alert("Don't forget to submit your initials");
      return;
    }
  

    const leaderboardProperties = {
      initials: initialsEl.value,
      score: finalScore.innerHTML,
    };

    updateCurrentLeader(leaderboardProperties);
  
    scoreBoard.setAttribute("hidden", true);
    leads.removeAttribute("hidden");
  
    renderLeaderboard();
  }
  

  function updateCurrentLeader(leaderboardProperties) {

    let leaderArray = getLeaderboard();

    leaderArray.push(leaderboardProperties);


    localStorage.setItem("leaderArray", JSON.stringify(leaderArray));
  }
  

  function getLeaderboard() {

    let storedScores = localStorage.getItem("leaderArray");
    if (storedScores!== null) {

    
    let leaderArray = JSON.parse(storedScores);
      return leaderArray;
    } else {
      leaderArray = [];
    }
    return leaderArray;
  }
  
  
  function renderLeaderboard() {

    let orderLeaderArray = sortLeaderboard();

    highScores.innerHTML = "";
    
    for (let i = 0; i < orderLeaderArray.length; i++) {
      let submittedLeader = orderLeaderArray[i];
      let updatedLeader = document.createElement("li");
      updatedLeader.textContent = submittedLeader.initials + " - " + submittedLeader.score;
      highScores.append(updatedLeader);
    }
  }
  

  function sortLeaderboard() {
    let leadsArray = getLeaderboard();
    if (!leadsArray) {
      return;
    }
  
    leadsArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leadsArray;
  }
  

  const clearScoreButton = document.getElementById("clear-button");

  clearScoreButton.addEventListener("click", clearButton);
  
  function clearButton() {
    localStorage.clear();
    renderLeaderboard();
  }