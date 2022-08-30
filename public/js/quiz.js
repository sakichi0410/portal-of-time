// クイズデータを読み込む
import { quizDataJp } from './quiz-data.js';

// 問題文
const questionElm = document.getElementById('question');

// 選択肢
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');

let currentQuiz = 0;

loadQuiz();

// 問題を読み込む
function loadQuiz() {
  const currentQuizData = quizDataJp[currentQuiz];

  questionElm.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}


