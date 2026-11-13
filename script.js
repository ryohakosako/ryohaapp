'use strict';
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
    if (!data || typeof data.version !== 'string' || !data.version.trim()) throw new Error('Invalid version');
    badge.textContent = data.version;
    if (typeof data.updated === 'string' && data.updated.trim()) {
      date.textContent = `最終更新 ${data.updated}`;
    }
    const updatedAt = typeof data.updatedAt === 'string' ? Date.parse(data.updatedAt) : NaN;
    return Number.isFinite(updatedAt) ? updatedAt : null;
  } catch (error) {
    badge.textContent = '取得できません';
    badge.title = 'バージョン情報を取得できませんでした';
    console.warn(`Version fetch failed: ${app.id}`, error);
  }
}
function renderApp(app) {
  const card = el('article', 'app-card');
  const top = el('div', 'card-top');
  const state = el('span', app.status === 'published' ? 'state published' : 'state development', app.status === 'published' ? '公開中' : '開発中');
  top.append(state);
  const title = el('h3', 'app-name');
  const url = safeUrl(app.url);
  if (app.status === 'published' && url) title.append(makeLink(app.name, url, 'app-title-link'));
  else title.textContent = app.name;
  const description = el('p', 'app-description', app.description || '');
  const bottom = el('div', 'card-bottom');
  const info = el('div', 'version-info');
  const badge = el('span', 'version', '確認中…');
  const date = el('span', 'updated', '');
  info.append(badge, date);
  bottom.append(info);
  const changeUrl = safeUrl(app.changelogUrl);
  if (changeUrl) card.append(top, title, description, bottom, makeLink('更新履歴を見る →', changeUrl, 'changelog-link'));
  else card.append(top, title, description, bottom);
  return { card, versionReady: fetchVersion(app, badge, date) };
}
async function init() {
  const grid = document.getElementById('app-grid');
  const apps = Array.isArray(window.APP_LIST) ? window.APP_LIST : [];
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('app-count').textContent = `${apps.length} ${apps.length === 1 ? 'APP' : 'APPS'}`;
  if (!apps.length) grid.append(el('p', 'empty', 'アプリはまだ登録されていません。'));
  const entries = apps.map((app, index) => ({ ...renderApp(app), index }));
  entries.forEach(({ card }) => grid.append(card));
  const resolved = await Promise.all(entries.map(async entry => ({
    ...entry, updatedAt: await entry.versionReady
  })));
  resolved.sort((a, b) => {
    const aValid = Number.isFinite(a.updatedAt);
    const bValid = Number.isFinite(b.updatedAt);
    if (aValid !== bValid) return aValid ? -1 : 1;
    return (aValid ? b.updatedAt - a.updatedAt : 0) || a.index - b.index;
  });
  resolved.forEach(({ card }) => grid.append(card));
}
init();
