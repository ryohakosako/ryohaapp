'use strict';
const icons = {
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10" r="1"/><circle cx="11" cy="6.5" r="1"/><circle cx="16" cy="9" r="1"/><path d="M12 21c-2-2 0-5 2-5h2a3 3 0 0 0 3-3"/>',
  app: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/>'
};
function makeIcon(name) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  // アイコンのSVGはこのファイル内の固定文字列のみを使用
  svg.innerHTML = icons[name] || icons.app;
  svg.setAttribute('aria-hidden', 'true');
  return svg;
}
function safeUrl(raw) {
  if (!raw || typeof raw !== 'string') return '';
  try {
    const u = new URL(raw, document.baseURI);
    return ['https:', 'http:'].includes(u.protocol) ? u.href : '';
  } catch { return ''; }
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function makeLink(label, url, className) {
  const a = el('a', className, label);
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}
async function fetchVersion(app, badge, date) {
  const versionUrl = safeUrl(app.versionUrl);
  if (!versionUrl) {
    badge.textContent = 'VERSION —';
    return;
  }
  try {
    const response = await fetch(versionUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (typeof data.version !== 'string' || !data.version.trim()) throw new Error('Invalid version');
    badge.textContent = data.version;
    if (typeof data.updated === 'string' && data.updated.trim()) {
      date.textContent = `最終更新 ${data.updated}`;
    }
  } catch (error) {
    badge.textContent = '取得できません';
    badge.title = 'バージョン情報を取得できませんでした';
    console.warn(`Version fetch failed: ${app.id}`, error);
  }
}
function renderApp(app) {
  const card = el('article', 'app-card');
  const top = el('div', 'card-top');
  const iconBox = el('div', 'app-icon');
  iconBox.append(makeIcon(app.icon));
  const state = el('span', app.status === 'published' ? 'state published' : 'state development', app.status === 'published' ? '公開中' : '開発中');
  top.append(iconBox, state);
  const title = el('h3', 'app-name', app.name);
  const description = el('p', 'app-description', app.description || '');
  const bottom = el('div', 'card-bottom');
  const info = el('div', 'version-info');
  const badge = el('span', 'version', '確認中…');
  const date = el('span', 'updated', '');
  info.append(badge, date);
  bottom.append(info);
  const url = safeUrl(app.url);
  if (app.status === 'published' && url) {
    const link = makeLink('アプリを開く ↗', url, 'open-link');
    bottom.append(link);
  } else {
    bottom.append(el('span', 'unavailable', '準備中'));
  }
  const changeUrl = safeUrl(app.changelogUrl);
  if (changeUrl) card.append(top, title, description, bottom, makeLink('更新履歴を見る →', changeUrl, 'changelog-link'));
  else card.append(top, title, description, bottom);
  fetchVersion(app, badge, date);
  return card;
}
function init() {
  const grid = document.getElementById('app-grid');
  const apps = Array.isArray(window.APP_LIST) ? window.APP_LIST : [];
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('app-count').textContent = `${apps.length} ${apps.length === 1 ? 'APP' : 'APPS'}`;
  if (!apps.length) grid.append(el('p', 'empty', 'アプリはまだ登録されていません。'));
  apps.forEach(app => grid.append(renderApp(app)));
}
init();
