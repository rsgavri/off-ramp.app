'use strict';
(() => {
  const form = document.getElementById('support-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
  });
})();
