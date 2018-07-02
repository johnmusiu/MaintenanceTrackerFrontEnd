export const base_url = "http://127.0.0.1:5000/api/v2";

export function toast(type, message){
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