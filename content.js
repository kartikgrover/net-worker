// Define a variable to hold the personalized note.
let personalizedNote = "";

// Function to click an element based on a CSS selector.
function clickElement(selector, errorMessage) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
  } else {
    console.error(errorMessage);
  }
}

// Function to wait for an element to become available.
function waitForElement(selector, callback, delay = 150) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => waitForElement(selector, callback, delay), delay);
  }
}

// Function to set the personalized note based on the user's name.
function setPersonalizedNote() {
  const nameElement = document.querySelector('span.flex-1 strong');
  if (nameElement) {
    const personName = nameElement.textContent;
    const firstName = personName.split(" ")[0];
    personalizedNote = `Hi ${firstName},\nI came across your profile and noticed that you work at Crusoe. The reason I'm reaching out to you is that I recently applied for the Software Engineer 1 position there, and I'd love to follow your insights on how I can remain a competitive applicant.`;
  }
}

// Function to handle the "Connect" button click.
function handleConnectButtonClick() {
  // Set the personalized note.
  setPersonalizedNote();

  // Click the "Add note" button to open the note dialog.
  clickElement("button[aria-label='Add a note']", "Add a note button not found");

  // Start waiting for the "custom-message" textarea.
  waitForElement("#custom-message", (textArea) => {
    textArea.value = personalizedNote;

    // Use a setTimeout before triggering the blur event.
    setTimeout(() => {
      textArea.blur();

      // After a brief delay, click the "Send now" button.
      setTimeout(() => clickSendNowButton(), 0); // Adjust the delay as needed
    }, 0); // Adjust the delay as needed
  });
}

// Function to click the "Send now" button.
function clickSendNowButton() {
  clickElement("button[aria-label='Send now']", "Send now button not found");
}

// Set up a click event listener for the "Connect" button.
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target && target.textContent.trim() === "Connect") {
    handleConnectButtonClick();
  }
});
