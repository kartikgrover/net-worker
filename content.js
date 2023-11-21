// content.js

let personalizedNote = "";

function clickElement(selector, errorMessage) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(errorMessage);
    return;
  }
  element.click();
}

function waitForElement(selector) {
  return new Promise((resolve) => {
    const checkInterval = 50;
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        setTimeout(checkElement, checkInterval);
      }
    };
    checkElement();
  });
}

async function setPersonalizedNote() {
  const nameElement = document.querySelector('span.flex-1 strong');

  // Use await with chrome.storage.sync.get
  const result = await new Promise((resolve) => {
    chrome.storage.sync.get(['personalizedNote'], function (result) {
      resolve(result);
    });
  });

  personalizedNote = result.personalizedNote || ''; // If not found, set to an empty string

  if (nameElement) {
    const personName = nameElement.textContent;
    greeting = `Hi ${personName.split(" ")[0]},\n`;
    personalizedNote = greeting + personalizedNote;
    console.log('Set personalized note:', personalizedNote);

  }
}


async function handleConnectButtonClick() {
  await setPersonalizedNote();
  clickElement("button[aria-label='Add a note']", "Add a note button not found");
  const textArea = await waitForElement("#custom-message");
  textArea.value = personalizedNote;
  setTimeout(() => textArea.blur(), 0);
  setTimeout(() => clickSendNowButton(), 0);
}

function clickSendNowButton() {
  clickElement("button[aria-label='Send now']", "Send now button not found");
}

// Listen for messages from the extension popup
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target && target.textContent.trim() === "Connect") {
    handleConnectButtonClick();
  }
});