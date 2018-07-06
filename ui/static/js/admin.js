import { baseUrl, toast } from './helpers'

function getRequests () {
  // the endoint for this request
  const endpoint = '/requests'

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
          if (responseBody.message === 'There are no requests yet!') {
            toast('info', responseBody.message)
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

function populateReqTable (allRequests) {
  Object.values(allRequests).forEach(request => {
    insertRequest(request)
  })
}

function insertRequest (request) {
  const table = document.getElementsByTagName('tbody')[0]
  const newRow = table.insertRow(0)

  // insert td cells
  const id = newRow.insertCell(0)
  const userId = newRow.insertCell(1)
  const title = newRow.insertCell(2)
  const type = newRow.insertCell(3)
  const description = newRow.insertCell(4)
  const dateRequested = newRow.insertCell(5)
  const status = newRow.insertCell(6)
  const actions = newRow.insertCell(7)

  id.innerHTML = request.request_id
  userId.innerHTML = request.user_id
  title.innerHTML = request.title
  description.innerHTML = request.description
  type.innerHTML = request.type
  dateRequested.innerHTML = request.created_at
  status.innerHTML = request.status
  actions.innerHTML = requestActions(request.status, request.request_id)
}

function requestActions (status, id) {
  if (status === 'open') {
    return `<button class="fa fa-check" onclick="action('approve')"></button>
    <button class="fa fa-times" onclick="action('disapprove')"></button>
    <button class="fa fa-eye" onclick="toggleRequestDetails()"></button>`
  } else if (status === 'pending') {
    return `<button onclick="action('resolve')">Resolve</button>
    <button class="fa fa-eye" onclick="toggleRequestDetails()"></button>`
  } else {
    return `<button class="fa fa-eye" onclick="toggleRequestDetails()"></button>`
  }
}

getRequests()
