// Define a variable to hold the personalized note.
let personalizedNote = "";

// Function to click the "Add note" button and add your note.
function clickAddNoteButton() {
  const addNoteButton = document.querySelector("button[aria-label='Add a note']");
  if (addNoteButton) {
    addNoteButton.click();
  } else {
    console.error("Add a note button not found.");
  }
}

// Function to click the "Send now" button.
function clickSendNowButton() {
  // Select the "Send now" button within the div with the class 'artdeco-modal__actionbar'
  const sendButton = document.querySelector("button[aria-label='Send now']");
  if (sendButton) {
    sendButton.click();
  } else {
    console.error("Send now button not found.");
  }
}

// Function to handle the "Connect" button click.
function handleConnectButtonClick() {
  // Get the person's name from the LinkedIn profile.
  const nameElement = document.querySelector('span.flex-1 strong');
  if (nameElement) {
    const personName = nameElement.textContent;
    const firstName = personName.split(" ")[0];

    // Set the personalized note.
    personalizedNote = `Hi ${firstName},\nI came across your profile and noticed that you work at Loop. The reason I'm reaching out to you is that I recently applied for the Software Engineer 1 position there, and I'd love to follow your insights on how I can remain a competitive applicant.`;
    
    // Click the "Add note" button to open the note dialog.
    clickAddNoteButton();
    // Start waiting for the "custom-message" textarea.
    waitForTextArea();
  }
}

// Function to wait for the "custom-message" textarea to become available.
function waitForTextArea() {
  const textArea = document.getElementById("custom-message");
  if (textArea) {
    textArea.value = personalizedNote;
    textArea.blur(); // Remove focus from the textarea to enable the "Send now" button.
    // Click the "Send now" button after setting the personalized note.
    clickSendNowButton();
  } else {
    // If the textarea is not available yet, retry after a short delay.
    setTimeout(waitForTextArea, 150);
  }
}

// Set up a click event listener for the "Connect" button.
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target && target.textContent.trim() === "Connect") {
    handleConnectButtonClick();
  }
});
