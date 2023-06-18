const timerButtons = document.querySelectorAll("[data-time]");
const customForm = document.querySelector("#custom");
const timeLeft = document.querySelector(".display-time-left");
const endTime = document.querySelector(".display-end-time");
const startButton = document.querySelector(".timer-button-start");
const pauseButton = document.querySelector(".timer-button-pause");
const resetButton = document.querySelector(".timer-button-reset");

// Variable to store the interval id for the active timer
let countdown;

// Timer function that takes the number of seconds as input
function timer(seconds) {
  // Clear any existing intervals
  clearInterval(countdown);

  // Get the current time and calculate the end time
  const now = Date.now();
  const then = now + seconds * 1000;

  // Display the initial time left and the end time
  displayTimeLeft(seconds);
  displayEndTime(then);

  // Set up an interval to update the time remaining every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // If the timer has ended, clear the interval and return
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // Display the updated time left
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Function to display the time left
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;

  // Update the time left display
  timeLeft.textContent = display;

  // Update the title of the document
  document.title = display;
}

// Function to display the end time
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  // Determine the hour and format the minutes
  const displayHour = hour > 12 ? hour - 12 : hour;
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Update the end time display
  endTime.textContent = `Be Back At ${displayHour}:${displayMinutes}`;
}

// Add event listeners to the timer buttons
timerButtons.forEach((button) => button.addEventListener("click", startTimer));

// Function to start the timer when the start button is clicked
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// Add event listener to the start button
startButton.addEventListener("click", () => {
  const seconds = parseInt(customForm.minutes.value) * 60;
  timer(seconds);
  customForm.reset();
});

// Add event listener to the pause button
pauseButton.addEventListener("click", () => {
  clearInterval(countdown);
});

// Add event listener to the reset button
resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  timer(0);
});
