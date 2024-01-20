function showHomePage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("homePage").style.display = "block";
}

function addMedication() {
  // Get values from the form
  const medication = document.getElementById("medication").value;
  const time = document.getElementById("time").value;

  // Add medication to the list
  const medList = document.getElementById("medList");
  const listItem = document.createElement("li");
  listItem.className = "medication-item";
  listItem.innerHTML = `
        <span>${medication} - ${time}</span>
        <button onclick="editMedication(this)">Edit</button>
        <button onclick="deleteMedication(this)">Delete</button>
        <button onclick="completeMedication(this)">Complete</button>
    `;
  medList.appendChild(listItem);

  // Show notification
  showNotification();

  // Clear form fields
  document.getElementById("medication").value = "";
  document.getElementById("time").value = "";
}

function editMedication(button) {
  // Implement medication editing logic
  showNotification();
}

function deleteMedication(button) {
  // Remove the medication item from the list
  const listItem = button.parentNode;
  const medList = listItem.parentNode;
  medList.removeChild(listItem);

  // Show notification
  showNotification();
}

function completeMedication(button) {
  // Mark the medication item as complete
  const listItem = button.parentNode;
  listItem.classList.add("completed");

  // Show notification
  showNotification();
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}
