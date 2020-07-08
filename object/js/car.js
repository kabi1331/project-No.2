var table = document.getElementById("t2");
var sp = document.getElementById("sp1");
var span1 = document.getElementById("span1");
function messageIn() {
    if (localStorage.getItem("user") == null) {
        localStorage.setItem("user", "[]");
    }
    if (localStorage.getItem("num") == null) {
        localStorage.setItem("num", "[]");
    }
    var arr = JSON.parse(localStorage.getItem("booknum"));
    var arr1 = JSON.parse(localStorage.getItem("num"));

    for (var i = 0; i < arr.length; i++) {
        var tr = table.insertRow(-1);
        tr.align = "center";
        tr.style = "width:1164.8px";
        tr.insertCell(0).innerHTML = "<input type='checkbox' class='choose' onclick='changeCheck()'>"
        tr.insertCell(1).innerHTML = "<img src='' class='img1'><span class='span3'></span>"
        tr.insertCell(2).innerHTML = "<span class='span4'></span>";
        tr.insertCell(3).innerHTML = "<input type='button' value='-' onclick='reduceNumber(this)'><span class='span5'>1</span><input onclick='addNumber(this)' type='button' value='+'>"
        tr.insertCell(4).innerHTML = "<span></span>"
        tr.insertCell(5).innerHTML = "<input type='button' value='删除' onclick='deleteMessage(this)'>"
        var img1 = document.getElementsByClassName("img1");
        var span3 = document.getElementsByClassName("span3");
        var span4 = document.getElementsByClassName("span4");
        var boxs = document.getElementsByClassName("choose");
        var span5 = document.getElementsByClassName("span5");
        img1[i].src = arr[i].img;
        span3[i].innerHTML = arr[i].name;
        span4[i].innerHTML = "¥" + arr[i].price;
        boxs[i].checked = arr[i].flag;
    }
    sp.innerHTML = arr.length;
    for (var i = 0; i < arr1.length; i++) {
        span5[i].innerHTML = parseInt(arr1[i].price);
    }
    getNum(span5);
    changeCheck();
    getCheck();
    pay();
}
function getCheck() {
    var boxs = document.getElementsByClassName("choose");
    var arr = JSON.parse(localStorage.getItem("booknum"));
    for (var i = 0; i < boxs.length; i++) {
        if (boxs[i].checked) {
            arr[i].flag = true;
        } else {
            arr[i].flag = false;
        }
    }
    localStorage.removeItem("booknum")
    localStorage.setItem("booknum", JSON.stringify(arr));
}
function pay() {
    var money = 0;
    var boxs = document.getElementsByClassName("choose");
    for (var i = 0; i < boxs.length; i++) {
        if (boxs[i].checked) {
            money += parseInt(boxs[i].parentNode.parentNode.cells[2].children[0].innerHTML.split("¥")[1]) * parseInt(boxs[i].parentNode.parentNode.cells[3].children[1].innerHTML);
        }
    }
    document.getElementById("span2").innerHTML = "¥" + money;
    return money;
}
function pay1() {
    alert("共消费" + document.getElementById("span2").innerHTML + "元");
}
function checkAll(obj) {
    var arr = JSON.parse(localStorage.getItem("booknum"));
    var boxs = document.getElementsByClassName("choose");
    for (var i = 0; i < arr.length; i++) {
        arr[i].flag = obj.checked
        boxs[i].checked = obj.checked;
    }
    localStorage.removeItem("booknum")
    localStorage.setItem("booknum", JSON.stringify(arr));
    changeCheck();
    pay();
}
function changeCheck() {
    getCheck();
    var a = 0;
    var arr = JSON.parse(localStorage.getItem("booknum"));
    for (var j = 0; j < arr.length; j++) {
        if (arr[j].flag) {
            a++;
        }
        span1.innerHTML = a;
    }
    document.getElementById("check").checked = a == table.rows.length;
    pay();
}
function deleteMessage(obj) {
    var arr = JSON.parse(localStorage.getItem("booknum"));
    var index = obj.parentNode.parentNode.rowIndex;
    table.deleteRow(index);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == obj.parentNode.parentNode.children[1].children[1].innerHTML) {
            arr.splice(i, 1);
            localStorage.removeItem("booknum");
            localStorage.setItem("booknum", arr);
        }
    }
    sp.innerHTML = arr.length;
    changeCheck();
    getCheck();
    pay()
}
function deleteChecked() {
    var arr = JSON.parse(localStorage.getItem("booknum"));
    var boxs = document.getElementsByClassName("choose");
    for (var i = boxs.length - 1; i >= 0; i--) {
        if (boxs[i].checked) {
            table.deleteRow(i);
            arr.splice(i, 1);
            localStorage.removeItem("booknum");
            localStorage.setItem("booknum", arr);
        }
    }
    if (table.childNodes[1].children.length == 0) {
        check.checked = false;
    }
    sp.innerHTML = arr.length;
    changeCheck();
    getCheck();
    pay();
}
function addNumber(obj) {
    var n = obj.previousSibling.innerHTML;
    obj.previousSibling.innerHTML = parseInt(n) + 1;
    var i = obj.parentNode.parentNode.rowIndex;
    var arr = JSON.parse(localStorage.getItem("num"));
    arr[i].price++;
    localStorage.setItem("num", JSON.stringify(arr));
    pay();
}
function reduceNumber(obj) {
    var n = obj.nextElementSibling.innerHTML;
    if (n > 1) {
        obj.nextElementSibling.innerHTML = parseInt(n) - 1;
    }
    var i = obj.parentNode.parentNode.rowIndex;
    var arr = JSON.parse(localStorage.getItem("num"));
    arr[i].price--;
    if (arr[i].price > 0) {
        localStorage.setItem("num", JSON.stringify(arr));
    }
    pay();
}
function deleteAll() {
    var boxs = document.getElementsByClassName("choose");
    for (var i = boxs.length - 1; i >= 0; i--) {
        table.deleteRow(i);
        localStorage.removeItem("booknum");
    }
    localStorage.setItem("booknum", "[]");
    sp.innerHTML = 0;
    span1.innerHTML = 0;
    changeCheck();
    getCheck();
}
function getNum(span5) {
    var arr = [];
    for (var i = 0; i < span5.length; i++) {
        arr.push({ price: span5[i].innerHTML });
    }
    localStorage.setItem("num", JSON.stringify(arr));
}
