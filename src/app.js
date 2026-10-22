const slides = [...document.querySelectorAll('[data-slide]')];

if (slides.length > 0) {
  const previous = document.querySelector('#previous-slide');
  const next = document.querySelector('#next-slide');
  const fill = document.querySelector('#progress-fill');
  const notesPanel = document.querySelector('#notes-panel');
  const notesContent = document.querySelector('#notes-content');
  const notesToggle = document.querySelector('#notes-toggle');
  const notesClose = document.querySelector('#notes-close');
  const notes = [
    '<strong>Purpose:</strong> establish a concrete local question without inventing a loss rate.<br><br><strong>Say:</strong> Bengaluru has multiple water records. JalTrace asks whether a linked evidence chain can make one delivery explainable. This is a research hypothesis and all demo data is synthetic.',
    '<strong>Purpose:</strong> show that the team researched alternatives instead of claiming a generic app is novel.<br><br><strong>Say:</strong> booking, delivery records, building meters and utility telemetry already exist. Our narrow hypothesis is the permit-aware chain, and we are explicit that it still needs validation.',
    '<strong>Purpose:</strong> make IoT and failure handling credible.<br><br><strong>Say:</strong> the field path is planned. The current build is a local rule engine. Missing, stale or impossible readings become reviewable evidence gaps, not automatic legal conclusions.',
    '<strong>Purpose:</strong> demonstrate behaviour, not dashboard decoration.<br><br><strong>Say:</strong> run a normal match, trigger a mismatch, remove a link, then recover. Point to the denominator and provenance badge. The app is a deterministic software simulation.',
    '<strong>Purpose:</strong> close with feasibility and honesty.<br><br><strong>Say:</strong> ₹0 refers to the software demo. A real pilot needs meters, calibration, power, connectivity, maintenance and cooperation. The next milestone is five operator conversations and one field validation plan.',
  ];

  let current = 0;
  const setSlide = (index, updateUrl = true) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.hidden = !active;
    });
    if (fill) fill.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (notesContent) notesContent.innerHTML = notes[current];
    if (updateUrl) history.replaceState(null, '', `/?slide=${current + 1}`);
  };

  const querySlide = Number(new URLSearchParams(location.search).get('slide'));
  if (Number.isInteger(querySlide) && querySlide > 0 && querySlide <= slides.length) current = querySlide - 1;
  setSlide(current, false);

  previous?.addEventListener('click', () => setSlide(current - 1));
  next?.addEventListener('click', () => setSlide(current + 1));
  document.addEventListener('keydown', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); setSlide(current - 1); }
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); setSlide(current + 1); }
    if (event.key.toLowerCase() === 'n') toggleNotes();
    if (event.key === 'Home') { event.preventDefault(); setSlide(0); }
    if (event.key === 'End') { event.preventDefault(); setSlide(slides.length - 1); }
  });

  function toggleNotes(force) {
    const open = typeof force === 'boolean' ? force : !notesPanel.classList.contains('is-open');
    notesPanel.classList.toggle('is-open', open);
    notesPanel.setAttribute('aria-hidden', String(!open));
    notesToggle?.setAttribute('aria-expanded', String(open));
  }
  notesToggle?.addEventListener('click', () => toggleNotes());
  notesClose?.addEventListener('click', () => toggleNotes(false));

  document.querySelectorAll('[data-demo-scenario]').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = `demo.html?scenario=${encodeURIComponent(button.dataset.demoScenario)}`;
    });
  });
}
