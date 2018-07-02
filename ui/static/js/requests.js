import { base_url } from './helpers';

function getUserRequests() {
    // the endoint for this request
    const endpoint = "/users/requests";
    console.log(localStorage.getItem('access-token'))

    // initialize request
    let request = new Request(base_url + endpoint,
        {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "access-token":localStorage.getItem('access-token')
            }
        }
    );
    
    fetch(request).then(
        response => {
            response.json().then(
                responseBody => {
                    
                    let table = document.getElementsByClassName("table")
                    if (responseBody.message === "You have not made any requests yet!") {
                        console.log('no records found')
                        toast("info", responseBody.message)
                        //display create request form
                        toggleRequestForm()

                    }else if(!responseBody.message) {
                        console.log('success');
                        populateReqTable(responseBody)
                        console.log(responseBody)
                        
                    }else{
                        // token invalid or authorization failed
                        toast('error', responseBody.message)
                        console.log('token issues');
                        window.location = "signin.html";
                    }
                }
            );
        }
    );
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

//post a user request
function submitUserRequest(e)
{
    e.preventDefault();

    // the endoint for this request
    const endpoint = "/users/requests";
    const type_radios = document.getElementsByName('type');
    let type_ = null;
    for (var i = 0; i < type_radios.length; i++)
    {
        if (type_radios[i].checked)
        {
            // do whatever you want with the checked radio
            type_ = type_radios[i].value

        // only one radio can be logically checked, don't check the rest
        break;
        }
    }

    // initialize request
    let request = new Request(base_url + endpoint,
        {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "access-token":localStorage.getItem('access-token')
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                title:document.getElementById('title').value,
                description:document.getElementById('description').value,
                type:type_
            })
        }
    );
    
    fetch(request).then(
        response => {
            response.json().then(
                responseBody => {
                    console.log(responseBody)
                    toast('alert', responseBody.message)
                    let table = document.getElementsByClassName("table");
                    if (responseBody.message === "You have not made any requests yet!") {
                        console.log('no records found');
                        toast("info", responseBody.message);

                    }else if(!responseBody.message) {
                        console.log('success');
                        console.log(responseBody);
                        
                    }else{
                        // token invalid or authorization failed
                        toast('error', responseBody.message)
                        console.log(responseBody);
                        window.location = "signin.html";
                    }
                }
            );
        }
    );
}

function toggleRequestForm(){
    const requestLink = document.getElementById("request-form");
    const requestDiv = document.getElementById("add-request");

    if(requestDiv.classList.contains('show-form')){
        requestDiv.classList.remove("show-form");
        requestDiv.classList.add("hide-form");
        requestLink.style.color = "white";
        requestLink.innerHTML = "Make Request";

    }else{
        requestLink.innerHTML = "Hide Request Form";
        requestDiv.classList.remove("hide-form");        
        requestDiv.classList.add("show-form");
    }    
}

function populateReqTable(userRequests)
{
    //get table on page by htmltag, 0 gets obj of the first table in the page
    const table = document.getElementsByTagName("tbody")[0];
    for(request in userRequests)
    {
        let data = userRequests[request]
        const newRow = table.insertRow(0)
        //insert td cells

        const id = newRow.insertCell(0)
        const title = newRow.insertCell(1)
        const description = newRow.insertCell(2)
        const type = newRow.insertCell(3)
        const date_requested = newRow.insertCell(4)
        const status = newRow.insertCell(5)
        const actions = newRow.insertCell(6)

        id.innerHTML = request
        title.innerHTML = data['title']
        description.innerHTML = data['description']
        type.innerHTML = data['type']
        date_requested.innerHTML = data['created_at']
        status.innerHTML = data['status']
        actions.innerHTML = requestActions(data['status'], data['id'])
    }

}

function requestActions(status, id)
{
    if(status == 'open'){
        return "<button id='edit-request'>Edit</button>"
    }else{
        return "<button id='view-request'>View</button>"
    }
}
getUserRequests()
document.getElementById('submit-request').addEventListener('click', submitUserRequest);
 