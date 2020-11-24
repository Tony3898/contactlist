$("#login").on('click', (e) => {
  e.preventDefault()
  $("#login").append("  <i class=\"fa fa-spinner fa-spin loading\"></i>");
  let email = $("#email").val().trim()
  let password = $("#password").val().trim()

  $("#emailError").text('')
  $("#passwordError").text('')
  let emptyMsg = 'Cannot be empty';

  if (email === '') {
    $("#emailError").text(emptyMsg).css("color", 'red')
    $(".loading").remove();
    return
  }

  if (password === '') {
    $("#passwordError").text(emptyMsg).css("color", 'red')
    $(".loading").remove();
    return
  }

  fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password})
  }).then(r => {
    if (r.ok) {
      window.location.href = r.url
    }
  }).catch(e => {
    $("#formError").text(e.message).css('color', 'red')
    $(".loading").remove();
  })

})