function isRight(flag, obj) {
    if (flag) {
        obj.style.borderColor = "green";
    } else {
        obj.style.borderColor = "red";
    }
}
function checkUsername(obj) {
    isRight(/^1(3|5|7|8)\d{9}|\w{2,8}@[0-9 a-z A-Z]{3,6}\.com$/.test(obj.value), obj);
}
function checkPassword(obj) {
    isRight(/^[0-9 a-z A-Z]{8,10}$/.test(obj.value), obj);
}
function checkRePassword(obj) {
    var pa = document.getElementById("password");
    isRight(obj.value == pa.value, obj)
}
function checkRight() {
    var inp = document.getElementsByClassName("inp");
    var flag = true;
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].style.borderColor != "green") {
            flag = false;
            break;
        }
    }
    return flag;
}
function submi() {
    if (checkRight()) {
        // var xmlhttp = getXMLHttpRequest();
        // var n = document.getElementById("username").value;
        // var p = document.getElementById("password").value;
        // xmlhttp.open("POST", ip + "/regsterUser");
        // xmlhttp.onreadystatechange = function () {
        //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //         console.log(xmlhttp.responseText);
        //     }
        // }
        // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xmlhttp.send("username=" + n + "&password=" + p);
        $.ajax({
            url:ip + "/regsterUser",
            method:'post',
            data:$("form").serializeArray(),
            success:function(data){
                console.log(data);
            }
        })
    }
}
function inside() {
    if (localStorage.getItem("user") == null) {
        localStorage.setItem("user", "[]");
    }
}
