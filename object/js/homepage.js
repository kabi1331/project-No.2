var li1 = document.getElementsByClassName("li1");
var img1 = document.getElementById("i1")
var ul1 = document.getElementById("ul1")
var i = 0;
var bookimg = document.getElementsByClassName("bookimg");
var bookprice = document.getElementsByClassName("bookprice");
var bookword = document.getElementsByClassName("bookword");
var booimg = document.getElementsByClassName("booimg");
var booprice = document.getElementsByClassName("booprice");
var booword = document.getElementsByClassName("booword");
var ul = document.getElementById("ul");
if (localStorage.getItem("booknum") == null) {
    localStorage.setItem("booknum", "[]");
}
function getImg() {
    // var xmlhttp = getXMLHttpRequest();
    // xmlhttp.open("GET", ip + "/showImages");
    // xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         var data = JSON.parse(xmlhttp.responseText);
    //         changeEvent(data);
    //         changePicture(data);
    //     }
    // }
    // xmlhttp.send();
    $.get(ip + "/showImages",function(data){
        changeEvent(data);
        changePicture(data);
    },'json');
}
getImg();
function changeEvent(arr) {
    ul1.addEventListener("click", function () {
        if (event.target.localName === 'li') {
            for (let i = 0; i < li1.length; i++) {
                li1[i].index = i;
            }
            img1.src = ip + arr[event.target.index].img;
            for (let i = 0; i < li1.length; i++) {
                const element = li1[i];
                if (i === event.target.index) {
                    element.style.background = "white";
                } else {
                    element.style.background = "#999999";
                }
            }
        }
    })
}
var t;
function changePicture(data) {
    if (data != null && data != undefined && data != "") {
        t = data;
    }
    img1.src = ip + t[i].img;
    i++;
    flag = setTimeout('changePicture()', 3000);
    for (var j = 0; j < li1.length; j++) {
        if (j == i - 1) {
            li1[j].style.background = "white";
        } else {
            li1[j].style.background = "#999999";
        }
    }
    if (i == 5) {
        i = 0;
    }
}
function getBooks() {
    // var xmlhttp = getXMLHttpRequest();
    // xmlhttp.open("GET", ip + "/getBooks");
    // xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         var book = JSON.parse(xmlhttp.responseText);
    //         for (var i = 0; i < book.length - 7; i++) {
    //             bookimg[i].src = ip + book[i].img;
    //             bookimg[i].style = "width:200px;height:200px"
    //             bookprice[i].innerHTML = "¥" + book[i].price;
    //             bookword[i].innerHTML = book[i].name;
    //         }
    //         changepage(book);
    //     }
    // }
    // xmlhttp.send();
    $.get(ip + "/getBooks",function(book){
        for (var i = 0; i < book.length - 7; i++) {
            bookimg[i].src = ip + book[i].img;
            bookimg[i].style = "width:200px;height:200px"
            bookprice[i].innerHTML = "¥" + book[i].price;
            bookword[i].innerHTML = book[i].name;
        }
    },'json');
}
getBooks();
function getLeft() {
    var xmlhttp = getXMLHttpRequest();
    xmlhttp.open("GET", ip + "/showADBooks");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var book = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < book.length - 1; i++) {
                booimg[i].src = ip + book[i].img;
                booimg[i].style = "width:200px;height:200px"
                booprice[i].innerHTML = "¥" + book[i].price;
                booword[i].innerHTML = book[i].name;
            }
        }
    }
    xmlhttp.send();
}
getLeft();
function changeP(book) {
    for (var i = 24; i < book.length; i++) {
        bookimg[i].src = ip + book[i].img;
        bookimg[i].style = "width:200px;height:200px"
        bookprice[i].innerHTML = "¥" + book[i].price;
        bookword[i].innerHTML = book[i].name;
        if (i == book.length - 1) {
            i == 0;
        }
    }
}
function changepage(book) {
    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].children[0].addEventListener("click", function () {
            if (localStorage.getItem("user") == null) {
                location.href = "login.html"
            } else {
                for (var j = 0; j < ul.children.length; j++) {
                    ul.children[j].children[0].index = j;
                }
                var num = event.target.index;
                localStorage.setItem("bookmessage", JSON.stringify(book[num]));
                location.href = "detail.html"
            }
        })
    }
}
function inCar() {
    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].children[4].addEventListener("click", function () {
            if (localStorage.getItem("user") == null) {
                location.href = "login.html"
            } else {
                var name = event.target.parentNode.children[2].innerHTML;
                var price = event.target.parentNode.children[1].innerHTML.split("¥")[1];
                var img = event.target.parentNode.children[0].src
                var flag = false;
                var arr = JSON.parse(localStorage.getItem("booknum"));
                if (checkName(name)) {
                    arr.push({ name: name, price: price, img: img, flag: flag });
                }
                localStorage.setItem("booknum", JSON.stringify(arr));
            }
        })
    }
}
inCar();
function checkName(name) {
    var r = true;
    var arr = JSON.parse(localStorage.getItem("booknum"));
    for (var i = 0; i < arr.length; i++) {
        if (name == arr[i].name) {
            r = false;
            break;
        }
    }
    return r;
}