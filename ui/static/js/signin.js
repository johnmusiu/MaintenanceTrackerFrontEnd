// onclick listenerss for login request
document.getElementById('btn-signin').addEventListener('click', signin);



// funtion to signin user
function signin(e){
    e.preventDefault();

    const url = "http://127.0.0.1:5000/api/v2/auth/login";

    fetch(url, {
        headers: {
            "content-type":"application/json"
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
            email:document.getElementById('email').value,
            password:document.getElementById('password').value,
        })
    })
    .then(function(response){ return response.json();})
    .then(function(res){ 
        console.log(res.message);
        if(res.message === "Login success, welcome!"){
            localStorage.setItem('auth-token', res.auth_token);
            if(res.role === 1)
                location.href = "home-admin.html";
            else if(res.role === 2)
                location.href = "";
            else
                location.href = "home-user.html";

            toast("success", res.message);
        }else{
            toast("error", res.message);
        }
    })
}

function toast(type, message){
    var toastMessage = document.createElement("P");
    if(type === "error")
        toastMessage.classList.add("error");
    else if(type === "success")
        toastMessage.classList.add("success");
    else
        toastMessage.classList.add("info");
        
    var response = document.createTextNode(message);

    toastMessage.appendChild(response);
    document.body.appendChild(toastMessage);
}