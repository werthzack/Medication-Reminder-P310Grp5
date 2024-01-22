function addMedication() {
    const medicationName = document.getElementById('medicationName').value;
    const medicationTime = document.getElementById('medicationTime').value;

    if (medicationName && medicationTime) {
        const newItem = document.createElement('li');
        newItem.className = 'medication-item';
        newItem.innerHTML = `
            <span>${medicationName} - ${medicationTime}</span>
            <button onclick="deleteMedication(this)">Delete</button>
            <button onclick="markCompleted(this)">Mark Completed</button>
        `;

        document.getElementById('medicationList').appendChild(newItem);

        // Add reminder logic (you may use browser notifications or other methods)
        scheduleReminder(medicationName, medicationTime);
    }
}

function markCompleted(button) {
    const listItem = button.parentElement;
    listItem.classList.add('completed');
}
function logout() {
    window.location.href = '/views/Home.html';
}
function deleteMedication(button) {
// Remove the medication item from the list
const listItem = button.parentNode;
const medList = listItem.parentNode;
medList.removeChild(listItem);

// Show notification
showNotification();
}

function scheduleReminder(medicationName, medicationTime) {
    // Add logic to schedule reminders (e.g., using setTimeout, setInterval, or other methods)
    // Example: You can compare the current time with the specified medicationTime and trigger a reminder
    const currentTime = new Date();
    const [hours, minutes] = medicationTime.split(':');
    const medicationTimeObject = new Date();
    medicationTimeObject.setHours(hours, minutes, 0, 0);

    if (medicationTimeObject > currentTime) {
        const timeDifference = medicationTimeObject - currentTime;
        setTimeout(() => {
            // Add reminder logic here (e.g., browser notification)
            alert(`Time to take ${medicationName}!`);
        }, timeDifference);
    }
}