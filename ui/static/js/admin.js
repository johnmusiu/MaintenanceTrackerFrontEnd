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
  Object.values(allRequests).map(insertRequest)
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
  userId.innerHTML = request.created_by
  title.innerHTML = request.title
  description.innerHTML = request.description
  type.innerHTML = request.type
  dateRequested.innerHTML = request.created_at
  status.innerHTML = request.status
  actions.innerHTML = requestActions(request.status, request.request_id)
}

function requestActions (status, id) {
  if (status === 'open') {
    return `<button class="fa fa-check" onclick="action('approve')"> Approve</button>
    <button class="fa fa-times" onclick="action('disapprove')"> Disapprove</button>
    <button class="fa fa-eye" onclick="toggleRequestDetails()"> View</button>`
  } else if (status === 'pending') {
    return `<button class="fa fa-check" onclick="action('resolve')">Resolve</button>
    <button class="fa fa-eye" onclick="toggleRequestDetails()">View</button>`
  } else {
    return `<button class="fa fa-eye" onclick="toggleRequestDetails()">View</button>`
  }
}

function search () {
  let input = document.getElementById('search').value.toUpperCase()
  let tbody = document.getElementsByTagName('table')[0].tBodies[0]
  let trows = tbody.getElementsByTagName('tr')
  for (let index = 0; index < trows.length; index++) {
    let tr = trows[index].getElementsByTagName('td')
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i]
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(input) === -1) {
          trows[index].style.display = 'none'
        } else {
          trows[index].style.display = ''
          break
        }
      }
    }
  }
}
getRequests()

document.getElementById('search').addEventListener('keyup', search)
