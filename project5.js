// Quiz questions (RHCSA format)
const questions = [
  {
    question: "How do you create a new user named Deodat with a home directory?",
    answer: "useradd Deodat",
  },
  {
    question: "How do you change the password for user Deodat?",
    answer: "passwd Deodat",
  },
  {
    question: "How do you check the current disk usage in human-readable format?",
    answer: "df -h",
  },
  {
    question: "How do you switch to the root user?",
    answer: "su",
  },
  {
    question: "Which file stores user account information in Linux?",
    answer: "/etc/passwd",
  },
  {
    question: "How do you change the permissions of a file?",
    answer: "chmod",
  },
  {
    question: "What is the command to check currently running processes?",
    answer: "ps",
  },
  {
    question: "How do you restart a service in Linux using systemctl?",
    answer: "systemctl restart",
  },
  {
    question: "How do you check the current IP address configuration of your system?",
    answer: "ip addr",
  },
  {
    question: "How do you check the status of the https service",
    answer: "systemctl status httpd",
  },
  {
    question: "How do you display the last lines of a file in real time?",
    answer: "tail -f",
  },
  {
    question: "What is the default location for cron jobs in Linux?",
    answer: "/etc/cron.d",
  },
  {
    question: "How do you display disk usage for files and directories?",
    answer: "du",
  },
  {
    question: "How do you create a tar archive of the /home directory?",
    answer: "tar -cvfa /home",
  },
  {
    question: "How do you set SELinux to permissive mode",
    answer: "setenforce 0",
  },
  {
    question: "How do you create a new directory?",
    answer: "mkdir",
  },
  {
    question: "Which file is used to configure the hostname of a Linux system?",
    answer: "/etc/hostname",
  },
  {
    question: "What is the command to mount a file system?",
    answer: "mount",
  },
  {
    question: "How do you list the currently active firewalld rules",
    answer: "firewall-cmd --list-all",
  },
  {
    question: "How do you find a specific file in Linux?",
    answer: "find",
  },
  {
    question: "How do you check open ports on a server?",
    answer: "netstat",
  },
  {
    question: "How do you change a user's password in Linux?",
    answer: "passwd",
  },
];


// Variables to track quiz state
let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswers = 0;

// DOM elements
const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const answerInputElement = document.getElementById("answer-input");
const resultElement = document.getElementById("result");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

// Function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionTextElement.textContent = currentQuestion.question;
  answerInputElement.value = userAnswers[currentQuestionIndex] || ""; // Pre-fill if user answered before
  resultElement.textContent = ""; // Clear result when navigating
}

// Function to handle the Next button click
function nextQuestion() {
  // Save user answer
  userAnswers[currentQuestionIndex] = answerInputElement.value.trim();

  // Check if this is the last question
  if (currentQuestionIndex === questions.length - 1) {
    showResults(); // Show results after the last question
    return;
  }

  // Move to the next question
  currentQuestionIndex++;
  displayQuestion();
}

// Function to handle the Previous button click
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    // Save current answer
    userAnswers[currentQuestionIndex] = answerInputElement.value.trim();
    // Move to the previous question
    currentQuestionIndex--;
    displayQuestion();
  }
}

// Function to show results with correct and user answers
function showResults() {
  userAnswers[currentQuestionIndex] = answerInputElement.value.trim(); // Save the last answer

  // Calculate the number of correct answers
  correctAnswers = questions.reduce((count, question, index) => {
    return count + (userAnswers[index]?.toLowerCase() === question.answer.toLowerCase() ? 1 : 0);
  }, 0);

  // Display the results
  questionNumberElement.textContent = "Quiz Completed!";
  questionTextElement.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;

  // Build detailed results
  let detailedResults = "<h3>Your Answers vs Correct Answers</h3>";
  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index] || "No Answer";
    const correctAnswer = question.answer;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    detailedResults += `
      <p>
        <strong>Q${index + 1}:</strong> ${question.question}<br>
        <span style="color: ${isCorrect ? 'green' : 'red'};">
          Your Answer: ${userAnswer}
        </span><br>
        Correct Answer: ${correctAnswer}
      </p>
      <hr>
    `;
  });

  resultElement.innerHTML = detailedResults;

  // Hide input and navigation buttons
  answerInputElement.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";

  // Show the Restart button
  const restartButton = document.createElement("button");
  restartButton.id = "restart-btn";
  restartButton.textContent = "Restart Quiz";
  restartButton.style.padding = "15px 30px";
  restartButton.style.fontSize = "1rem";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";
  restartButton.style.backgroundColor = "#28a745";
  restartButton.style.color = "white";
  restartButton.style.marginTop = "20px";
  restartButton.addEventListener("click", restartQuiz);
  resultElement.appendChild(restartButton);
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  correctAnswers = 0;

  // Reset input and buttons
  answerInputElement.style.display = "block";
  prevButton.style.display = "inline-block";
  nextButton.style.display = "inline-block";
  resultElement.innerHTML = "";

  // Display the first question
  displayQuestion();
}

// Initialize the first question
displayQuestion();
