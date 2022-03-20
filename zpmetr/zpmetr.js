var h1 = document.getElementsByTagName('h1')[0];
var h2 = document.getElementsByTagName('h2')[0];
var start = document.getElementById('strt');
var stop = document.getElementById('stp');
var reset = document.getElementById('rst');
var sec = 0;
var min = 0;
var hrs = 0;
var zp = 0;
var t;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    zp = (hrs * 150 + min * 2.5);
    h2.textContent = zp;
    timer();
}

function plushrsz() {
    hrs++;
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
    + ":" + (min > 9 ? min : "0" + min)
    + ":" + (sec > 9 ? sec : "0" + sec);
    zp = (hrs * 150 + min * 2.5);
    h2.textContent = zp;
}

function plusminx() {
    min++;
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
    + ":" + (min > 9 ? min : "0" + min)
    + ":" + (sec > 9 ? sec : "0" + sec);
    zp = (hrs * 150 + min * 2.5);
    h2.textContent = zp;
}

function timer() {
    t = setTimeout(add, 50);
}

start.onclick = timer;
stop.onclick = function() {
    clearTimeout(t);
}
reset.onclick = function() {
    h1.textContent = "00:00:00";
    h2.textContent = "0";
    sec = 0; min = 0; hrs = 0;
    clearTimeout(t);
}

