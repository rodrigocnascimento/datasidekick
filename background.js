chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== "install") return;

  chrome.tabs.create({
    url: "https://datasidekick.site/#playground"
  }).catch((error) => {
    console.warn("Não foi possível abrir o playground:", error);
  });
});