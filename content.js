// Define a variable to hold the personalized note.
let personalizedNote = "";

// Function to click the "Add note" button and add your note.
function addNoteAndMessage() {
  const addNoteButton = document.querySelector("button[aria-label='Add a note']");
  if (addNoteButton) {
    addNoteButton.click();
  } else {
    console.error("Add a note button not found.");
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
    personalizedNote = `Hi ${firstName},\nI came across your profile and noticed that you are a fellow Penn Stater. The reason I am reaching out to you is that I had recently applied for the Software Engineer 1 position at Microsoft and I would love to follow your insights on how I can remain a competitive applicant.`;

    // Execute the addNoteAndMessage function immediately.
    addNoteAndMessage();
  }
}

// Function to wait for the "custom-message" textarea to become available.
function waitForTextArea() {
  const textArea = document.getElementById("custom-message");
  if (textArea) {
    textArea.value = personalizedNote;
  } else {
    setTimeout(waitForTextArea, 100); // Retry after 100ms
  }
}

// Set up a click event listener for the "Connect" button.
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target && target.textContent.trim() === "Connect") {
    handleConnectButtonClick();
    waitForTextArea(); // Start waiting for the textarea
  }
});

// You may continue observing the body for changes if needed.
// ...
