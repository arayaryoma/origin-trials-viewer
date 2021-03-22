const state = {
    tokens: []
}

chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.tabId < 0) return
    state.tokens = []
    const otHeaders = details.responseHeaders.filter(
      (h) => h.name.toLowerCase() === "origin-trial"
    )
    state.tokens.push(...otHeaders.map((h) => h.value))
  },
  { urls: ["<all_urls>"], types:['main_frame'] },
  ["responseHeaders"]
);

chrome.runtime.onMessage.addListener((_req, _sender, sendRespone) => {
    sendRespone({tokens: state.tokens});
})