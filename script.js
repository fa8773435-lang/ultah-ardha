(() => {
  'use strict';
  const scenes = [...document.querySelectorAll('.scene')];
  const counter = document.getElementById('counter');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const dateDisplay = document.getElementById('dateDisplay');
  const feedback = document.getElementById('feedback');
  const options = document.getElementById('dateOptions');
  const music = document.getElementById('music');
  const musicToggle = document.getElementById('musicToggle');
  let current = 0;
  let unlocked = false;
  let musicOn = false;

  function showScene(index) {
    if (index < 0 || index >= scenes.length || (index > 1 && !unlocked)) return;
    scenes.forEach((scene, i) => {
      scene.classList.toggle('active', i === index);
      scene.setAttribute('aria-hidden', String(i !== index));
      if (i === index) scene.scrollTop = 0;
    });
    current = index;
    const number = String(index + 1).padStart(2, '0');
    counter.textContent = `${number} / 08`;
    progressLabel.textContent = `${number} — 08`;
    progressFill.style.width = `${((index + 1) / scenes.length) * 100}%`;
  }
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScene(current + 1)));
  document.getElementById('home').addEventListener('click', event => { event.preventDefault(); showScene(0); });

  function resetGame() {
    unlocked = false;
    dateDisplay.textContent = '_ _ _ _ _ _';
    feedback.textContent = 'Pilih salah satu tanggal di atas.';
    feedback.className = 'feedback';
    options.querySelectorAll('button').forEach(button => { button.disabled = false; button.classList.remove('selected'); });
  }
  options.addEventListener('click', event => {
    const button = event.target.closest('[data-value]');
    if (!button || button.disabled || unlocked) return;
    const answer = button.dataset.value;
    button.classList.add('selected');
    dateDisplay.textContent = answer.split('').join(' ');
    if (answer === '151225') {
      unlocked = true;
      feedback.textContent = 'Kunci terbuka! Kejutan untukmu dimulai 🤎';
      feedback.className = 'feedback success';
      options.querySelectorAll('button').forEach(item => item.disabled = true);
      window.setTimeout(() => showScene(2), 1000);
    } else {
      feedback.textContent = 'Kunci salah! Coba tanggal yang lain, ya.';
      feedback.className = 'feedback error';
      const card = document.querySelector('.lock');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      window.setTimeout(() => { button.classList.remove('selected'); dateDisplay.textContent = '_ _ _ _ _ _'; feedback.textContent = 'Belum tepat. Coba sekali lagi 🤎'; feedback.className = 'feedback'; }, 850);
    }
  });
  document.getElementById('resetGame').addEventListener('click', resetGame);
  document.getElementById('restart').addEventListener('click', () => { resetGame(); showScene(0); });

  // November 2001 starts on Thursday; 7 November 2001 was Wednesday.
  const calendar = document.getElementById('calendarDays');
  const offset = new Date(2001, 10, 1).getDay();
  const daysInMonth = new Date(2001, 11, 0).getDate();
  for (let i = 0; i < offset; i++) {
    const blank = document.createElement('span'); blank.setAttribute('aria-hidden', 'true'); calendar.appendChild(blank);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = day === 7 ? document.createElement('button') : document.createElement('span');
    cell.textContent = day;
    cell.style.animationDelay = `${(offset + day) * 22}ms`;
    if (day === 7) {
      cell.type = 'button'; cell.className = 'special';
      cell.setAttribute('aria-label', '7 November 2001, tanggal kelahiran Mas Ardha');
      cell.addEventListener('click', () => {
        const message = document.getElementById('calendarMessage');
        message.innerHTML = '<small>THE DAY YOU WERE BORN</small><p>7 November 2001 — hari ketika manusia favoritku hadir. 🤎</p>';
        message.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:500});
      });
    }
    calendar.appendChild(cell);
  }

  musicToggle.addEventListener('click', async () => {
    if (!musicOn) {
      try { await music.play(); musicOn = true; musicToggle.textContent = '♫'; musicToggle.setAttribute('aria-label', 'Matikan musik'); }
      catch { musicToggle.title = 'Tambahkan assets/birthday-music.mp3 untuk menggunakan musik'; }
    } else { music.pause(); musicOn = false; musicToggle.textContent = '♪'; musicToggle.setAttribute('aria-label', 'Aktifkan musik'); }
  });
  music.addEventListener('error', () => { musicOn = false; musicToggle.textContent = '♪'; });
  resetGame();
  showScene(0);
})();
