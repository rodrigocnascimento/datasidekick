function t(key, ...args) {
  const subs = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
  return chrome.i18n.getMessage(key, subs.length ? subs : undefined);
}

const I18N_ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];

function msgFromRef(ref) {
  let msg = chrome.i18n.getMessage(ref);
  if (!msg && !ref.endsWith('_')) msg = chrome.i18n.getMessage(`${ref}_`);
  return msg || '';
}

function replaceMsgTokens(text) {
  if (!text || !text.includes('__MSG_')) return text;
  return text.replace(/__MSG_([a-zA-Z0-9@_]+)__/g, (full, ref) => msgFromRef(ref) || full);
}

/** Chrome does not replace __MSG_*__ in extension HTML; apply at runtime. */
function applyI18n(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const next = replaceMsgTokens(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }
  root.querySelectorAll('*').forEach((el) => {
    for (const attr of I18N_ATTRS) {
      if (!el.hasAttribute(attr)) continue;
      const val = el.getAttribute(attr);
      const next = replaceMsgTokens(val);
      if (next !== val) el.setAttribute(attr, next);
    }
  });
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const icons = {
  logo: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4.5 6.5 12 10l7.5-3.5L12 3Z"/><path d="M4.5 6.5v8L12 18v-8"/><path d="M19.5 6.5v8L12 18"/><circle cx="18.5" cy="18.5" r="2.3"/></svg>',
  database: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  cube: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="M12 11 4 6.5"/><path d="m12 11 8-4.5"/><path d="M12 11v9"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l18 18"/><path d="M10.6 10.6A2 2 0 0 0 13.4 13.4"/><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c7 0 10 8 10 8a15.5 15.5 0 0 1-3.1 4.6"/><path d="M6.6 6.6C3.5 8.7 2 12 2 12s3 8 10 8a10.8 10.8 0 0 0 4.8-1.1"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3L5.8 21 7 14.2 2 9.3l6.9-1L12 2Z"/></svg>',
  settings: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.37.53.72.94.9.23.1.47.15.72.15H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"/><path d="m19 6-1 14a2.2 2.2 0 0 1-2.2 2H8.2A2.2 2.2 0 0 1 6 20L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  copy: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-9 9 9.8 9.8 0 0 1-6.7-2.7L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 9-9 9.8 9.8 0 0 1 6.7 2.7L21 8"/><path d="M16 8h5V3"/></svg>',
  save: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
  undo: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>',
  file: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
  grid: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 14.2A8.4 8.4 0 0 1 9.8 3a9 9 0 1 0 11.2 11.2Z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  help: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.6 1.4-2.9 1.6-2.9 3.5"/><path d="M12 17h.01"/></svg>',
  github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.6 2.6 3.4 1.9.1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C16 5.7 17 6 17 6c.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2"/></svg>',
  unlock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.3-2.2"/><path d="M12 14v2"/></svg>'
};

function hydrateIcons() {
  $('#appLogo').innerHTML = icons.logo;
  $('[data-icon="search"]').innerHTML = icons.search;
  $('[data-icon="database"]') && $$('[data-icon="database"]').forEach(el => el.innerHTML = icons.database);
  $$('[data-icon]').forEach(el => { const name = el.dataset.icon; if (icons[name]) el.innerHTML = icons[name]; });
  $('#railDataBtn').innerHTML = icons.database;
  $('#railSearchBtn').innerHTML = icons.search;
  $('#helpBtn').innerHTML = icons.help;
  $('#githubBtn').innerHTML = icons.github;
}

const els = {
  workspace: $('.workspace'), keyList: $('#keyList'), searchInput: $('#searchInput'), countLabel: $('#countLabel'),
  selectedKeyTitle: $('#selectedKeyTitle'), selectedTypeBadge: $('#selectedTypeBadge'), selectedSize: $('#selectedSize'),
  emptyState: $('#emptyState'), editorView: $('#editorView'), primitiveEditor: $('#primitiveEditor'), primitiveInput: $('#primitiveInput'),
  jsonEditor: $('#jsonEditor'), saveBtn: $('#saveBtn'), statusBar: $('#statusBar'), settingsPanel: $('#settingsPanel'), settingsBackdrop: $('#settingsBackdrop'),
  helpPanel: $('#helpPanel'), helpBackdrop: $('#helpBackdrop'),
  permissionState: $('#permissionState'), permissionHost: $('#permissionHost'), grantAccessBtn: $('#grantAccessBtn'),
  summaryStorage: $('#summaryStorage'), summaryItems: $('#summaryItems'), summarySize: $('#summarySize')
};

let appSettings = {
  theme: 'dark', fontSize: 14, showSizes: true, confirmDelete: true, settingsOpen: false,
  currentOriginOnly: true, hideNoisy: true, hiddenKeys: {}, favorites: {}
};

let state = {
  tabId: null, tabUrl: '', origin: '', host: '', storage: 'localStorage', entries: [], selectedKey: null, selectedRaw: '', working: null,
  isJson: false, dirty: false, collapsed: new Set(), pendingDelete: null, accessBlocked: false, helpOpen: false
};

function loadSettings() {
  try { appSettings = { ...appSettings, ...JSON.parse(localStorage.getItem('datasidekick.settings') || '{}') }; } catch {}
  applySettings();
}
function saveSettings() { localStorage.setItem('datasidekick.settings', JSON.stringify(appSettings)); applySettings(); }
function applySettings() {
  document.body.classList.toggle('light', appSettings.theme === 'light');
  document.documentElement.style.setProperty('--editor-font-size', `${appSettings.fontSize}px`);
  $('#fontSizeLabel').textContent = `${appSettings.fontSize}px`;
  $('#darkModeBtn').classList.toggle('active', appSettings.theme === 'dark');
  $('#lightModeBtn').classList.toggle('active', appSettings.theme === 'light');
  $('#showSizesToggle').classList.toggle('on', appSettings.showSizes);
  $('#confirmToggle').classList.toggle('on', appSettings.confirmDelete);
  $('#currentOriginToggle')?.classList.toggle('on', appSettings.currentOriginOnly);
  $('#hideNoisyToggle')?.classList.toggle('on', appSettings.hideNoisy);
  updateOriginUI();
  els.settingsPanel.classList.toggle('hidden', !appSettings.settingsOpen);
  els.settingsBackdrop?.classList.toggle('hidden', !appSettings.settingsOpen);
  els.workspace.classList.toggle('settings-open', appSettings.settingsOpen);
  $('#settingsBtn')?.classList.toggle('active', appSettings.settingsOpen);
  els.helpPanel?.classList.toggle('hidden', !state.helpOpen);
  els.helpBackdrop?.classList.toggle('hidden', !state.helpOpen);
  $('#helpBtn')?.classList.toggle('active', state.helpOpen);
  renderList();
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error(t('noActiveTab'));
  state.tabId = tab.id;
  state.tabUrl = tab.url || '';
  try { const u = new URL(state.tabUrl); state.origin = u.origin; state.host = u.host; } catch { state.origin = ''; state.host = t('originUnavailable'); }
  updateOriginUI();
}
function getOriginPattern() {
  if (!state.tabUrl) throw new Error(t('noActiveTab'));
  const url = new URL(state.tabUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(t('storageNotAllowed'));
  }
  return `${url.protocol}//${url.host}/*`;
}
function showPermissionState(message) {
  state.accessBlocked = true;
  state.entries = [];
  clearSelection(false);
  els.permissionHost.textContent = displayOrigin();
  els.permissionState?.classList.remove('hidden');
  els.emptyState?.classList.add('hidden');
  els.editorView?.classList.add('hidden');
  els.keyList.innerHTML = `<div class="empty-state" style="min-height:180px"><h2>${t('pendingAccess')}</h2><p>${t('pendingAccessDesc')}</p></div>`;
  els.countLabel.textContent = t('permissionNeeded');
  updateSummary([]);
  if (message) els.permissionState.querySelector('p').textContent = message;
}
function hidePermissionState() {
  state.accessBlocked = false;
  els.permissionState?.classList.add('hidden');
}
function isPermissionError(error) {
  const msg = String(error?.message || error || '').toLowerCase();
  return msg.includes('cannot access') || msg.includes('permission') || msg.includes('host') || msg.includes('access contents') || msg.includes('extensions gallery') || msg.includes('chrome://');
}
async function requestOriginPermission() {
  const originPattern = getOriginPattern();
  const granted = await chrome.permissions.request({ origins: [originPattern] });
  if (!granted) throw new Error(t('permissionDenied', displayOrigin()));
  return true;
}
async function runInPage(fn, args = []) {
  if (!state.tabId) await getActiveTab();
  const [{ result }] = await chrome.scripting.executeScript({ target: { tabId: state.tabId }, func: fn, args });
  return result;
}
function injectObserver() {
  const script = document.createElement('script');
  script.textContent = '(' + function mainPatch() {
    if (window.__ds_patched) return;
    window.__ds_patched = true;
    window.__ds_revision__ = 0;
    var origSet = Storage.prototype.setItem;
    var origRemove = Storage.prototype.removeItem;
    var origClear = Storage.prototype.clear;
    Storage.prototype.setItem = function(k, v) {
      origSet.call(this, k, v);
      window.__ds_revision__++;
      window.dispatchEvent(new CustomEvent('datasidekick:changed', { detail: { key: k, storage: this === sessionStorage ? 'sessionStorage' : 'localStorage' } }));
    };
    Storage.prototype.removeItem = function(k) {
      origRemove.call(this, k);
      window.__ds_revision__++;
      window.dispatchEvent(new CustomEvent('datasidekick:changed', { detail: { key: k, storage: this === sessionStorage ? 'sessionStorage' : 'localStorage' } }));
    };
    Storage.prototype.clear = function() {
      var s = this === sessionStorage ? 'sessionStorage' : 'localStorage';
      origClear.call(this);
      window.__ds_revision__++;
      window.dispatchEvent(new CustomEvent('datasidekick:cleared', { detail: { storage: s } }));
    };
  } + ')()';
  document.documentElement.appendChild(script);
  script.remove();
}

let watchInterval = null;

function startStorageWatch() {
  if (watchInterval) return;
  let lastRev = -1;
  watchInterval = setInterval(async () => {
    if (!state.tabId || state.accessBlocked) return;
    try {
      const rev = await runInPage(function(){ return window.__ds_revision__ || 0; });
      if (rev !== lastRev) { lastRev = rev; refresh(); }
    } catch {}
  }, 1500);
}

function stopStorageWatch() {
  if (watchInterval) { clearInterval(watchInterval); watchInterval = null; }
}

function readStorage(storageName) {
  const storage = storageName === 'sessionStorage' ? window.sessionStorage : window.localStorage;
  return Object.keys(storage).sort((a,b) => a.localeCompare(b)).map((key) => ({ key, value: storage.getItem(key) ?? '' }));
}
function writeStorage(storageName, key, value) {
  const storage = storageName === 'sessionStorage' ? sessionStorage : localStorage;
  storage.setItem(key, value);
  window.dispatchEvent(new CustomEvent('datasidekick:changed', { detail: { key, storage: storageName } }));
  return true;
}
function removeStorageKey(storageName, key) {
  (storageName === 'sessionStorage' ? sessionStorage : localStorage).removeItem(key);
  window.dispatchEvent(new CustomEvent('datasidekick:changed', { detail: { key, storage: storageName } }));
  return true;
}
function clearStorage(storageName) {
  (storageName === 'sessionStorage' ? sessionStorage : localStorage).clear();
  window.dispatchEvent(new CustomEvent('datasidekick:cleared', { detail: { storage: storageName } }));
  return true;
}
function importStorage(storageName, data) {
  const storage = storageName === 'sessionStorage' ? sessionStorage : localStorage;
  Object.entries(data).forEach(([key, value]) => {
    const v = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    storage.setItem(key, v);
    window.dispatchEvent(new CustomEvent('datasidekick:changed', { detail: { key, storage: storageName } }));
  });
  return true;
}


const noisyPatterns = [
  /^_ga/i, /^_gid/i, /^_gat/i, /^ga:/i, /^gtm/i, /^__utm/i,
  /^_hj/i, /^hj/i, /^amplitude/i, /^ajs_/i, /^segment/i,
  /^intercom/i, /^mixpanel/i, /^mp_/i, /^posthog/i, /^ph_/i,
  /^firebase:/i, /^firebase_/i, /^__stripe/i, /^stripe/i,
  /^sentry/i, /^loglevel/i, /^debug/i, /^dd_/i, /^datadog/i
];
function scopeKey() { return `${state.origin || 'unknown'}::${state.storage}`; }
function hiddenSet() { return new Set(appSettings.hiddenKeys?.[scopeKey()] || []); }
function favSet() { return new Set(appSettings.favorites?.[scopeKey()] || []); }
function isNoisyKey(key) { return noisyPatterns.some((rx) => rx.test(key)); }
function isHiddenKey(key) { return hiddenSet().has(key); }
function isFavKey(key) { return favSet().has(key); }
function setHiddenKey(key, hidden = true) {
  const sk = scopeKey(); const set = hiddenSet(); hidden ? set.add(key) : set.delete(key);
  appSettings.hiddenKeys = { ...(appSettings.hiddenKeys || {}), [sk]: [...set] };
  saveSettings(); renderList(); toast(hidden ? t('keyHidden', key) : t('keyRestored', key));
}
function toggleFavorite(key) {
  const sk = scopeKey(); const set = favSet(); set.has(key) ? set.delete(key) : set.add(key);
  appSettings.favorites = { ...(appSettings.favorites || {}), [sk]: [...set] };
  saveSettings(); renderList();
}
function resetHiddenForScope() {
  const keys = [...hiddenSet()];
  if (!keys.length) { toast(t('noHiddenKeys')); return; }
  const sk = scopeKey(); appSettings.hiddenKeys = { ...(appSettings.hiddenKeys || {}) }; delete appSettings.hiddenKeys[sk];
  saveSettings(); renderList(); toast(t('allKeysRestored'));
}
function displayOrigin() {
  if (!state.host) return t('originLabel');
  try {
    const u = new URL(state.tabUrl);
    if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return u.port ? `${u.hostname}:${u.port}` : u.hostname;
    const parts = u.hostname.split('.').filter(Boolean);
    return parts.length > 2 ? parts.slice(-2).join('.') : u.hostname;
  } catch { return state.host || t('originLabel'); }
}
function renderHiddenKeysList() {
  const list = $('#hiddenKeysList');
  if (!list) return;
  const keys = [...hiddenSet()].sort((a, b) => a.localeCompare(b));
  if (!keys.length) {
    list.innerHTML = `<div class="hidden-empty">${t('noHiddenMsg')}</div>`;
    return;
  }
  list.innerHTML = keys.map(key => `
    <div class="hidden-key-row" title="${escapeHtml(key)}">
      <span>${escapeHtml(key)}</span>
      <button class="small-outline-btn unhide-one-btn" data-key="${escapeHtml(key)}">${t('restore')}</button>
    </div>`).join('');
  list.querySelectorAll('.unhide-one-btn').forEach(btn => {
    btn.onclick = () => setHiddenKey(btn.dataset.key, false);
  });
}
function updateOriginUI() {
  const pill = $('#originPill');
  const label = displayOrigin();
  if (pill) { pill.textContent = label; pill.title = state.origin || state.tabUrl || t('currentOriginTitle'); }
  const count = $('#hiddenKeysCount');
  if (count) {
    const size = hiddenSet().size;
    const s = size === 1 ? '' : 's';
    const ptPlural = size === 1 ? '' : 's';
    count.textContent = t('hiddenKeysCount', [String(size), s, ptPlural]);
  }
  renderHiddenKeysList();
}

function parseValue(raw) { try { return { ok: true, value: JSON.parse(raw) }; } catch { return { ok: false, value: raw }; } }
function typeOfRaw(raw) { const p = parseValue(raw); if (!p.ok) return 'string'; if (Array.isArray(p.value)) return 'array'; if (p.value === null) return 'null'; return typeof p.value; }
function valueType(v) { if (Array.isArray(v)) return 'array'; if (v === null) return 'null'; return typeof v; }
function bytes(str) { return new Blob([str]).size; }
function formatBytes(n) { if (n < 1024) return `${n} B`; if (n < 1024*1024) return `${(n/1024).toFixed(1)} KB`; return `${(n/1024/1024).toFixed(1)} MB`; }
function escapeHtml(str) { return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function highlight(text, q) { if (!q) return escapeHtml(text); const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'); return escapeHtml(text).replace(re, '<mark>$1</mark>'); }
function toast(message, type = 'ok') { const el = document.createElement('div'); el.className = `toast ${type === 'error' ? 'error' : ''}`; el.innerHTML = `${type === 'error' ? icons.x : '<span style="color:var(--success)">\u2713</span>'}<strong>${escapeHtml(message)}</strong>`; $('#toastHost').appendChild(el); setTimeout(() => el.remove(), 2600); }
function setDirty(v) { state.dirty = v; els.saveBtn.disabled = !v; els.statusBar.textContent = v ? t('unsavedChanges') : ''; }
function currentRawValue() { return state.isJson ? JSON.stringify(state.working, null, 2) : els.primitiveInput.value; }

async function refresh() {
  try {
    await getActiveTab();
    hidePermissionState();
    if (!window.__dsObserverInjected) { window.__dsObserverInjected = true; try { await runInPage(injectObserver); } catch {} startStorageWatch(); }
    state.entries = await runInPage(readStorage, [state.storage]);
    if (state.selectedKey && !state.entries.some(e => e.key === state.selectedKey)) clearSelection();
    renderList();
    if (state.selectedKey) selectKey(state.selectedKey, false);
  } catch (e) {
    if (isPermissionError(e)) {
      showPermissionState(t('permissionDesc'));
      return;
    }
    toast(e.message || t('storageAccessError'), 'error');
  }
}
function filteredEntries() {
  const q = els.searchInput.value.trim().toLowerCase();
  let entries = state.entries.filter(({ key }) => !isHiddenKey(key) && !(appSettings.hideNoisy && isNoisyKey(key)));
  entries = entries.sort((a, b) => Number(isFavKey(b.key)) - Number(isFavKey(a.key)) || a.key.localeCompare(b.key));
  if (!q) return entries;
  return entries.filter(({ key, value }) => key.toLowerCase().includes(q) || value.toLowerCase().includes(q));
}
function updateSummary(entries = state.entries) {
  const total = entries.reduce((sum, e) => sum + bytes(e.value), 0);
  els.summaryStorage.textContent = state.storage === 'localStorage' ? t('localStorage') : t('sessionStorage');
  els.summaryItems.textContent = t('itemsCount', [String(entries.length)]);
  els.summarySize.textContent = formatBytes(total);
}
function renderList() {
  if (!els.keyList) return;
  const entries = filteredEntries();
  const hiddenCount = state.entries.length - entries.length;
  const count = entries.length;
  const s = count === 1 ? '' : 's';
  const foundS = count === 1 ? '' : 's';
  let hiddenPart = '';
  if (hiddenCount) {
    const hs = hiddenCount === 1 ? '' : 's';
    hiddenPart = t('hiddenSuffix', [String(hiddenCount), hs]);
  }
  els.countLabel.textContent = t('keysFound', [String(count), s, foundS, hiddenPart]);
  updateSummary(entries);
  updateOriginUI();
  els.keyList.innerHTML = '';
  if (!entries.length) {
    els.keyList.innerHTML = `<div class="empty-state" style="min-height:180px"><h2>${t('nothingFound')}</h2><p>${t('nothingFoundDesc')}</p></div>`;
    return;
  }
  const q = els.searchInput.value.trim();
  for (const entry of entries) {
    const type = typeOfRaw(entry.value);
    const item = document.createElement('button');
    item.className = `key-item ${entry.key === state.selectedKey ? 'active' : ''}`;
    item.innerHTML = `<div class="key-top"><span class="key-name">${isFavKey(entry.key) ? '<span class="fav-dot">\u2605</span>' : ''}${highlight(entry.key, q)}</span><span class="key-actions"><span class="mini-action fav-action" title="${t('favorite')}">${icons.star}</span><span class="mini-action hide-action" title="${t('hide')}">${icons.eyeOff}</span><span class="mini-action copy-action" title="${t('copy')}">${icons.copy}</span><span class="mini-action del-action" title="${t('delete')}">${icons.trash}</span></span></div><div class="key-bottom"><span class="badge ${type}">${type}</span>${appSettings.showSizes ? `<span>${formatBytes(bytes(entry.value))}</span>` : ''}</div>`;
    item.addEventListener('click', (ev) => {
      if (ev.target.closest('.fav-action')) { toggleFavorite(entry.key); return; }
      if (ev.target.closest('.hide-action')) { setHiddenKey(entry.key, true); return; }
      if (ev.target.closest('.copy-action')) { navigator.clipboard.writeText(entry.value); toast(t('valueCopied')); return; }
      if (ev.target.closest('.del-action')) { deleteKey(entry.key); return; }
      selectKey(entry.key);
    });
    els.keyList.appendChild(item);
  }
}
function clearSelection(showEmpty = true) {
  state.selectedKey = null; state.selectedRaw = ''; state.working = null; state.isJson = false; state.collapsed.clear(); state.pendingDelete = null;
  els.emptyState.classList.toggle('hidden', !showEmpty); els.editorView.classList.add('hidden'); setDirty(false); renderList();
}
function selectKey(key, render = true) {
  const entry = state.entries.find(e => e.key === key); if (!entry) return;
  state.selectedKey = key; state.selectedRaw = entry.value; state.pendingDelete = null;
  els.selectedKeyTitle.textContent = key; els.selectedSize.textContent = formatBytes(bytes(entry.value));
  const type = typeOfRaw(entry.value); els.selectedTypeBadge.className = `badge ${type}`; els.selectedTypeBadge.textContent = type;
  const parsed = parseValue(entry.value);
  state.isJson = parsed.ok && typeof parsed.value === 'object' && parsed.value !== null;
  state.working = state.isJson ? structuredClone(parsed.value) : entry.value;
  hidePermissionState();
  els.emptyState.classList.add('hidden'); els.editorView.classList.remove('hidden');
  els.primitiveEditor.classList.toggle('hidden', state.isJson); els.jsonEditor.classList.toggle('hidden', !state.isJson);
  if (state.isJson) renderJsonEditor(); else els.primitiveInput.value = entry.value;
  setDirty(false); if (render) renderList();
}

function pathKey(path) { return path.join('\u00a6'); }
function getAtPath(root, path) { return path.reduce((acc, k) => acc?.[k], root); }
function setAtPath(root, path, value) { const parent = getAtPath(root, path.slice(0,-1)); parent[path.at(-1)] = value; }
function deleteAtPath(root, path) { const parent = getAtPath(root, path.slice(0,-1)); if (Array.isArray(parent)) parent.splice(Number(path.at(-1)), 1); else delete parent[path.at(-1)]; }
function renameAtPath(root, path, newKey) { const parent = getAtPath(root, path.slice(0,-1)); const oldKey = path.at(-1); if (!parent || Array.isArray(parent) || oldKey === newKey || !newKey) return; const entries = Object.entries(parent); delete parent[oldKey]; for (const [k,v] of entries) parent[k === oldKey ? newKey : k] = v; }
function castValue(text, type) { if (type === 'number') return Number(text || 0); if (type === 'boolean') return text === 'true'; if (type === 'null') return null; return text; }
function defaultValue(type) { return type === 'object' ? {} : type === 'array' ? [] : type === 'number' ? 0 : type === 'boolean' ? false : type === 'null' ? null : ''; }
function nodeIcon(type) { return type === 'array' ? icons.grid : type === 'object' ? icons.file : ''; }

function renderJsonEditor() {
  els.jsonEditor.innerHTML = '';
  els.jsonEditor.appendChild(renderNode(state.working, [], 'root'));
  const footer = document.createElement('div'); footer.className = 'json-footer';
  const rootType = valueType(state.working);
  if (rootType === 'array' || rootType === 'object') {
    footer.innerHTML = `<button class="json-btn add" id="rootAddBtn">${icons.plus}${t('addItem')}</button><button class="json-btn danger" id="rootDeleteBtn">${icons.trash}${t('deleteItem')}</button>`;
    footer.querySelector('#rootAddBtn').onclick = () => addChild([]);
    footer.querySelector('#rootDeleteBtn').onclick = () => { state.working = rootType === 'array' ? [] : {}; setDirty(true); renderJsonEditor(); };
    els.jsonEditor.appendChild(footer);
  }
}
function renderNode(value, path, label) {
  const wrapper = document.createElement('div'); wrapper.className = 'node';
  const type = valueType(value); const complex = type === 'object' || type === 'array'; const collapsed = state.collapsed.has(pathKey(path));
  const row = document.createElement('div'); row.className = `node-row ${complex ? 'complex' : ''}`;

  if (complex) {
    const caret = document.createElement('button'); caret.className = `caret ${collapsed ? 'collapsed' : ''}`; caret.innerHTML = icons.chevron; caret.title = collapsed ? t('expand') : t('collapse');
    caret.onclick = () => { const k = pathKey(path); state.collapsed.has(k) ? state.collapsed.delete(k) : state.collapsed.add(k); renderJsonEditor(); };
    row.appendChild(caret);
    row.insertAdjacentHTML('beforeend', `<span class="type-icon">${nodeIcon(type)}</span>`);
  } else {
    row.insertAdjacentHTML('beforeend', '<span></span><span></span>');
  }

  if (path.length === 0) {
    row.insertAdjacentHTML('beforeend', `<span class="bracket">${type === 'array' ? '[' : '{'}</span><span class="meta">${complex ? t('metaItems', [String(Object.keys(value).length)]) : ''}</span><span></span>`);
  } else {
    const parent = getAtPath(state.working, path.slice(0,-1));
    if (Array.isArray(parent)) row.insertAdjacentHTML('beforeend', `<span class="array-index">${label}</span>`);
    else {
      const key = document.createElement('input'); key.className = 'key-input'; key.value = label;
      key.onchange = () => { renameAtPath(state.working, path, key.value.trim()); setDirty(true); renderJsonEditor(); };
      row.appendChild(key);
    }
    row.insertAdjacentHTML('beforeend', '<span class="sep">:</span>');
    if (complex) row.insertAdjacentHTML('beforeend', `<span class="bracket">${type === 'array' ? '[' : '{'} <span class="meta">${t('metaItems', [String(Object.keys(value).length)])}</span></span>`);
  }

  if (!complex) {
    const input = document.createElement(type === 'boolean' ? 'select' : 'input'); input.className = 'value-input';
    if (type === 'boolean') { input.innerHTML = '<option>true</option><option>false</option>'; input.value = String(value); }
    else { input.value = value === null ? 'null' : String(value); input.disabled = type === 'null'; }
    input.onchange = () => { setAtPath(state.working, path, castValue(input.value, type)); setDirty(true); renderJsonEditor(); };
    row.appendChild(input);
  }

  const actions = document.createElement('div'); actions.className = 'row-actions';
  if (complex) {
    const add = document.createElement('button'); add.className = 'icon-mini-btn'; add.innerHTML = icons.plus; add.title = t('add'); add.onclick = () => addChild(path); actions.appendChild(add);
  }
  if (path.length > 0) {
    const del = document.createElement('button'); del.className = 'icon-mini-btn danger'; del.innerHTML = icons.trash; del.title = t('delete'); del.onclick = () => { deleteAtPath(state.working, path); setDirty(true); renderJsonEditor(); }; actions.appendChild(del);
  } else if (complex) {
    const spacer = document.createElement('span'); spacer.style.width = '30px'; actions.appendChild(spacer);
  }
  row.appendChild(actions); wrapper.appendChild(row);

  if (complex && !collapsed) {
    const entries = Array.isArray(value) ? value.map((v,i) => [i, v]) : Object.entries(value);
    for (const [k,v] of entries) wrapper.appendChild(renderNode(v, [...path, k], String(k)));
    const close = document.createElement('div'); close.className = 'node-row'; close.innerHTML = '<span></span><span></span><span></span><span></span><span class="bracket">' + (type === 'array' ? ']' : '}') + '</span><span></span>'; wrapper.appendChild(close);
  }
  return wrapper;
}
function addChild(path) {
  const target = getAtPath(state.working, path);
  const type = prompt(t('typePrompt'), 'string') || 'string';
  const value = defaultValue(type);
  if (Array.isArray(target)) target.push(value);
  else {
    const key = prompt(t('newKeyPrompt'));
    if (!key) return;
    target[key] = value;
  }
  setDirty(true); renderJsonEditor();
}

async function saveSelected() {
  if (!state.selectedKey) return;
  const value = currentRawValue();
  await runInPage(writeStorage, [state.storage, state.selectedKey, value]);
  toast(t('savedSuccess')); await refresh(); selectKey(state.selectedKey); setDirty(false);
}
async function deleteKey(key = state.selectedKey) {
  if (!key) return;
  if (appSettings.confirmDelete && state.pendingDelete !== key) { state.pendingDelete = key; toast(t('confirmDelete', key)); setTimeout(() => { if (state.pendingDelete === key) state.pendingDelete = null; }, 3500); return; }
  await runInPage(removeStorageKey, [state.storage, key]); toast(t('keyRemoved')); await refresh(); if (key === state.selectedKey) clearSelection();
}
async function exportData() {
  const data = Object.fromEntries(state.entries.map(e => [e.key, e.value]));
  const payload = { app: 'DataSidekick', version: '0.1.7', origin: state.origin, storage: state.storage, exportedAt: new Date().toISOString(), items: data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `datasidekick-${state.storage}-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url); toast(t('dataExported'));
}
async function handleImport(file) {
  if (!file) return;
  try { const json = JSON.parse(await file.text()); const data = json.items && typeof json.items === 'object' ? json.items : json; await runInPage(importStorage, [state.storage, data]); toast(t('dataImported')); await refresh(); }
  catch { toast(t('invalidJson'), 'error'); }
}
async function clearAll() {
  if (appSettings.confirmDelete && state.pendingDelete !== '__all__') { state.pendingDelete = '__all__'; toast(t('confirmClearAll')); setTimeout(() => { if (state.pendingDelete === '__all__') state.pendingDelete = null; }, 3500); return; }
  await runInPage(clearStorage, [state.storage]); toast(t('storageCleared')); await refresh(); clearSelection();
}

function openSettings() {
  state.helpOpen = false;
  appSettings.settingsOpen = true;
  saveSettings();
}

function closeSettings() {
  appSettings.settingsOpen = false;
  saveSettings();
}

function toggleSettings() {
  appSettings.settingsOpen ? closeSettings() : openSettings();
}

function openHelp() {
  appSettings.settingsOpen = false;
  state.helpOpen = true;
  saveSettings();
}

function closeHelp() {
  state.helpOpen = false;
  applySettings();
}

function toggleHelp() {
  state.helpOpen ? closeHelp() : openHelp();
}

function bindEvents() {
  els.primitiveInput.addEventListener('input', () => setDirty(els.primitiveInput.value !== state.selectedRaw));
  els.searchInput.addEventListener('input', renderList);
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); els.searchInput.focus(); }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveSelected(); }
    if (e.key === 'Escape' && appSettings.settingsOpen) closeSettings();
    else if (e.key === 'Escape' && state.helpOpen) closeHelp();
  });
  $$('.switch-btn').forEach(btn => btn.addEventListener('click', async () => { $$('.switch-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.storage = btn.dataset.storage; clearSelection(); await refresh(); }));
  $('#refreshBtn').onclick = () => { $('#refreshBtn').classList.add('refresh-btn-spinning'); setTimeout(() => $('#refreshBtn').classList.remove('refresh-btn-spinning'), 400); refresh(); }; $('#saveBtn').onclick = saveSelected; $('#resetBtn').onclick = () => selectKey(state.selectedKey); $('#deleteKeyBtn').onclick = () => deleteKey(); $('#exportBtn').onclick = exportData; $('#importInput').onchange = e => handleImport(e.target.files[0]); $('#clearAllBtn').onclick = clearAll;
  $('#settingsBtn').onclick = toggleSettings;
  $('#closeSettingsBtn').onclick = closeSettings;
  els.settingsBackdrop?.addEventListener('click', closeSettings);
  $('#helpBtn').onclick = toggleHelp;
  $('#closeHelpBtn').onclick = closeHelp;
  els.helpBackdrop?.addEventListener('click', closeHelp);
  $('#githubBtn').onclick = () => {
    chrome.tabs.create({ url: 'https://github.com/rodrigocnascimento/datasidekick' })
      .catch(() => toast(t('githubError'), 'error'));
  };
  $('#darkModeBtn').onclick = () => { appSettings.theme = 'dark'; saveSettings(); };
  $('#lightModeBtn').onclick = () => { appSettings.theme = 'light'; saveSettings(); };
  $('#fontDecBtn').onclick = () => { appSettings.fontSize = Math.max(11, appSettings.fontSize - 1); saveSettings(); };
  $('#fontIncBtn').onclick = () => { appSettings.fontSize = Math.min(20, appSettings.fontSize + 1); saveSettings(); };
  $('#showSizesToggle').onclick = () => { appSettings.showSizes = !appSettings.showSizes; saveSettings(); };
  $('#confirmToggle').onclick = () => { appSettings.confirmDelete = !appSettings.confirmDelete; saveSettings(); };
  $('#currentOriginToggle').onclick = () => { appSettings.currentOriginOnly = !appSettings.currentOriginOnly; saveSettings(); toast(t('readingStaysFocused')); };
  $('#hideNoisyToggle').onclick = () => { appSettings.hideNoisy = !appSettings.hideNoisy; saveSettings(); renderList(); };
  $('#resetHiddenBtn').onclick = resetHiddenForScope;
  $('#railSearchBtn').onclick = () => els.searchInput.focus();
  $('#grantAccessBtn')?.addEventListener('click', async () => {
    try {
      els.grantAccessBtn.disabled = true;
      await requestOriginPermission();
      toast(t('accessGranted'));
      hidePermissionState();
      await refresh();
    } catch (e) {
      toast(e.message || t('permissionError'), 'error');
    } finally {
      els.grantAccessBtn.disabled = false;
    }
  });
}

applyI18n();
hydrateIcons();
loadSettings();
bindEvents();
refresh();
