 // mobile nav toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }));

  // board filters
  const chips = document.querySelectorAll('.chip');
  const boardGrid = document.getElementById('boardGrid');

  function applyBoardFilter(filter){
    document.querySelectorAll('#boardGrid .card').forEach(card => {
      const show = filter === 'all' || card.dataset.status === filter;
      card.style.display = show ? '' : 'none';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyBoardFilter(chip.dataset.filter);
    });
  });

  // ---- live relative timestamps ----
  function formatAgo(ms){
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'JUST NOW';
    if (mins < 60) return `${mins}M AGO`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}H AGO`;
    const days = Math.floor(hours / 24);
    return `${days}D AGO`;
  }

  function updateTimestamps(){
    document.querySelectorAll('#boardGrid .card[data-time]').forEach(card => {
      const elapsed = Date.now() - Number(card.dataset.time);
      const verb = card.dataset.event === 'closed' ? 'CLOSED' : 'FILED';
      const span = card.querySelector('.time-ago');
      if (span) span.textContent = `${verb} ${formatAgo(elapsed)}`;
    });
  }

  function seedTime(id, msAgo){
    const card = document.getElementById(id);
    if (card) card.dataset.time = Date.now() - msAgo;
  }

  seedTime('card-0252', 40 * 60000);
  seedTime('card-0247', 5 * 3600000);
  seedTime('card-0241', 24 * 3600000);
  seedTime('card-0249', 8 * 60000);
  seedTime('card-0250', 3 * 60000);
  seedTime('card-0233', 24 * 3600000);
  seedTime('card-0254', 12 * 60000);
  seedTime('card-0198', 4 * 24 * 3600000);

  updateTimestamps();
  setInterval(updateTimestamps, 30000);

  // report modal
  const modalBackdrop = document.getElementById('modalBackdrop');
  const openModalBtns = [document.getElementById('reportBtn'), document.getElementById('reportBtnHero')];
  const closeModalBtn = document.getElementById('modalClose');
  const submitBtn = document.getElementById('modalSubmit');

  function openModal(){
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  openModalBtns.forEach(btn => btn && btn.addEventListener('click', openModal));

  closeModalBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => { 
    if(e.target === modalBackdrop) closeModal(); 
  });

  document.addEventListener('keydown', (e) => { 
    if(e.key === 'Escape') closeModal(); 
  });
  let caseCounter = 255;

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('petName').value.trim();
    const lastSeenLocation = document.getElementById('lastSeen').value.trim();
    const description = document.getElementById('petDesc').value.trim();

    if (!name || !lastSeenLocation) {
      alert("Please fill in at least the pet's name and last seen location.");
      return;
    }

    if (name && lastSeenLocation) {
      submitBtn.textContent = 'Redirecting...';
      setTimeout(() => {     
      window.location.href="donate.html";
      closeModal();
    }, 600)
   
    }
    const caseNum = caseCounter++;
    const metaText = description ? `Last seen ${lastSeenLocation} — ${description}` : `Last seen ${lastSeenLocation}`;
    const cardId = `card-new-${caseNum}`;

    const cardHTML = `
      <article class="card" data-status="active" id="${cardId}" data-event="filed">
        <span class="pin"></span>
        <div class="card-photo"><svg class="icon"><use href="#icon-paw"/></svg></div>
        <span class="tag active">Active search</span>
        <h4>${name}</h4>
        <p class="meta">${metaText}</p>
        <p class="case">CASE #0${caseNum} · <span class="time-ago"></span></p>
      </article>
    `;
    boardGrid.insertAdjacentHTML('afterbegin', cardHTML);
    seedTime(cardId, 0);
    updateTimestamps();

    // reset the filter to "All" so the brand-new case is guaranteed to be visible
    chips.forEach(c => c.classList.remove('active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('active');
    applyBoardFilter('all');

    document.getElementById('petName').value = '';
    document.getElementById('lastSeen').value = '';
    document.getElementById('petDesc').value = '';

  const petData = {
    petName: petName.value,
    lastseen:lastseen.value,
    description:petDesc.value,
    CreatedAt:Date.now()
  };


  });

  