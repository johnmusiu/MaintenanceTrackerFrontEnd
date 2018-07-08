import { baseUrl, toast } from './helpers'

function getUserRequests () {
  // the endoint for this request
  const endpoint = '/users/requests'

  // initialize request
  let request = new Request(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token')
    }
  })

  fetch(request)
    .then(response => {
      response.json().then(
        responseBody => {
          // let table = document.getElementsByClassName('table')
          if (responseBody.message === 'You have not made any requests yet!') {
            toast('info', responseBody.message)
            // display create request form
            toggleRequestForm()
          } else if (!responseBody.message) {
            populateReqTable(responseBody)
          } else {
            // token invalid or authorization failed
            toast('error', responseBody.message)
            window.location = 'signin.html'
          }
        })
    })
}

// post a user request
function submitUserRequest (e) {
  e.preventDefault()

  // the endoint for this request
  const endpoint = '/users/requests'
  const typeRadios = document.getElementsByName('type')
  let type_ = null
  for (var i = 0; i < typeRadios.length; i++) {
    if (typeRadios[i].checked) {
      // do whatever you want with the checked radio
      type_ = typeRadios[i].value

      // only one radio can be logically checked, don't check the rest
      break
    }
  }

  // initialize request
  let request = new Request(baseUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token')
    },
    mode: 'cors',
    body: JSON.stringify({
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      type: type_
    })
  })

  fetch(request).then(
    response => {
      response.json().then(
        responseBody => {
          // let table = document.getElementsByClassName('table')
          if (responseBody.message === 'You have not made any requests yet!') {
            toast('info', responseBody.message)
          } else if (responseBody.message === 'Maintenance request submitted successfully.') {
            insertRequest(responseBody)
            toast('success', responseBody.message)
            toggleRequestForm()
          } else {
            // token invalid or authorization failed
            toast('error', responseBody.message)
            // window.location = 'signin.html'
          }
        })
    })
}

function toggleRequestForm () {
  const requestLink = document.getElementById('request-form')
  const requestDiv = document.getElementById('add-request')

  if (requestDiv.classList.contains('show-form')) {
    requestDiv.classList.remove('show-form')
    requestDiv.classList.add('hide-form')
    requestLink.style.color = 'white'
    requestLink.innerHTML = 'Make Request'
  } else {
    requestLink.innerHTML = 'Hide Request Form'
    requestDiv.classList.remove('hide-form')
    requestDiv.classList.add('show-form')
  }
}

function populateReqTable (userRequests) {
  const table = document.getElementsByTagName('tbody')[0]
  table.innerHTML = ''
  Object.values(userRequests).forEach(request => {
    insertRequest(request)
  })
}

function insertRequest (request) {
  const table = document.getElementsByTagName('tbody')[0]
  const newRow = table.insertRow(0)

  // insert td cells
  const id = newRow.insertCell(0)
  const title = newRow.insertCell(1)
  const description = newRow.insertCell(2)
  const type = newRow.insertCell(3)
  const dateRequested = newRow.insertCell(4)
  const status = newRow.insertCell(5)
  const actions = newRow.insertCell(6)

  id.innerHTML = request.request_id
  title.innerHTML = request.title
  description.innerHTML = request.description
  type.innerHTML = request.type
  dateRequested.innerHTML = request.created_at
  status.innerHTML = request.status
  actions.innerHTML = requestActions(request.status, request.request_id)
}

function requestActions (status, id) {
  if (status === 'open') {
    return `<button class="fa fa-edit" onclick="viewEditUserRequest()"></button>
    <button class="fa fa-eye"></button>`
  } else {
    return `<button class="fa fa-eye"></button>`
  }
}

function editUserRequest (e) {
  e.preventDefault()

  // the endoint for this request
  const endpoint = '/users/requests/' + document.getElementById('edit-id').value

  const typeRadios = document.getElementsByName('edit-type')
  let type_ = null
  for (var i = 0; i < typeRadios.length; i++) {
    if (typeRadios[i].checked) {
      // do whatever you want with the checked radio
      type_ = typeRadios[i].value

      // only one radio can be logically checked, don't check the rest
      break
    }
  }

  // initialize request
  let request = new Request(baseUrl + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token')
    },
    mode: 'cors',
    body: JSON.stringify({
      title: document.getElementById('edit-title').value,
      description: document.getElementById('edit-description').value,
      type: type_
    })
  })

  fetch(request).then(
    response => {
      response.json().then(
        responseBody => {
          if (responseBody.message === 'Maintenance request updated successfully.') {
            toast('info', responseBody.message)
            document.getElementById('edit-request').classList.add('hide-form')
            getUserRequests()
          } else if (responseBody.message === 'Token is invalid!') {
            toast('error', 'Session expired, login again to continue.')
            window.location = 'signin.html'
          } else {
            // token invalid or authorization failed
            toast('error', responseBody.message)
            // window.location = 'signin.html'
          }
        })
    })
}

getUserRequests()

document.getElementById('submit-request').addEventListener('click', submitUserRequest)
document.getElementById('request-form').addEventListener('click', toggleRequestForm)
document.getElementById('edit-request-btn').addEventListener('click', editUserRequest)
