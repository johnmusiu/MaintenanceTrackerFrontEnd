import { baseUrl, toast } from './helpers'

// funtion to signup user
function signup (e) {
  e.preventDefault()
  const endpoint = '/admin'

  fetch(baseUrl + endpoint, {
    headers: {
      'content-type': 'application/json',
      'access-token': localStorage.getItem('access-token')
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
      if (res.message === 'Admin created successfully') {
        toast('success', res.message)
        // location.reload()
      } else if (res.message === 'Token is missing! Login to get token.' ||
      res.message === 'Token is invalid!') {
        localStorage.setItem('message', res['message'])
        location.href = 'signin.html'
      } else {
        toast('error', res.message)
        if (res.error) toast('error', res.error)
      }
    })
}

// onclick listenerss for signup request
document.getElementById('btn-signup-admin').addEventListener('click', signup)
