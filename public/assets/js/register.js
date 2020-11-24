$("#registerForm").on('submit', (e) => {
  e.preventDefault()
  $("#register").attr('disabled', true).append("<i class=\"fa fa-spinner fa-spin loading\"></i>");
  let firstname = $("#first").val().trim()
  let lastname = $("#last").val().trim()
  let email = $("#email").val().trim()
  let password = $("#password").val().trim()

  fetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({firstname, lastname, email, password})
  }).then(r => {
    if (r.status === 404 || r.status === 200) {
      return r.json()
    }
  }).then(function (data) {
    if (data.type === 'error') {
      $("#formError").text(data.message).css('color', 'red')
    } else {
      $("#formError").text('new user username: ' + $("#email").val().trim().split("@")[0]).css('color', 'green')
    }
    $("#register").attr('disabled', false)
    $(".loading").remove();
  }).catch(e => {
    $("#formError").text(e.message).css('color', 'red')
    $("#register").attr('disabled', false)
    $(".loading").remove();
  })
})