$(document).ready(() => {
  fetch('/api/auth.getLoggedInUserData', {
    method: 'POST',
  }).then(r => {
    return r.json()
  }).then(data => {
    $("#username").text(`${data.firstname} ${data.lastname ? data.lastname : ''}`)
  }).catch(e => {
    console.log(e.message)
  })
})