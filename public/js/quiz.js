// クイズデータを読み込む
import { quizDataJp } from './quiz-data.js';

let currentQuiz = 0;

//問題番号
const quiznumElm = document.getElementById('question-number');
const scoreElm = document.getElementById('score');

// 問題文
const questionElm = document.getElementById('question');

// 選択肢
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');

// 回答送信ボタン、スイッチ
const submitBtn = document.getElementById('submit');
const switchBtn = document.getElementById('switch-push');

// 現在の問題


// 現在のスコア
let score = 0;



// 次の問題へ進むボタン
const nextQuizBtn = document.getElementById('next-quiz');

// 結果表示用の要素
const resultsConElm = document.getElementById('results-modalArea');
const resultsElm = document.getElementById('results');

const resultsMarkmaru = document.getElementById('results-mark-maru');
const resultsMarkbatsu = document.getElementById('results-mark-batsu');

const switchFraElm = document.getElementById('switch-frame');
const quizConElm = document.getElementById('quiz-container');


loadQuiz();

// 問題を読み込む
function loadQuiz() {
  quiznumElm.innerText = "【第" + (currentQuiz + 1) + "問】";
  scoreElm.innerText = "得点： " + score + "pt";


  // 問題を取得
  const currentQuizData = quizDataJp[currentQuiz];

  // 質問文を表示
  questionElm.innerText = currentQuizData.question;

  // 選択肢を表示
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

// 回答を取得
function getAnswered() {
  // 選択したラジオボタンのvalueを返す
  return document.quizForm.answer.value;
}

//　スイッチを押した際の動作
switchBtn.addEventListener('click', event => {
  switchFraElm.style.display = 'none';
  quizConElm.style.display = 'block';
  document.getElementById('switch_audio').play();
  update();
  //setTimeout(alertTimer,3000);
  func1();
});

//　時間経過のアラート
function alertTimer(){
  alert('Time up！');
}

// 結果表示
function showResults(results) {
  submitBtn.style.display = 'none'; //　送信ボタンを非表示
  resultsConElm.style.display = 'block'; //　結果要素の表示

  //　前問にて表示されたマークを非表示
  resultsMarkbatsu.style.display = 'block'; 
  resultsMarkmaru.style.display = 'block'; 


  if(results){
    resultsMarkbatsu.style.display = 'none';
    resultsElm.innerText = "正解! : " + results;
    resultsElm.style.color = 'red'
  }else{
    resultsMarkmaru.style.display = 'none';
    resultsElm.innerText = "残念 : 正解は" + quizDataJp[currentQuiz].correct + "です";
    resultsElm.style.color = 'blue'
  }
}

// 次の問題を表示
function showQuiz() {
  submitBtn.style.display = 'block';
  resultsConElm.style.display = 'none';
  switchFraElm.style.display = 'block';
  quizConElm.style.display = 'none';
}

//　送信ボタンを押した場合
submitBtn.addEventListener('click', event => {
  event.preventDefault();

  const answer = getAnswered();

  if(answer) {

    if (answer === quizDataJp[currentQuiz].correct) {
      showResults('10pt');
      score += 10;
    } else{
      showResults();
    }

    document.getElementById(answer).checked = false;
  }
});

//　次へボタンを押した場合
nextQuizBtn.addEventListener('click', event => {
  event.preventDefault();

  currentQuiz++;

  if (currentQuiz < quizDataJp.length) {

    loadQuiz();
    
    showQuiz(1);
  
  } else {
    window.location.href = '../views/Result-score.html';
  }
});

//modalの挙動
$(function () {
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });
});
