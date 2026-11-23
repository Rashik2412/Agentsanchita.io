
// ========================================
// OPERATION SANCHITA — ULTIMATE EDITION
// ========================================

const screens = document.querySelectorAll(".screen");

function goToScreen(screenId) {
  const target = document.getElementById(screenId);
  if (!target) return;

  screens.forEach(screen => screen.classList.remove("active"));
  target.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    goToScreen(button.dataset.go);
  });
});

// ========================================
// TOAST NOTIFICATIONS
// ========================================

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// ========================================
// AGENT VERIFICATION
// ========================================

const verificationButtons = document.querySelectorAll(".choice");
const verificationMessage = document.getElementById("verificationMessage");

verificationButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.answer === "correct") {
      verificationMessage.textContent =
        "ACCESS GRANTED! 🧬 Welcome, Agent Sanchita.";

      verificationButtons.forEach(choice => {
        choice.disabled = true;
      });

      setTimeout(() => goToScreen("dossier"), 1200);
    } else {
      verificationMessage.textContent =
        "Incorrect! Agent, please consult your scientific instincts. 😂";
    }
  });
});

// ========================================
// PINK SLIME LABORATORY
// ========================================

const slimeBlob = document.getElementById("slimeBlob");
const slimeText = document.getElementById("slimeText");
const slimeTitle = document.getElementById("slimeTitle");
const slimeProgress = document.getElementById("slimeProgress");
const slimeCount = document.getElementById("slimeCount");
const slimeContinue = document.getElementById("slimeContinue");

let slimeSamples = 0;

const slimeMessages = [
  "Sample 1: It appears to be... suspiciously pink.",
  "Sample 2: The specimen has a surprisingly bouncy personality.",
  "Sample 3: Scientists are confused. The slime seems happy.",
  "Sample 4: Warning! This substance may cause uncontrollable giggling.",
  "Sample 5: FINAL RESULT — 100% birthday magic. Zero scientific explanation."
];

function analyseSlime() {
  if (slimeSamples >= 5) return;

  slimeSamples++;

  slimeBlob.classList.remove("pop");
  void slimeBlob.offsetWidth;
  slimeBlob.classList.add("pop");

  slimeText.textContent = slimeMessages[slimeSamples - 1];
  slimeProgress.style.width = (slimeSamples * 20) + "%";
  slimeCount.textContent = `Samples analysed: ${slimeSamples} / 5`;

  if (slimeSamples === 5) {
    slimeTitle.textContent = "SPECIMEN SUCCESSFULLY ANALYSED";
    slimeBlob.textContent = "🧪";
    slimeContinue.hidden = false;
    showToast("Laboratory mission completed! 🎉");
    launchConfetti(45);
  }
}

slimeBlob.addEventListener("click", analyseSlime);

slimeBlob.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    analyseSlime();
  }
});

// ========================================
// MOLECULAR BIOLOGY QUIZ
// ========================================

const questions = [
  {
    question: "Which molecule carries genetic information?",
    options: ["DNA 🧬", "Glucose 🍬", "Water 💧"],
    answer: 0,
    explanation: "Correct! DNA stores genetic information. Scientist points awarded!"
  },
  {
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondrion", "Ribosome"],
    answer: 1,
    explanation: "Exactly! Mitochondria are famous for ATP production."
  },
  {
    question: "What is the basic building block of proteins?",
    options: ["Fatty acids", "Nucleotides", "Amino acids"],
    answer: 2,
    explanation: "Correct! Amino acids link together to form proteins."
  }
];

let currentQuestion = 0;
let quizScore = 0;
let questionAnswered = false;

const questionNumber = document.getElementById("questionNumber");
const quizScoreDisplay = document.getElementById("quizScore");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function renderQuestion() {
  const q = questions[currentQuestion];

  questionAnswered = false;
  questionNumber.textContent =
    `QUESTION ${currentQuestion + 1} / ${questions.length}`;

  quizScoreDisplay.textContent = `SCORE: ${quizScore}`;
  quizQuestion.textContent = q.question;
  quizFeedback.textContent = "";
  nextQuestion.hidden = true;

  quizOptions.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    quizOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (questionAnswered) return;

  questionAnswered = true;

  const q = questions[currentQuestion];
  const buttons = quizOptions.querySelectorAll("button");

  buttons.forEach(button => button.disabled = true);

  if (selectedIndex === q.answer) {
    quizScore++;
    quizFeedback.textContent = "✅ " + q.explanation;
  } else {
    quizFeedback.textContent =
      "Not quite! The correct answer was " + q.options[q.answer] + ". Keep learning! 💗";
  }

  quizScoreDisplay.textContent = `SCORE: ${quizScore}`;

  buttons[q.answer].style.borderColor = "#56bd91";
  buttons[q.answer].style.background = "#e8fff3";

  nextQuestion.hidden = false;
  nextQuestion.textContent =
    currentQuestion === questions.length - 1
      ? "See my scientist results →"
      : "Next question →";
}

nextQuestion.addEventListener("click", () => {
  if (!questionAnswered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showToast(`Final score: ${quizScore} / ${questions.length} 🧬`);
    goToScreen("challenge");
  }
});

renderQuestion();

// ========================================
// GYM VS SLEEP CHALLENGE
// ========================================

const challengeButtons = document.querySelectorAll(".challenge-choice");
const challengeFeedback = document.getElementById("challengeFeedback");

challengeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const choice = button.dataset.choice;

    if (choice === "gym") {
      challengeFeedback.textContent =
        "Gym chosen! The weights have been warned. 🏋️‍♀️";
    } else {
      challengeFeedback.textContent =
        "Sleep chosen! The pillow has officially won. 💤";
    }

    challengeButtons.forEach(item => {
      item.disabled = true;
    });

    setTimeout(() => goToScreen("archive"), 1500);
  });
});

// ========================================
// SECRET EASTER EGG
// Tap the logo five times.
// ========================================

const secretLogo = document.getElementById("secretLogo");
let logoTaps = 0;
let secretUnlocked = false;
let logoTapTimer;

secretLogo.addEventListener("click", () => {
  if (secretUnlocked) return;

  logoTaps++;
  clearTimeout(logoTapTimer);

  if (logoTaps < 5) {
    showToast(`Secret access: ${logoTaps}/5 👀`);

    logoTapTimer = setTimeout(() => {
      logoTaps = 0;
    }, 1800);
  } else {
    secretUnlocked = true;
    showToast("SECRET FILE DISCOVERED!");
    goToScreen("secret");
    launchConfetti(35);
  }
});

// ========================================
// CONFETTI GENERATOR
// ========================================

function launchConfetti(amount = 100) {
  const layer = document.getElementById("confettiLayer");
  const colours = [
    "#ff65a4",
    "#ffb5d2",
    "#c8a5ff",
    "#ffe17d",
    "#ffffff",
    "#ff8dba"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background =
      colours[Math.floor(Math.random() * colours.length)];

    piece.style.animationDelay = Math.random() * 1.2 + "s";
    piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    piece.style.setProperty(
      "--drift",
      (Math.random() * 240 - 120) + "px"
    );

    layer.appendChild(piece);

    setTimeout(() => piece.remove(), 6000);
  }
}

// ========================================
// BIRTHDAY CELEBRATION
// ========================================

document.getElementById("confettiButton").addEventListener("click", () => {
  launchConfetti(140);
  showToast("HAPPY BIRTHDAY, AGENT SANCHITA! 🎂");
});

document.getElementById("restartButton").addEventListener("click", () => {
  // Reset all mission progress.
  slimeSamples = 0;
  slimeText.textContent = "Tap the specimen to begin the investigation.";
  slimeTitle.textContent = "Specimen P-INK";
  slimeBlob.textContent = "🩷";
  slimeProgress.style.width = "0%";
  slimeCount.textContent = "Samples analysed: 0 / 5";
  slimeContinue.hidden = true;

  currentQuestion = 0;
  quizScore = 0;
  renderQuestion();

  verificationButtons.forEach(button => button.disabled = false);
  verificationMessage.textContent = "";

  challengeButtons.forEach(button => button.disabled = false);
  challengeFeedback.textContent = "";

  logoTaps = 0;
  secretUnlocked = false;

  goToScreen("welcome");
  showToast("Mission restarted, Agent! 🎀");
});
