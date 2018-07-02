import { base_url } from './helpers'
import { toast } from './helpers'

function getRequests() {
    // the endoint for this request
    const endpoint = "/requests";
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

getRequests()
