// クイズデータを読み込む
/*
import { httpGet } from './index.js';

var answered = 0;
let currentQuiz = 0;
// 一定間隔で処理を行うintervalのIDを保持
var intervalID;

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
var correct;

// 現在のスコア
let score = 0;

// 報酬
let reward = 0;

// プログレスバーの進捗値
var val =100;

// 一定間隔で処理を行うintervalのIDを保持
var intervalID;

// 次の問題へ進むボタン
const nextQuizBtn = document.getElementById('next-quiz');

// 結果表示用の要素
//const quizHeaderElm = document.getElementById('quiz-header');
const resultsConElm = document.getElementById('results-modalArea');
const resultsElm = document.getElementById('results');

const resultsMarkmaru = document.getElementById('results-mark-maru');
const resultsMarkbatsu = document.getElementById('results-mark-batsu');

const switchFraElm = document.getElementById('switch-frame');
const quizConElm = document.getElementById('quiz-container');

//クイズリストを作成
const max = 10;
var quizList = [];
for( var i=1; quizList.push(i++) < max;);

loadQuiz();

function shuffleAry(ary) {
  var i = ary.length;
  while(i){
    var j = Math.floor(Math.random()*i);
    var t = ary[--i];
    ary[i] = ary[j];
    ary[j] = t;
  }
  return ary;
}

var options = [];

// 問題を読み込む
async function loadQuiz() {
  answered = 0;
  
  quiznumElm.innerText = "【第" + (currentQuiz + 1) + "問】";
  scoreElm.innerText = "得点： " + score + "pt";

  // クイズリストからランダムに一つクイズ番号を取り出す
  var rand = Math.floor(Math.random() * quizList.length)
  var quizIndex = quizList[rand];
  delete quizList[rand];

  // 問題を取得
  const quizData = await httpGet(
    "//" + window.location.host + "/api/quiz/get/"+quizIndex
  );
  console.log(quizData[0]);
  console.log(quizData[0].id);
  console.log(quizData[0].statement);

  // 質問文を表示
  questionElm.innerText = quizData[0].statement;
  correct=quizData[0].answer;

  //選択肢をランダムに並び替え
  var option = quizData[0].option;
  options = option.split(",");
  options = shuffleAry(options);

  console.log(options);

  // 選択肢を表示
  a_text.innerText = options[0];
  b_text.innerText = options[1];
  c_text.innerText = options[2];
  d_text.innerText = options[3];
}

// 回答を取得
function getAnswered() {
  // 選択したラジオボタンのvalueを返す
  var index = document.quizForm.answer.value;
  return options[index];
}

//　スイッチを押した際の動作
switchBtn.addEventListener('click', event => {
  switchFraElm.style.display = 'none';
  quizConElm.style.display = 'block';
  const switchAudio = document.getElementById('switch_audio');
  switchAudio.volume = 0.1; 
  switchAudio.play();
  Timebar();
});


// 結果表示
function showResults(results) {
  submitBtn.style.display = 'none'; //　送信ボタンを非表示 //　送信ボタンを非表示
  resultsConElm.style.display = 'block'; //　結果要素の表示

  //　前問にて表示されたマークを非表示 //　結果要素の表示
  if(results){
    const answerAudio = document.getElementById('answer-audio');
    answerAudio.volume = 0.1; 
    answerAudio.play();

    resultsMarkbatsu.style.display = 'none';
    resultsElm.innerText = "正解! : " + "正解! : " + results;
    resultsElm.style.color = 'red'
    //resultsElm.style.color = 'red'
  }else{
    const wrongAudio = document.getElementById('wrong-audio');
    wrongAudio.volume = 0.1; 
    wrongAudio.play();

    resultsMarkmaru.style.display = 'none';
    resultsElm.innerText = "残念 : 正解は" + correct + "です";
    resultsElm.style.color = 'blue'
  }
}

// 次の問題を表示
function showQuiz() {
  submitBtn.style.display = 'block';
  resultsConElm.style.display = 'none';
  switchFraElm.style.display = 'block';
  quizConElm.style.display = 'none';
  document.getElementById("myProgress").value = 100;
}

//　送信ボタンを押した場合
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  
  clearInterval(intervalID);

  const answer = getAnswered();
  if(answer) {
    answered=1;
    reward +=50;
    if (answer == correct) {
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
    location.href = '../views/result-score.html?score=' +  score + '&reward=' + reward
    window.location.href = location.href
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


function Timebar() {
  val = 100;
  document.getElementById("myProgress").value = val;
  intervalID = setInterval(updateProgress, 100);
}

function updateProgress() {
  // プログレスバーの進捗値を更新し、プログレスバーに反映させる
  if(answered==0){
    val -= 1;
    document.getElementById("myProgress").value = val;
  }
  //console.log("progress:", val, "%");

  // 最大値まで達したら終了
  if (val == 0) {
    clearInterval(intervalID);
    showResults();
  }
}

*/
// local上で動かすには下記のコメントアウトを外して上記をコメントアウト

// クイズデータを読み込む
import { quizDataJp } from './quiz-data.js';

var answered = 0;
let currentQuiz = 0; //play中の問題が何番目の問題か


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
var correct;

// 現在のスコア、報酬
let score = 0;
let reward = 0;

// 一定間隔で処理を行うintervalのIDを保持
var intervalID;

// プログレスバーの進捗値
var val =100;


// 次の問題へ進むボタン
const nextQuizBtn = document.getElementById('next-quiz');

// 結果表示用の要素
const resultsConElm = document.getElementById('results-modalArea');
const resultsElm = document.getElementById('results');

const resultsMarkmaru = document.getElementById('results-mark-maru');
const resultsMarkbatsu = document.getElementById('results-mark-batsu');

const switchFraElm = document.getElementById('switch-frame');
const quizConElm = document.getElementById('quiz-container');

//クイズリストを作成
const max = 10;
const quizList = [];
for( var i=1; quizList.push(i++) < max;);

// クイズの問題を保持
let rand;
const setList = [];
const setListnum = [];
let options = [];

loadQuiz();

function shuffleAry(ary) {
  var i = ary.length;

  while(i){
    var j = Math.floor(Math.random()*i);
    var t = ary[--i];

    ary[i] = ary[j];
    ary[j] = t;
  }
  return ary;
}

// 問題を読み込む
async function loadQuiz() {
  // ?
  answered = 0;
  
  quiznumElm.innerText = "【第" + (currentQuiz + 1) + "問】";
  scoreElm.innerText = "得点： " + score + "pt";

  // クイズリストからランダムに一つクイズ番号を取り出す
  rand = Math.floor(Math.random() * quizList.length);

  // 問題番号が５以上(quiz-dataの問題数が5問のため)ならループ
  if(rand >= 5 || setListnum.indexOf(rand) != -1){
    console.log("rand=" + rand + "やり直し");
    loadQuiz();
  }else{

    console.log("rand=" + rand + ",問題は配列の" + rand + "番目");
  // 問題を取得
  const currentQuizData = quizDataJp[rand];

  //setList[setList.length] = currentQuizData;
  setListnum[setListnum.length] = rand;
  //console.log(setList); 
  console.log(setListnum); 

  
  // 質問文を表示
  questionElm.innerText = currentQuizData.question;

  // この問題の解答を取得
  correct = currentQuizData.correct;


  //選択肢をランダムに並び替え
  options = [
    currentQuizData.a,
    currentQuizData.b,
    currentQuizData.c,
    currentQuizData.d];

  options = shuffleAry(options);

  console.log(options);


  // 選択肢を表示
  a_text.innerText = options[0];
  b_text.innerText = options[1];
  c_text.innerText = options[2];
  d_text.innerText = options[3];
}}


// 回答を取得
function getAnswered() {
  // 選択したラジオボタンのvalueを返す
  return document.quizForm.answer.value;
}

//　スイッチを押した際の動作
switchBtn.addEventListener('click', event => {
  event.preventDefault();

  console.log(a_text.innerText);

  switchFraElm.style.display = 'none';
  quizConElm.style.display = 'block';
  const switchAudio = document.getElementById('switch_audio');
  switchAudio.volume = 0.1; 
  switchAudio.play();
  Timebar();
});


// 結果表示
function showResults(results) {
  submitBtn.style.display = 'none'; //　送信ボタンを非表示
  resultsConElm.style.display = 'block'; //　結果要素の表示

  //　前問にて表示されたマークを非表示
  resultsMarkbatsu.style.display = 'block'; 
  resultsMarkmaru.style.display = 'block'; 


  if(results){
    const answerAudio = document.getElementById('answer-audio');
    answerAudio.volume = 0.1; 
    answerAudio.play();

    resultsMarkbatsu.style.display = 'none';
    resultsElm.innerText = "正解! : " + results;
    resultsElm.style.color = 'red'
  }else{
    const wrongAudio = document.getElementById('wrong-audio');
    wrongAudio.volume = 0.1; 
    wrongAudio.play();

    resultsMarkmaru.style.display = 'none';
    resultsElm.innerText = "残念 : 正解は" + quizDataJp[rand].correct + "です";
    resultsElm.style.color = 'blue'
  }
}

// 次の問題を表示
function showQuiz() {
  submitBtn.style.display = 'block';
  resultsConElm.style.display = 'none';
  switchFraElm.style.display = 'block';
  quizConElm.style.display = 'none';
  document.getElementById("myProgress").value = 100;
}


//　送信ボタンを押した場合
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  clearInterval(intervalID);

  const answer = getAnswered();

  if(answer) {
    reward +=50;
    if (options[answer] === quizDataJp[rand].correct) {
      score += 10;
      showResults('10pt');
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
    
    showQuiz();

  } else {

    location.href = '../views/result-score.html?score=' +  score + '&reward=' + reward + '&setListnum=' + setListnum;
    //window.location.href = location.href;  
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

// 時間経過の動作
function Timebar() {
  val = 100;
  document.getElementById("myProgress").value = val;
  intervalID = setInterval(updateProgress, 50);
}


function updateProgress() {
  // プログレスバーの進捗値を更新し、プログレスバーに反映させる
  val -= 1;
  document.getElementById("myProgress").value = val;
  //console.log("progress:", val, "%");

  // 最大値まで達したら終了
  if (val == 0) {
    clearInterval(intervalID);
    showResults();
  }
}

