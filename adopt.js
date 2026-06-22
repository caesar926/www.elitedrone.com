// mobile nav — same pattern as the homepage
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // ---- multi-filter logic ----
  const petCards = document.querySelectorAll('#petGrid .pet-card');
  const speciesChips = document.querySelectorAll('#speciesChips .chip');
  const sizeChips = document.querySelectorAll('#sizeChips .chip');
  const noResults = document.getElementById('noResults');

  let activeSpecies = 'all';
  let activeSize = 'all';

  function applyFilters(){
    let visibleCount = 0;
    petCards.forEach(card => {
      const speciesMatch = activeSpecies === 'all' || card.dataset.species === activeSpecies;
      const sizeMatch = activeSize === 'all' || card.dataset.size === activeSize;
      const show = speciesMatch && sizeMatch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  speciesChips.forEach(chip => {
    chip.addEventListener('click', () => {
      speciesChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSpecies = chip.dataset.species;
      applyFilters();
    });
  });

  sizeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sizeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSize = chip.dataset.size;
      applyFilters();
    });
  });

  // ---- adoption modal, reused per pet card ----
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalPetName = document.getElementById('modalPetName');
  const applyButtons = document.querySelectorAll('.apply-btn');
  const submitBtn = document.getElementById('modalSubmit');

  function openModal(petName){
    modalPetName.textContent = petName;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

 applyButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.pet));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', e => { if(e.target === modalBackdrop) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
  submitBtn.addEventListener('click', () => {
    submitBtn.textContent = 'Opening Facebook…';
    setTimeout(() => {
      window.open('https://www.facebook.com/EliteDroneRecrovery', '_blank', 'noopener');
      submitBtn.textContent = 'Continue on Facebook →';
      closeModal();
    }, 600);
  });