export const baseUrl = 'https://gentle-sands-32555.herokuapp.com/api/v2'

export function toast (type, message) {
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

  // After 5 seconds, remove the show class from DIV
  setTimeout(function () {
    toastMessage.className = toastMessage.className.replace('error', 'hide')
    toastMessage.className = toastMessage.className.replace('success', 'hide')
    toastMessage.className = toastMessage.className.replace('info', 'hide')
  }, 6000)
}
