if (localStorage.getItem("user") == null) {
    localStorage.setItem("user", "[]");
}
function sub() {
    // var username = document.getElementById("username").value;
    // var password = document.getElementById("password").value;
    // var xmlhttp = getXMLHttpRequest();
    // xmlhttp.open("POST", ip + "/login");
    // xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         var data = xmlhttp.responseText;
    //         localStorage.setItem("user", data);
    //         location.href = "homepage.html";
    //     }
    // }
    // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xmlhttp.send("username=" + username + "&password=" + password);
    // $.ajax({
    //     url:ip + "/login",
    //     method:'post',
    //     data:$("form").serializeArray(),
    //     success:function(data){
    //         console.log(data);
    //     }
    // })
    $.post(ip+"/login",$("form").serialize(),function(data){
        localStorage.setItem("user", JSON.stringify(data));
        location.href = "homepage.html"; 
    })
}