function getMarg() {
    var li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        for (var j = 0; j < li[i].children.length; j++) {
            li[i].children[j].style = "margin-right: 8px;margin-left: 8px;"
        }
    }
}
getMarg()
function getMessage() {
    var book = JSON.parse(localStorage.getItem("bookmessage"));
    var ig = document.getElementById("ig");
    var ng = document.getElementById("ng");
    var pg = document.getElementById("pg");
    pg.innerHTML = "¥" + book.price;
    ng.innerHTML = book.name;
    ig.src = ip + book.img;
}
getMessage();
function addNumber(obj) {
    var n = obj.previousSibling.innerHTML;
    obj.previousSibling.innerHTML = parseInt(n) + 1;
}
function reduceNumber(obj) {
    var n = obj.nextElementSibling.innerHTML;
    if (n > 1) {
        obj.nextElementSibling.innerHTML = parseInt(n) - 1;
    }
}
function joinCar() {
    var arr1 = JSON.parse(localStorage.getItem("booknum"));
    var arr2 = JSON.parse(localStorage.getItem("bookmessage"));
    arr2.flag = false;
    arr2.img = ip + arr2.img;
    arr2.price = "" + arr2.price;
    arr1.push(arr2);
    localStorage.setItem("booknum", JSON.stringify(arr1));
    location.href = "car.html";
}