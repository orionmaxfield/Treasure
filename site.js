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

// Pre-select a therapist when someone arrives from a "Request an appointment with ..." button
// (contact.html?therapist=Name). Falls back to "No preference" if the name isn't in the list.
(function () {
  var wanted = new URLSearchParams(window.location.search).get('therapist');
  if (!wanted) return;
  document.querySelectorAll('select[name="therapist"]').forEach(function (select) {
    var match = Array.prototype.find.call(select.options, function (opt) {
      return opt.text.trim().toLowerCase() === wanted.trim().toLowerCase();
    });
    if (match) select.value = match.value || match.text;
  });
})();

// Photos live in /images. Until a file is added there, fall back to the old
// Wix photo (data-fallback), an initials block (data-initials), or hide it (data-optional).
(function () {
  function replaceWithInitials(img) {
    var box = document.createElement('div');
    box.className = 'photo-pending';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', img.alt);
    box.innerHTML = '<span></span>';
    box.firstChild.textContent = img.getAttribute('data-initials');
    img.replaceWith(box);
  }
  function handle(img) {
    var fallback = img.getAttribute('data-fallback');
    if (fallback && img.src !== fallback) { img.removeAttribute('data-fallback'); img.src = fallback; return; }
    if (img.hasAttribute('data-initials')) { replaceWithInitials(img); return; }
    if (img.hasAttribute('data-optional')) { img.remove(); }
  }
  document.querySelectorAll('img[data-fallback], img[data-initials], img[data-optional]').forEach(function (img) {
    img.addEventListener('error', function () { handle(img); });
    if (img.complete && img.naturalWidth === 0) handle(img);
  });
})();
