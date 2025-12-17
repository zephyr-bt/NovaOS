const container = document.getElementById('window-container');
const menu = document.getElementById('menu');

function login() {
  document.getElementById('login-screen').style.display = 'none';
}

function toggleMenu() {
  menu.classList.toggle('open');
}

function openApp(app) {
  toggleMenu();

  const win = document.createElement('div');
  win.className = 'window';

  let content = '';

  if (app === 'files') content = '<p>index.html<br>style.css<br>script.js</p>';
  if (app === 'settings') content = '<p>NovaOS v2<br>Dark Theme</p>';
  if (app === 'terminal') content = terminalUI();

  win.innerHTML = `
    <div class="window-header">
      <span>${app.toUpperCase()}</span>
      <div class="window-controls">
        <button onclick="this.closest('.window').remove()">✕</button>
      </div>
    </div>
    <div class="window-body">${content}</div>
  `;

  container.appendChild(win);
  dragWindow(win);
}

function dragWindow(win) {
  const header = win.querySelector('.window-header');
  let x = 0, y = 0, drag = false;

  const start = e => {
    drag = true;
    const t = e.touches ? e.touches[0] : e;
    x = t.clientX - win.offsetLeft;
    y = t.clientY - win.offsetTop;
  };

  const move = e => {
    if (!drag) return;
    const t = e.touches ? e.touches[0] : e;
    win.style.left = t.clientX - x + 'px';
    win.style.top = t.clientY - y + 'px';
  };

  header.onmousedown = start;
  header.ontouchstart = start;
  document.onmousemove = move;
  document.ontouchmove = move;
  document.onmouseup = () => drag = false;
  document.ontouchend = () => drag = false;
}

function terminalUI() {
  return `<div id="terminal">
    <div class="line">NovaOS Terminal</div>
    <input id="cmd" autofocus onkeydown="runCmd(event)" />
  </div>`;
}

function runCmd(e) {
  if (e.key !== 'Enter') return;
  const v = e.target.value.trim();
  let out = '';

  if (v === 'help') out = 'Commands: help, ls, clear, about';
  else if (v === 'ls') out = 'files settings terminal';
  else if (v === 'about') out = 'NovaOS v2 — Web OS';
  else if (v === 'clear') {
    e.target.parentElement.innerHTML = '<input id="cmd" autofocus onkeydown="runCmd(event)" />';
    return;
  } else out = 'Command not found';

  e.target.insertAdjacentHTML('beforebegin', `<div class="line">${out}</div>`);
  e.target.value = '';
}

setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);