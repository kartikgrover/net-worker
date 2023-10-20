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
    const checkInterval = 50; // Reduced the interval
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

function setPersonalizedNote() {
  const nameElement = document.querySelector('span.flex-1 strong');
  if (nameElement) {
    const personName = nameElement.textContent;
    const firstName = personName.split(" ")[0];
    personalizedNote = `Hi ${firstName},\nI came across your profile and noticed that you work at Crusoe. The reason I'm reaching out to you is that I recently applied for the Software Engineer 1 position there, and I'd love to follow your insights on how I can remain a competitive applicant.`;
  }
}

async function handleConnectButtonClick() {
  setPersonalizedNote();
  clickElement("button[aria-label='Add a note']", "Add a note button not found");
  const textArea = await waitForElement("#custom-message");
  textArea.value = personalizedNote;
  setTimeout(() => textArea.blur(), 0);
  setTimeout(() => clickSendNowButton(), 0); // Adjust the delay as needed
}

function clickSendNowButton() {
  clickElement("button[aria-label='Send now']", "Send now button not found");
}

document.addEventListener("click", function (event) {
  const target = event.target;
  if (target && target.textContent.trim() === "Connect") {
    handleConnectButtonClick();
  }
});
