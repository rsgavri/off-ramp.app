(() => {
  'use strict';
  const dialog = document.getElementById('ex-access-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const title = document.getElementById('ex-access-title');
  let opener;
  document.querySelectorAll('[data-access-open]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      title.textContent = link.dataset.accessOpen === 'signin' ? 'Sign in or get personal help' : 'Get started with Global Payment Solutions';
      dialog.showModal();
      document.documentElement.classList.add('ex-access-modal-open');
      title.focus();
    });
  });
  dialog.querySelector('[data-access-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('ex-access-modal-open');
    if (opener && opener.isConnected) opener.focus();
  });
})();
