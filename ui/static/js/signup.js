import { baseUrl, toast } from './helpers'

// funtion to signup user
function signup (e) {
  e.preventDefault()
  const endpoint = '/auth/register'

  fetch(baseUrl + endpoint, {
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      first_name: document.getElementById('fname').value,
      last_name: document.getElementById('lname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confirm_password: document.getElementById('confirm_password').value
    })
  }).then(function (response) { return response.json() })
    .then(function (res) {
      console.log(res.message)
      if (res.message === 'Registration successfull') {
        toast('success', res.message)
        localStorage.setItem('message', res['message'])
        location.href = 'signin.html'
      } else {
        toast('error', res.message)
      }
    })
}

// onclick listenerss for signup request
document.getElementById('btn-signup').addEventListener('click', signup)
