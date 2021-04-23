const targetElement = document.body;

const observerConfig = {
    childList: true,
    attributes: false,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false,
    subtree: false
};

function getCaptchaInfo() {
    captcha = document.querySelector('iframe[title*="recaptcha"]')
    captcha = captcha.getAttribute('src')
    captcha = captcha.split('k=')[1]
    console.log(captcha);
    answerBox = document.getElementById('g-recaptcha-response');
    
    chrome.runtime.sendMessage({content: "sendcaptcha", googleKey: captcha}, (response) => {
        submitForm();
    });
    




};

function captchaDetect(mutationRecords) {
    mutationRecords.forEach((mutationRecord) => {
        if (mutationRecord.addedNodes.length) { //check only when notes were added to DOM
            var reCaptchaParentContainer = mutationRecord.addedNodes[0];
            var reCaptcha = reCaptchaParentContainer.querySelectorAll('iframe[title*="recaptcha"]');
            if (reCaptcha.length) {
                console.log('Captcha Detected');
                reCaptchaObserver.disconnect();
                chrome.runtime.sendMessage({content: "autosolve"}, (response) => {
                    getCaptchaInfo();
                });
            }
        }
    });
};







const reCaptchaObserver = new MutationObserver(captchaDetect);
reCaptchaObserver.observe(targetElement, observerConfig);