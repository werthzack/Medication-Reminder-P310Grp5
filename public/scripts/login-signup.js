const passwordInput = document.getElementById("password");
const showHideText = document.getElementById("showHideText");

showHideText.addEventListener("click", function () {
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		showHideText.textContent = "Hide";
	} else {
		passwordInput.type = "password";
		showHideText.textContent = "Show";
	}
});
