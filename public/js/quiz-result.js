// クイズデータを読み込む
import { quizDataJp } from './quiz-data.js';

let currentQuiz = 0;
let currentQuiznum = 0;
let setListnum = [];
let score = 0;
let reward = 0;



//問題番号
const quiznumElm = document.getElementById('qnumber-rpage');

//result画面用の問題文、解答、解説、問題番号
const rquestionElm = document.getElementById('question-rpage');
const rcorrectElm = document.getElementById('correct-rpage');
const rcommentElm = document.getElementById('explain-rpage');


const quiz1Elm = document.getElementById('quiz1');
const quiz2Elm = document.getElementById('quiz2');
const quiz3Elm = document.getElementById('quiz3');
const quiz4Elm = document.getElementById('quiz4');
const quiz5Elm = document.getElementById('quiz5');
//５問追加
const quiz6Elm = document.getElementById('quiz6');
const quiz7Elm = document.getElementById('quiz7');
const quiz8Elm = document.getElementById('quiz8');
const quiz9Elm = document.getElementById('quiz9');
const quiz10Elm = document.getElementById('quiz10');

loadURL();

loadQuiz();

// URLの読み込み
function loadURL(){

  // setListnumの”,”を削除
const getUniqueValues = ([...array]) => {
  return array.filter((value, index, self) => self.indexOf(value) === self.lastIndexOf(value));
}

  // URLを取得
  const url = new URL(window.location.href);

  // URLSearchParamsオブジェクトを取得
  const params = url.searchParams;
  console.log("test");


  // パラメータから「score,reward,setListnum」を取得
  score = params.get("score");
  reward = params.get("reward");
  setListnum = getUniqueValues(params.get("setListnum"));
  currentQuiznum = setListnum[0];
  console.log(setListnum);
  console.log(score);
  
}


// 問題を読み込む
function loadQuiz() {
  
  quiznumElm.innerText = "【第" + (currentQuiz + 1) + "問】";

  // 問題を取得
  const currentQuizData = quizDataJp[currentQuiznum];

  // 質問文を表示
  rquestionElm.innerText = currentQuizData.question;
  console.log(currentQuizData.correct);

  rcorrectElm.innerText = "【解答】" + currentQuizData.correct;  
  rcommentElm .innerText = currentQuizData.comment;
}

// selectの切り替え処理
const selectElement = document.querySelector('.select');

selectElement.addEventListener('change', event => {
  currentQuiz = event.target.value - 1;
  currentQuiznum = setListnum[event.target.value - 1];

  loadQuiz();
});



// result-explain.htmlの成績に戻るに関する動作
const backbtnBtn = document.getElementById('backbtn');

backbtnBtn.addEventListener('click', event => {
  event.preventDefault();
window.location.href = '../views/result-score.html?score=' + score + '&reward=' + reward + '&setListnum=' + setListnum;
});



