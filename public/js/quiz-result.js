// クイズデータを読み込む
import { quizDataJp } from './quiz-data.js';

let currentQuiz = 0;

//問題番号
const quiznumElm = document.getElementById('qnumber-rpage');

// 問題文
//const questionElm = document.getElementById('question');

//result画面用の問題文、解答、解説
const rquestionElm = document.getElementById('question-rpage');
const rcorrectElm = document.getElementById('correct-rpage');
const rcommentElm = document.getElementById('explain-rpage');

loadQuiz();

// 問題を読み込む
function loadQuiz() {
  quiznumElm.innerText = "【第" + (currentQuiz + 1) + "問】";

  // 問題を取得
  const currentQuizData = quizDataJp[currentQuiz];

  // 質問文を表示
  rquestionElm.innerText = currentQuizData.question;

  
  if(currentQuizData.correct == "a"){
    rcorrectElm.innerText = "【解答】" + currentQuizData.a;
  }else if(currentQuizData.correct == "b"){
    rcorrectElm.innerText = "【解答】" + currentQuizData.b;
  }else if(currentQuizData.correct == "c"){
    rcorrectElm.innerText = "【解答】" + currentQuizData.c;
  }else{
    rcorrectElm.innerText = "【解答】" + currentQuizData.d;
  };
  
  rcommentElm .innerText = currentQuizData.comment;
}

// selectの切り替え処理
const selectElement = document.querySelector('.select');

selectElement.addEventListener('change', event => {
  currentQuiz = event.target.value - 1;
  loadQuiz();
});











