const quizSelector = document.getElementById("quiz-selector");
const quizContainer = document.getElementById("quiz-container");
const questionPara = document.getElementById("question");
const answerButtonContainer = document.getElementById(
  "answer-buttons-container"
);
const resultContainer = document.getElementById("result-container");

class Quiz {
  constructor(questions) {
    this.questions = Quiz.shuffleArray(questions);
    this.currentQuestionIndex = 0;
    this.score = 0;
  }
  displayQuestion() {
    answerButtonContainer.innerHTML = "";
    const currentQuestion = this.questions[this.currentQuestionIndex];
    questionPara.textContent = currentQuestion.question;
    const answers = Quiz.shuffleArray(currentQuestion.answers);
    answers.forEach((answer) => {
      const button = document.createElement("button");
      button.classList = ["answer-button"];
      button.textContent = answer;
      button.addEventListener("click", this.checkAnswer.bind(this));
      answerButtonContainer.appendChild(button);
    });
  }
  checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.displayQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
    <h2 id="result-quiz">Quiz Result</h2>
    <p id="score-msg">Your scored ${this.score} out of ${this.questions.length} questions
    <button id="reload-quiz" >Reload All Quiz</button>
    `;
    document.getElementById("reload-quiz").addEventListener("click", () => {
      quizContainer.style.display = "none";
      resultContainer.style.display = "none";
      quizSelector.style.display = "flex";
    });
  }

  static shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}

const loadQuiz = (questions) => {
  const quiz = new Quiz(questions);
  quiz.displayQuestion();
  quizContainer.style.display = "block";
  quizSelector.style.display = "none";
};

const loadAllQuiz = async () => {
  const response = await fetch("./quizzes.json");

  const quizzes = await response.json();
  quizzes.forEach((quiz, index) => {
    const quizCard = document.createElement("div");
    quizCard.classList = ["quiz-card"];
    quizCard.innerText = "Quiz " + (index + 1);
    quizCard.addEventListener("click", () => loadQuiz(quiz));
    quizSelector.appendChild(quizCard);
  });
};
loadAllQuiz();
