// onclick listenerss for signup request
document.getElementById('btn-signup').addEventListener('click', signup);

// funtion to signup user
function signup(e){
    e.preventDefault();
    
    const url = "http://127.0.0.1:5000/api/v2/auth/register";

+    fetch(url, {
        headers: {
            "content-type":"application/json"
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
            first_name:document.getElementById('fname').value,
            last_name:document.getElementById('lname').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value,
            confirm_password:document.getElementById('confirm_password').value,
        })
    })
    .then(function(response){ return response.json();})
    .then(function(res){ 
        console.log(res.message);
        if(res.message === "Registration successfull"){
            toast("success", res.message);
            location.href = "signin.html";
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