if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function() {
        loaded();
    });
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
        loaded();
    });
}

function loaded() {

    setInterval(loop, 600);

}

var x = 0;

var titleText = [ "x", "xz", "xzq", "xzqu", "xzqu1", "xzqu1t", "xzqu1", "xzqu", "xzq", "xz", "x"];

function loop() {

    document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];

}
