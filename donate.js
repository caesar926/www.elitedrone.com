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
  const donateBtn = document.querySelector('.floating-donate');

  donateBtn.addEventListener('click', () => {
   
    donateBtn.textContent = 'Opening Facebook…';
    setTimeout(() => {
      window.open('https://www.facebook.com/profile.php?id=61591293336308', '_blank', 'noopener');
      donateBtn.textContent = 'Continue on Facebook →';
      closeModal();
    }, 600);
  });

 
