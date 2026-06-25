b = document.querySelector('button#print');
b.addEventListener('click', greeting);
p= document.querySelector('p#message');
i=document.querySelector('input[name="shimei"]');

function greeting() {
    shimei=i.value;
    aisatu="こんにちは、"+shimei+"さん"
    p.textContent=aisatu;
  }