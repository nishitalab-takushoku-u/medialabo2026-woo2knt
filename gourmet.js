b=document.getElementById("kensaku");
i=document.getElementById("key");
b.addEventListener('click',search);
let tbodyElements;
let s=document.querySelector('span.a');
function search(){
  console.log("検索キー:"+i.value);
  rere();
  tbodyElements = document.querySelectorAll('tbody tr');
  if(i.value!=""){
    name();
  }
  if(budon.checked){
    budget();
  }
  for(let x of cbs){
    if(x.checked){
      genre();
      break;
    }
  }
  for(let x of subc){
    if(x.checked){
      sub();
      break;
    }
  }
 const nac = document.getElementsByClassName("hidden");
  s.textContent = tbodyElements.length - nac.length;
}

function name(){
  let hid = document.querySelectorAll('tbody tr:not(.hidden)');
  for(let a of hid){
      let atd = a.querySelectorAll('td')[0];
      if(!(atd.textContent.includes(i.value))){
        a.classList.add("hidden");
      }
    }
}

function budget(){
  let hid = document.querySelectorAll('tbody tr:not(.hidden)');
  for(let b of hid){
    let bud = b.querySelectorAll('td')[3].textContent.match(/\d+/g);
    if(bud==null||!(Number(bud[bud.length-1])<=Number(num.value))){
      b.classList.add("hidden");
    }
  }
}


let cbs = document.querySelectorAll('#chab input[type="checkbox"]');
let subc = document.querySelectorAll('#subc input[type="checkbox"]');
let cls=[];
for(let s of subc){
  cls.push(s.parentElement.textContent);
}

function genre(){
  let hid = document.querySelectorAll('tbody tr:not(.hidden)');
  for(let i=0;i<cbs.length;i++){
    if(!(cbs[i].checked)){
      for(let a of hid){
        let atd = a.querySelectorAll('td')[5];
        if(atd.textContent==cls[i]){
          a.classList.add("hidden");
        }
      }
    }
  }
}
function sub(){
  let hid = document.querySelectorAll('tbody tr:not(.hidden)');
  for(let a of hid){
    let atd = a.querySelectorAll('td')[8];
    if(atd.textContent=="なし"){
      a.classList.add("hidden");
    }
  }
  for(let i=0;i<subc.length;i++){
    if(!(subc[i].checked)){
      for(let a of hid){
        let atd = a.querySelectorAll('td')[8];
        if(atd.textContent==cls[i]){
          a.classList.add("hidden");
        }
      }
    }
  }
}

let bar = document.getElementById("bar");
let num = document.getElementById("num");
let budon = document.getElementById("budon");
let budoff = document.getElementById("budoff");
bar.addEventListener('change', function(){
  num.value=bar.value;
});
num.addEventListener('change',function(){
  bar.value=num.value;
});

function rere(){
  for(let a of tbodyElements){
      a.classList.remove("hidden");
  }
  s.textContent = tbodyElements.length;
}

let r=document.getElementById("reset");
r.addEventListener('click',reset);

function reset(){
  rere();
  breset();
}

function breset(){
  i.value="";
  bar.value=3000;
  num.value=3000;
  budoff.checked=true;
  cbs.forEach(function(checkbox){
    checkbox.checked = false;
  });
  subc.forEach(function(checkbox){
    checkbox.checked = false;
  });
}

document.addEventListener('DOMContentLoaded', async function()
{
  breset();
  const req=[];
  for(let x=1;x<10;x++){
    let url='https://www.nishita-lab.org/web-contents/jsons/hotpepper/G00'+x+'.json';
    req.push(sendRequest(url));
  }
  for(let x=10;x<=17;x++){
    let url='https://www.nishita-lab.org/web-contents/jsons/hotpepper/G0'+x+'.json';
    req.push(sendRequest(url));
  }
  await Promise.all(req);
  tbodyElements = document.querySelectorAll('tbody tr');
  s.textContent = tbodyElements.length;
});

// 課題3-2 のプログラムはこの関数の中に記述すること
function print(data) {
  let i=1;
  for(let a of data.results.shop){
    console.log(i+"件目の検索結果");
    console.log("店名:"+a.name);
    console.log("アクセス:"+a.access);
    console.log("住所:"+a.address);
    console.log("予算:"+a.budget.name);
    console.log("キャッチコピー:"+a.catch);
    console.log("ジャンル:"+a.genre.name);
    console.log("営業時間:"+a.open);
    console.log("最寄駅:"+a.station_name);
    console.log("サブジャンル:"+a.sub_genre.name);
    i=i+1;
  }
}

// 課題5-1 の関数 printDom() はここに記述すること
function printDom(data) {
  let bd=document.querySelector('tbody#bd');
  outer:
  for(let x of data.results.shop){
    if (x.sub_genre == null) {
      x.sub_genre = { name: "なし" };
    }
    let h=[x.name,x.access,x.address,x.budget.name,x.catch,x.genre.name,x.open,x.station_name,x.sub_genre.name];

    let tatr = document.querySelectorAll('tbody tr')==null?document.querySelectorAll('tr'):document.querySelectorAll('tbody tr');
    for(let ta of tatr){
      let tad = document.querySelectorAll('tbody tr')==null?ta.querySelectorAll('th')[1].textContent:ta.querySelectorAll('td')[0].textContent;
      if(x.name == tad){
        console.log(x.name+"=="+tad);
        continue outer;
      }
    }

    let tr=document.createElement('tr');
    bd.insertAdjacentElement('beforeend',tr);
    let td=[];
    for(let k=0;k<h.length;k++){
      td[k]=document.createElement('td');
      let f=h[k];
      td[k].textContent=f;
      tr.insertAdjacentElement('beforeend',td[k]);
      
    }
  }
}

// 課題6-1 のイベントハンドラ登録処理は以下に記述


// 課題6-1 のイベントハンドラ sendRequest() の定義
function sendRequest(iid) {
	// 通信開始
	return axios.get(iid)
		.then(showResult)
		.catch(showError)
		.then(finish);
}

let data=[];
let iii=0;
// 課題6-1: 通信が成功した時の処理は以下に記述
function showResult(resp) {

  data[iii] = resp.data;

	// data が文字列型なら，オブジェクトに変換する
	if (typeof data[iii] === 'string') {
		data[iii] = JSON.parse(data[iii]);
	}

  printDom(data[iii]);

	// data をコンソールに出力
	//console.log(data[iii]);

	// data.x を出力
	//console.log(iii);
  iii++;
}

// 課題6-1: 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 課題6-1: 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終わりました');
}

////////////////////////////////////////
// 以下はグルメのデータサンプル
// 注意: 第5回までは以下を変更しないこと！
// 注意2: 課題6-1 で以下をすべて削除すること

