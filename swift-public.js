document.addEventListener('click', function (event) {
  const button = event.target.closest && event.target.closest('.copy-btn');
  if (button) {
    const value = button.parentElement && button.parentElement.querySelector('span');
    if (!value || !navigator.clipboard) return;
    navigator.clipboard.writeText(value.textContent.trim()).then(function () {
      button.textContent = '✅ Copied!';
      button.classList.add('copied');
      setTimeout(function () {
        button.textContent = '📋 Copy';
        button.classList.remove('copied');
      }, 2000);
    });
    return;
  }

  const countryCard = event.target.closest && event.target.closest('.country-card');
  if (countryCard) {
    event.preventDefault();
    const nameEl = countryCard.querySelector('.country-name');
    const searchInput = document.getElementById('sb') || document.getElementById('searchBox') || document.getElementById('search');
    if (nameEl && searchInput) {
      searchInput.value = nameEl.textContent.trim();
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

document.addEventListener('input', function (event) {
  const input = event.target;
  if (!input || !['sb', 'searchBox', 'search'].includes(input.id)) return;
  const query = String(input.value || '').toLowerCase();
  document.querySelectorAll('.bank-card,.country-card').forEach(function (card) {
    const haystack = String(card.dataset.s || card.dataset.search || card.textContent || '').toLowerCase();
    card.style.display = haystack.includes(query) ? '' : 'none';
  });
});
