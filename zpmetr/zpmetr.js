var h1 = document.getElementsByTagName('h1')[0];
var h2 = document.getElementsByTagName('h2')[0];
var start = document.getElementById('strt');
var stop = document.getElementById('stp');
var reset = document.getElementById('rst');
var sec = 0;
var min = 0;
var hrs= 0;
var wec = 0;
var win = 0;
var wrs = 0;
var t;
var w;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min = (min + 2.5);
    }
}
function tick1(){
    wec++;
    if (wec >= 60) {
        wec = 0;
        win++;
        if (win >= 60) {
            win = 0;
            wrs++;
        }
    }
}
function add() {
    tick();
    h1.textContent = (min);
    timer();
}
function add2() {
    tick1();
    h2.textContent = (wrs > 9 ? wrs : "0" + wrs) 
       + ":" + (win > 9 ? win : "0" + win)
       + ":" + (wec > 9 ? wec : "0" + wec);
    timer2();
}
function timer() {
    t = setTimeout(add, 100);
}
function timer2() {
    w = setTimeout(add2, 100);
}
timer();
timer2();
start.onclick = timer;
start.onclick = timer2;
stop.onclick = function() {
    clearTimeout(t);
}
stop.onclick = function() {
    clearTimeout(w);
}
reset.onclick = function() {
    h1.textContent = "0";
    min = 0; sec = 0;
}
reset.onclick = function() {
    h2.textContent = "00:00:00";
    wrs = 0; win = 0; wec = 0; 
}