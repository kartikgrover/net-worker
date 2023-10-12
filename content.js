// Define a variable to hold the personalized note.
let personalizedNote = "";

// Function to click the "Add note" button and add your note.
function addNoteAndMessage() {
  const addNoteButton = document.querySelector("button[aria-label='Add a note']");
  if (addNoteButton) {
    addNoteButton.click();

    // Wait for the "Add a note" dialog to open (you may need to implement this part).

    // Set the personalized note in the "custom-message" textarea when it becomes available.
    const waitForTextArea = setInterval(() => {
      const textArea = document.getElementById("custom-message");
      if (textArea) {
        textArea.value = personalizedNote;
        clearInterval(waitForTextArea);
      }
    }, 100); // Adjust the interval if necessary.
  } else {
    console.error("Add a note button not found.");
  }
}

// Set up a MutationObserver to handle the "Connect" button click event.
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    const buttons = Array.from(mutation.addedNodes).filter((node) => {
      return (
        node.nodeType === Node.ELEMENT_NODE &&
        node.querySelector('.artdeco-button__text')?.textContent.trim() === 'Connect'
      );
    });

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Get the person's name from the LinkedIn profile.
        const nameElement = document.querySelector('span.flex-1 strong');
        if (nameElement) {
          const personName = nameElement.textContent;
          firstName = personName.split(" ")[0];

          // Set the personalizedNote variable
          personalizedNote = `Hi ${firstName},\nI came across your profile and noticed that you are a fellow Penn Stater. The reason I am reaching out to you today is that I had recently applied for the Software Engineer 1 position at Microsoft and I would love to follow your insights on how I can remain a competitive applicant.`;

          // Execute the addNoteAndMessage function immediately.
          addNoteAndMessage();
        }
      });
    });
  });
});

const targetNode = document.body;
const config = { childList: true, subtree: true };

// Start observing the body for changes.
observer.observe(targetNode, config);
