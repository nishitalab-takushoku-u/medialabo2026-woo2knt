// 課題4-1: 数当てゲーム

// 乱数を使って正解を作る
let kotae = Math.floor(Math.random()*10) + 1;
console.log('答え（デバッグ用）: ' + kotae);

// 入力回数（予想回数）
let kaisu = 0;

// そのほか，必要に応じて変数を宣言してもよい
let s=document.getElementById("kaisu");
let b=document.getElementById("keka");
let k=document.getElementById("kai");
let r=document.getElementById("result");
let kkk=document.getElementById("kkk");
//b.addEventListener('click', hantei);
let c=false;

// ボタンを押した後の処理をする関数 hantei() の定義
function hantei() {
  // ここから: 予想回数を1増やして，span#kaisu 要素のテキストを更新
  
  kaisu=kaisu+1;
  s.textContent=kaisu;

  // ここまで: 予想回数を1増やして，span#kaisu 要素のテキストを更新
  
  // ここから: テキストボックスに指定された数値を yoso に代入する
  let yoso=k.value;
  console.log(yoso);
  kkk.textContent=yoso;
  // ここまで: テキストボックスに指定された数値を yoso に代入する
  
  // ここから: 正解判定する
  // 　　　　  正解/不正解のときのメッセージを表示する
  if(kaisu>=4||c==true){
    r.textContent="答えは"+kotae+"でした．すでにゲームは終わっています";
  }else if(kotae == yoso){
    r.textContent="正解です．おめでとう!";
    c=true;
  }else if(kaisu>=3){
    r.textContent="まちがい．残念でした答えは"+kotae+"です．";
  }else if(kotae>yoso){
    r.textContent="まちがい．答えはもっと大きいですよ";
  }else if(kotae<yoso){
    r.textContent="まちがい．答えはもっと小さいですよ";
  }
  

  // ここまで: 正解判定する
}

// ここから: ボタンを押した時のイベントハンドラとして hantei を登録
b.addEventListener('click', hantei);
// ここまで: ボタンを押した時のイベントハンドラとして hantei を登録
