let activeTabId = null;
let activeStartTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      if (activeTabId !== null) {
        logTime(tab.url);
      }
      activeTabId = tab.id;
      activeStartTime = Date.now();
    }
  });
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === activeTabId) {
    logTime(tabId.url);
    activeTabId = null;
    activeStartTime = null;
  }
});

function logTime(url) {
  const duration = Date.now() - activeStartTime;
  fetch('http://localhost:3000/api/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, duration })
  });
}