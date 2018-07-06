const baseUrl = 'http://127.0.0.1:5000/api/v2'

function viewEditUserRequest () {
  // get table on page by htmltag, 0 gets obj of the first table in the page
  const table = document.getElementsByTagName('table')[0]
  // from table obj get tr rows list
  const rows = table.getElementsByTagName('tr')
  // loop through rows list
  for (var i = 1; i < rows.length; i++) {
    // row object
    var row = rows[i]
    // Track with onclick(a row with a clicked event will trigger this)
    row.onclick = function () {
      let rowId = this.rowIndex
      let rowClicked = rows[rowId]
      let rowData = rowClicked.getElementsByTagName('td')

      let editRequestForm = document.getElementById('edit-request')

      document.getElementById('edit-title').value = rowData[1].innerText
      document.getElementById('edit-description').value = rowData[2].innerText
      document.getElementById('edit-id').value = rowData[0].innerText

      if (rowData[3].innerText === 'Maintenance') {
        document.getElementById('Maintenance').checked = true
      } else if (rowData[3].innerText === 'Repair') {
        document.getElementById('Repair').checked = true
      }

      editRequestForm.classList.remove('hide-form')
      editRequestForm.scrollIntoView(false)
    }
  }
}

// toggle navbar for small screen devices by adding responsive class to navbar
function toggleNavbar () {
  const navbar = document.getElementById('topnav')
  if (navbar.className === 'topnav') {
    navbar.classList.add('responsive')
  } else {
    navbar.classList.remove('responsive')
  }
}

function toggleRequestDetails () {
  // get table on page by htmltag, 0 gets obj of the first table in the page
  const table = document.getElementsByTagName('table')[0]
  // from table obj get tr rows list
  const rows = table.getElementsByTagName('tr')
  // loop through rows list
  for (var i = 1; i < rows.length; i++) {
    // row object
    var row = rows[i]
    // Track with onclick(a row with a clicked event will trigger this)
    row.onclick = function () {
      var rowIndex = this.rowIndex
      insertDescRow(table, rows, rowIndex)
    }
  }
}

// create row for request description
function insertDescRow (table, rows, rowIndex) {
  const row = rows[rowIndex]
  console.log((rowIndex + 1) + ' ' + rows.length)
  // if not last row, check if row should be added or deleted
  if (rows.length !== rowIndex + 1) {
    const nextRow = rows[rowIndex + 1]
    if (nextRow.classList.contains('shown')) {
      // delete that row
      table.deleteRow(rowIndex + 1)
      stop()
    } else {
      // create a details row
      createRow(table, rowIndex, row)
    }
  } else {
    createRow(table, rowIndex, row)
  }
}

function createRow (table, rowIndex, row) {
  // create new row below the row where button was clicked
  const newRow = table.insertRow(rowIndex + 1)
  // get data from the row whose details need to be viewwd
  // this data can come from json obj for row given data is being
  // retrieved from somewhere eg, a db
  const rowData = row.getElementsByTagName('td')
  newRow.classList.add('shown')
  // insert td cells
  const tdataIndex = newRow.insertCell(0)
  const tdataDetails = newRow.insertCell(1)
  // colspan cell with details
  tdataDetails.colSpan = 8
  tdataIndex.innerText = ''

  tdataDetails.innerHTML = `<p> Name: <strong>${rowData[1].innerText}</strong> </p>`
  tdataDetails.innerHTML += `<p> Title: <strong>${rowData[2].innerText}</strong> </p>`
  tdataDetails.innerHTML += `<p> Type: <strong>${rowData[3].innerText}</strong> </p>`
  tdataDetails.innerHTML += `<p> Time requested: <strong>${rowData[5].innerText}</strong> </p>`
  tdataDetails.innerHTML += `<p> Description: <strong>${rowData[4].innerText}</strong> </p>`
  tdataDetails.innerHTML += `<p> Status: <strong>${rowData[7].innerText}</strong></p>`
}

function action (type) {
  // get table on page by htmltag, 0 gets obj of the first table in the page
  const table = document.getElementsByTagName('table')[0]
  // from table obj get tr rows list
  const rows = table.getElementsByTagName('tr')
  // loop through rows list
  for (var i = 1; i < rows.length; i++) {
    // row object
    var row = rows[i]
    // Track with onclick(a row with a clicked event will trigger this)
    row.onclick = function () {
      let rowId = this.rowIndex
      let rowClicked = rows[rowId]
      let rowData = rowClicked.getElementsByTagName('td')

      var endpoint

      if (type === 'approve') {
        endpoint = '/requests/' + rowData[0].innerText + '/approve'
      } else if (type === 'disapprove') {
        endpoint = '/requests/' + rowData[0].innerText + '/disapprove'
      } else if (type === 'resolve') {
        endpoint = '/requests/' + rowData[0].innerText + '/resolve'
      }
      // initialize request
      let request = new Request(baseUrl + endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token')
        },
        mode: 'cors'
      })

      fetch(request).then(
        response => {
          response.json().then(
            responseBody => {
              if (responseBody.message === 'Request disapproved successfully' ||
              responseBody.message === 'Request approved successfully' ||
              responseBody.message === 'Request resolved successfully') {
                toast('success', responseBody.message)
                document.location.reload(false)
              } else {
                toast('error', 'Session expired, login again to continue.')
                window.location = 'signin.html'
              }
            })
        })
    }
  }
}

function toast (type, message) {
  const toastMessage = document.createElement('P')
  if (type === 'error') {
    toastMessage.classList.add('error')
  } else if (type === 'success') {
    toastMessage.classList.add('success')
  } else {
    toastMessage.classList.add('info')
  }

  var response = document.createTextNode(message)

  toastMessage.appendChild(response)
  document.body.appendChild(toastMessage)
}
