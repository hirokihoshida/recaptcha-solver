let submitButton = document.getElementById("setKeyButton");
let enabledButton = document.getElementById("enabledButton");

submitButton.addEventListener("click", async function (e) {
  let key = document.getElementById("apiKey").value;
  console.log(key);
  chrome.storage.sync.set({ apiKey: key }, function (result) {
    console.log("key set");
    console.log(key);
  });
});

chrome.storage.sync.get('apiKey', function (result) {
  if (typeof result.apiKey != 'undefined') {
    document.getElementById('apiKey').setAttribute("value", result.apiKey);
  }
});


enabledButton.addEventListener("click", async function (e) {
  chrome.storage.sync.get('enabled', function (result) {
    if (result.enabled){
      chrome.storage.sync.set({ enabled: false }, function (result) {
        enabledButton.classList.add("btn-success");
        enabledButton.classList.remove("btn-danger");
        enabledButton.innerHTML = 'Turn On'
      });
    }else{
      chrome.storage.sync.set({ enabled: true }, function (result) {
        enabledButton.classList.add("btn-danger");
        enabledButton.classList.remove("btn-success");
        enabledButton.innerHTML = 'Turn Off'
      });
    }
  });
});

chrome.storage.sync.get('enabled', function (result) {
  if (result.enabled) {
    enabledButton.classList.add("btn-danger");
    enabledButton.classList.remove("btn-success");
    enabledButton.innerHTML = 'Turn Off';
  }else{
    enabledButton.classList.add("btn-success");
    enabledButton.classList.remove("btn-danger");
    enabledButton.innerHTML = 'Turn On';
  }
});