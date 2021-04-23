let apiKey = 'keykeykey';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('enabled', function (result) {
    if (typeof result.enabled == 'undefined') {
      console.log('No enable check found');
      chrome.storage.sync.set({ enabled: false });
    }
    else {
      console.log("Enable option found");
      console.log(result.enabled);
    }
  });
});

function clickedCaptcha() {
  chrome.tabs.sendMessage
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.content == 'autosolve') {
    console.log("injecting")
    console.log(sender.tab.id)
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id, allFrames: true },
        files: ['clicker.js'],
      }
    );
    setTimeout(() => {
      sendResponse("Done");
    }, 500);
    return true;
  }
  if (request.content == 'sendcaptcha') {
    chrome.storage.sync.get('apiKey', function (result) {
      const Http = new XMLHttpRequest();
      const url = 'http://2captcha.com/in.php?key=' + result.apiKey + '&method=userrecaptcha&googlekey=' + captcha + '&pageurl=' + window.location.href;
      console.log(url)
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
      }
    });
    return true;
  }
});