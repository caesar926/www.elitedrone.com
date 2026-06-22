 const freqButtons = document.querySelectorAll('#freqToggle button');
  let frequency = 'once';
  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      frequency = btn.dataset.freq;
    });
  });

  const amountInput = document.getElementById('donationAmount');
  const amountError = document.getElementById('amountError');
  const donateBtn = document.getElementById('donateBtn');

  donateBtn.addEventListener('click', () => {
    const amount = Number(amountInput.value);

    if (!amountInput.value || amount <= 0) {
      amountError.textContent = 'Enter an amount greater than $0.';
      return;
    }

    amountError.textContent = '';
    const label = frequency === 'monthly' ? `$${amount}/month` : `$${amount}`;
    donateBtn.textContent = `Thank you — ${label} ✓`;

    setTimeout(() => {
      donateBtn.textContent = 'Donate';
      amountInput.value = '';
    }, 2200);
  });