function promo() {
    var num1,num2,num3,num4;
    num1 = document.getElementById('n1').value;
    num1 = parseInt(num1);
    
    if (num1 * 0.1 <= 200) num4 = 200;
    if (num1 * 0.1 > 200) num3 = Math.ceil(num1 * 0.1 / 100) * 100;
    if (num3 <= 5000) num4 = num3;
    if (num3 >= 5000) num4 = 5000;

    num4 = parseInt(num4);
    result = num4;

    document.getElementById('out').innerHTML = result;
}