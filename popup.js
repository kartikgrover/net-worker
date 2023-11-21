document.addEventListener('DOMContentLoaded', function () {
  const noteInput = document.getElementById('noteInput');
  const noteOutput = document.getElementById('noteOutput');
  const saveButton = document.getElementById('saveButton');

  // Retrieve the saved personalized note and set it in the noteInput
  chrome.storage.sync.get(['personalizedNote'], function (result) {
    const savedNote = result.personalizedNote || '';
    noteInput.value = savedNote;
    noteOutput.value = savedNote; // Set the saved note in the noteOutput
  });

  // Add an event listener to the Save button in the popup
  saveButton.addEventListener('click', function () {
    // Save the current content of the noteInput to storage
    const currentNote = noteInput.value;
    chrome.storage.sync.set({ personalizedNote: currentNote });

    // Set the saved note in the noteOutput
    noteOutput.value = currentNote;

    // Clear the noteInput after saving
    noteInput.value = '';
  });

  // Add keydown event listener to noteInput to detect Enter key press
  noteInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      // Prevent the default behavior of the Enter key in a textarea
      event.preventDefault();
      
      // Simulate a click on the Save button
      saveButton.click();
    }
  });
});
