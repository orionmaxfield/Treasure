// Mobile nav toggle
document.querySelectorAll('.nav-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = document.getElementById('nav');
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// Contact form: submit to Formspree without leaving the page.
// If JavaScript fails for any reason, the form still posts normally.
document.querySelectorAll('form[data-contact]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    var success = form.parentElement.querySelector('.form-success');
    var error = form.querySelector('.form-error');
    button.disabled = true;
    button.textContent = 'Sending…';
    error.classList.remove('show');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.style.display = 'none';
        success.classList.add('show');
        success.focus();
      } else {
        throw new Error('bad response');
      }
    }).catch(function () {
      error.classList.add('show');
      button.disabled = false;
      button.textContent = 'Send my request';
    });
  });
});
