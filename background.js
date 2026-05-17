chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== "install") return;

  const locale = chrome.i18n.getMessage("@@ui_locale");
  const url = locale && locale.startsWith("en")
    ? "https://datasidekick.site/en/#playground"
    : "https://datasidekick.site/#playground";

  chrome.tabs.create({ url }).catch((error) => {
    console.warn("Could not open playground:", error);
  });
});