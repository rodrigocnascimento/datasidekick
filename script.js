const CONSENT_STORAGE_KEY = "datasidekick.analyticsConsent";
const analyticsLayer = window.dataLayer || (window.dataLayer = []);

function trackEvent(event, properties = {}) {
  analyticsLayer.push({
    event,
    page_path: window.location.pathname,
    page_hash: window.location.hash || "#top",
    ...properties
  });
}

function updateConsent(value) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: value === "granted" ? "granted" : "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  trackEvent("analytics_consent_update", {
    analytics_storage: value
  });
}

function safeGetStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSetStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("DataSidekick consent storage error:", error);
  }
}

function initConsentBanner() {
  const banner = document.querySelector("[data-consent-banner]");
  const savedConsent = safeGetStorageItem(CONSENT_STORAGE_KEY);

  if (savedConsent === "granted" || savedConsent === "denied") {
    updateConsent(savedConsent);
    return;
  }

  if (!banner) {
    return;
  }

  banner.hidden = false;

  banner.querySelectorAll("[data-consent-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const consent = button.dataset.consentAction === "accept"
        ? "granted"
        : "denied";

      safeSetStorageItem(CONSENT_STORAGE_KEY, consent);
      updateConsent(consent);
      banner.hidden = true;
    });
  });
}

function trackAnchorView() {
  trackEvent("anchor_view", {
    anchor: window.location.hash || "#top"
  });
}

initConsentBanner();
trackAnchorView();

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".feature-card, .use-case-grid article, .privacy-grid > div, .step-list li, .faq-list details, .purpose-card, .playground, .showcase, .privacy-detail");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const DEMO_PREFIX = "datasidekick.demo.";

const demoLocalStorage = {
  "user.profile": {
    id: "usr_demo_1042",
    name: "Ana Demo",
    email: "ana.demo@example.com",
    roles: ["admin", "developer"],
    preferences: {
      theme: "dark",
      fontSize: 15,
      sidebarPinned: true,
      enabledPanels: ["storage", "json-tree", "import-export"]
    },
    security: {
      mfaEnabled: true,
      lastLoginAt: "2026-05-16T18:42:00.000Z",
      token: "fake-demo-token-never-use-in-production"
    }
  },
  "cart.snapshot": {
    currency: "BRL",
    items: [
      {
        sku: "devtools-mug",
        name: "Caneca DevTools",
        quantity: 2,
        price: 49.9
      },
      {
        sku: "json-stickers",
        name: "Adesivos JSON",
        quantity: 1,
        price: 19.9
      }
    ],
    coupon: {
      code: "LOCALFIRST",
      discountPercent: 15,
      valid: true
    },
    totals: {
      subtotal: 119.7,
      discount: 17.96,
      shipping: 0,
      grandTotal: 101.74
    }
  },
  "feature-flags": {
    visualJsonEditor: true,
    importExportJson: true,
    storageDiff: false,
    betaFlags: {
      commandPalette: true,
      sessionTimeline: false,
      compactMode: true
    }
  },
  "api.cache.dashboard": {
    cachedAt: "2026-05-16T19:05:33.000Z",
    ttlSeconds: 300,
    status: 200,
    payload: {
      cards: [
        { label: "Sessoes", value: 128, trend: "up" },
        { label: "Erros", value: 3, trend: "down" },
        { label: "Exports", value: 42, trend: "flat" }
      ]
    }
  },
  "plain-note": "Valor simples para testar edicao inline no DataSidekick."
};

const demoSessionStorage = {
  "checkout.session": {
    id: "chk_demo_7781",
    startedAt: "2026-05-16T19:22:10.000Z",
    expiresAt: "2026-05-16T20:22:10.000Z",
    currentStep: "payment",
    steps: [
      { id: "cart", completed: true },
      { id: "shipping", completed: true },
      { id: "payment", completed: false },
      { id: "review", completed: false }
    ],
    paymentDraft: {
      method: "pix",
      installments: 1,
      saveMethod: false
    }
  },
  "wizard.state": {
    currentStep: 3,
    completedSteps: ["origin", "permissions", "preview"],
    draft: {
      selectedStorage: "localStorage",
      filter: "datasidekick.demo",
      includeSessionStorage: true
    }
  },
  "request.draft": {
    method: "PATCH",
    endpoint: "/api/preferences",
    headers: {
      "x-demo-origin": window.location.origin,
      "content-type": "application/json"
    },
    body: {
      theme: "dark",
      language: "pt-BR",
      shortcutsEnabled: true
    }
  },
  "toast.queue": [
    {
      id: "toast_demo_1",
      type: "success",
      message: "Dados demo carregados localmente."
    },
    {
      id: "toast_demo_2",
      type: "info",
      message: "Abra o DataSidekick para explorar esta origem."
    }
  ],
  "current-tab": "session-storage",
  "debug.filters": {
    query: "datasidekick.demo",
    storageTypes: ["localStorage", "sessionStorage"],
    showJsonOnly: false,
    expandedKeys: [
      "datasidekick.demo.checkout.session",
      "datasidekick.demo.wizard.state"
    ]
  }
};

const demoStatus = document.querySelector("[data-demo-status]");

function stringifyDemoValue(value) {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function setDemoStatus(message) {
  if (demoStatus) {
    demoStatus.textContent = message;
  }
}

function writeDemoStorage() {
  try {
    Object.entries(demoLocalStorage).forEach(([key, value]) => {
      localStorage.setItem(`${DEMO_PREFIX}${key}`, stringifyDemoValue(value));
    });

    Object.entries(demoSessionStorage).forEach(([key, value]) => {
      sessionStorage.setItem(`${DEMO_PREFIX}${key}`, stringifyDemoValue(value));
    });

    setDemoStatus("Dados demo criados. Abra o DataSidekick nesta pagina.");
    trackEvent("demo_storage_created", {
      storage_scope: "localStorage_and_sessionStorage",
      local_storage_keys: Object.keys(demoLocalStorage).length,
      session_storage_keys: Object.keys(demoSessionStorage).length
    });
    printDemoConsole();
  } catch (error) {
    setDemoStatus("Nao foi possivel acessar o storage deste navegador.");
    console.warn("DataSidekick demo storage error:", error);
  }
}

function clearDemoStorage() {
  try {
    [localStorage, sessionStorage].forEach((storage) => {
      Object.keys(storage)
        .filter((key) => key.startsWith(DEMO_PREFIX))
        .forEach((key) => storage.removeItem(key));
    });

    setDemoStatus("Dados demo removidos desta origem.");
    trackEvent("demo_storage_cleared", {
      storage_scope: "localStorage_and_sessionStorage"
    });
  } catch (error) {
    setDemoStatus("Nao foi possivel limpar o storage deste navegador.");
    console.warn("DataSidekick demo clear error:", error);
  }
}

function printDemoConsole() {
  console.log(String.raw`
 ____        _        ____  _     _      _    _      _
|  _ \  __ _| |_ __ _/ ___|(_) __| | ___| | _(_) ___| | __
| | | |/ _\` | __/ _\` \___ \| |/ _\` |/ _ \ |/ / |/ __| |/ /
| |_| | (_| | || (_| |___) | | (_| |  __/   <| | (__|   <
|____/ \__,_|\__\__,_|____/|_|\__,_|\___|_|\_\_|\___|_|\_\

Dados demo criados nesta origem.

Abra o painel lateral do DataSidekick e procure por:

LocalStorage:
- ${DEMO_PREFIX}user.profile
- ${DEMO_PREFIX}cart.snapshot
- ${DEMO_PREFIX}feature-flags

SessionStorage:
- ${DEMO_PREFIX}checkout.session
- ${DEMO_PREFIX}wizard.state
- ${DEMO_PREFIX}request.draft

Teste edicao, busca, importacao, exportacao e limpeza de chaves.
`);
}

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.demoAction === "seed") {
      writeDemoStorage();
      return;
    }

    clearDemoStorage();
  });
});

document.querySelectorAll("[data-analytics-event]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(element.dataset.analyticsEvent, {
      link_label: element.dataset.analyticsLabel || element.textContent.trim(),
      link_url: element.getAttribute("href") || null
    });
  });
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      trackEvent("faq_open", {
        question: detail.querySelector("summary")?.textContent.trim() || ""
      });
    }
  });
});

if (window.location.hash === "#playground") {
  writeDemoStorage();
}

window.addEventListener("hashchange", () => {
  trackAnchorView();

  if (window.location.hash === "#playground") {
    writeDemoStorage();
  }
});
