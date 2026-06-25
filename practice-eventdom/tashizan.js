let i1=document.getElementById("left");
let i2=document.getElementById("right");
let an=document.getElementById("answer");
let b=document.getElementById("calc");
b.addEventListener('click',kei);

function kei(){
    k=Number(i1.value);
    o=Number(i2.value);
    an.textContent=k+o;
}