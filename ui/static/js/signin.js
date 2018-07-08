import { baseUrl, toast } from './helpers'

// funtion to signin user
function signin (e) {
  e.preventDefault()
  const endpoint = '/auth/login'

  fetch(baseUrl + endpoint, {
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }).then(function (response) { return response.json() })
    .then(function (res) {
      if (res.message === 'Login success, welcome!') {
        localStorage.setItem('access-token', res['access-token'])
        localStorage.setItem('message', res['message'])

        if (res.role === '1') {
          location.href = 'home-admin.html'
        } else if (res.role === '2') {
          location.href = 'super-admin.html'
        } else {
          location.href = 'home-user.html'
        }
        toast('success', res.message)
      } else {
        toast('error', res.message)
      }
    })
}

// onclick listeners for login request
document.getElementById('btn-signin').addEventListener('click', signin)
