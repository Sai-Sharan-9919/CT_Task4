let currentTab = '';
let startTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  logTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    currentTab = new URL(tab.url).hostname;
    startTime = Date.now();
  });
});

chrome.idle.onStateChanged.addListener(state => {
  if (state === "idle" || state === "locked") logTime();
});

function logTime() {
  const timeSpent = (Date.now() - startTime) / 1000;
  if (!currentTab || timeSpent < 5) return;
  fetch('http://localhost:5000/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site: currentTab, duration: timeSpent })
  });
}
