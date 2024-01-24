// Function to generate a unique ID for each medication
function generateID() {
    return Math.random().toString(36).substr(2, 9);
}

// Function to add a new medication
function addMedication() {
    const medicationName = document.getElementById("medicationName").value;
    const medicationTime = document.getElementById("medicationTime").value;
    const medicationDuration = document.getElementById("medicationDuration").value;

    if (!medicationName || !medicationTime || !medicationDuration) {
        alert("Please fill out all fields!");
        return;
    }

    const medicationList = document.getElementById("medicationList");

    // Create a new medication item
    const medicationItem = document.createElement("li");
    medicationItem.classList.add("medication-item");
    medicationItem.id = generateID();

    // Create a div element to hold the medication details
    const medicationDetails = document.createElement("div");
    medicationDetails.classList.add("medication-details");

    // Create paragraph elements for medication name, time, and duration
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = `Medication Name: ${medicationName}`;

    const timeParagraph = document.createElement("p");
    timeParagraph.textContent = `Time: ${medicationTime}`;

    const durationParagraph = document.createElement("p");
    durationParagraph.textContent = `Duration: ${medicationDuration} days`;

    // Create buttons for editing and deleting medication
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editMedication(medicationItem.id));

    const notifyButton = document.createElement("button");
    notifyButton.textContent = "Notification";
    notifyButton.addEventListener("click", () => showNotification(nameParagraph.value,"It's time to take your medication"))

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click",() =>{
        medicationItem.classList.toggle("completed"); 
        this.completeButton.remove();
    } );

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteMedication(medicationItem.id));

    // Append the medication details and buttons to the medication item
    medicationDetails.appendChild(nameParagraph);
    medicationDetails.appendChild(timeParagraph);
    medicationDetails.appendChild(durationParagraph);
    medicationItem.appendChild(medicationDetails);
    medicationItem.appendChild(editButton);
    medicationItem.appendChild(deleteButton);
    medicationItem.appendChild(completeButton);
    medicationItem.appendChild(notifyButton);

    // Append the medication item to the medication list
    medicationList.appendChild(medicationItem);

    // Clear the input fields
    document.getElementById("medicationName").value = "";
    document.getElementById("medicationTime").value = "";
    document.getElementById("medicationDuration").value = "";
}

// Function to edit a medication
function editMedication(itemId) {
    const medicationItem = document.getElementById(itemId);
    const medicationDetails = medicationItem.querySelector(".medication-details");

    const medicationName = prompt("Enter the updated medication name:", medicationDetails.children[0].textContent.split(": ")[1]);
    const medicationTime = prompt("Enter the updated medication time (Hh:mm):", medicationDetails.children[1].textContent.split(": ")[1]);
    const medicationDuration = prompt("Enter the updated medication duration (in days):", medicationDetails.children[2].textContent.split(": ")[1]);

    if (medicationName && medicationTime && medicationDuration) {
        medicationDetails.children[0].textContent = `Medication Name: ${medicationName}`;
        medicationDetails.children[1].textContent = `Time: ${medicationTime}`;
        medicationDetails.children[2].textContent = `Duration: ${medicationDuration} days`;
    }
}

function deleteMedication(itemId) {
    const medicationItem = document.getElementById(itemId);
    medicationItem.remove();
}

function showNotification(main,content) {
    // Check if the browser supports the Notification API
    if ('Notification' in window) {
        // Check if the user has granted permission to show notifications
        if (Notification.permission === 'granted') {
            // Create a notification
            var notification = new Notification(main, {
                body: content
                // Add more options as needed
            });
        } else if (Notification.permission !== 'denied') {
            // Request permission from the user
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    // Create a notification after permission is granted
                    var notification = new Notification(main, {
                        body: content
                        // Add more options as needed
                    });
                }
            });
        }
    }
}
