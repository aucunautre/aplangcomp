let timerInterval;
let totalSeconds = 0;
let initialTotalSeconds = 0;

const startTimer = () => {
  const countdownForm = document.getElementById("countdown");
  const minutes = Number(countdownForm.elements[0].value);
  const seconds = Number(countdownForm.elements[1].value);

  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Numbers only, please!");
    return;
  }

  // Convert minutes and seconds to total seconds
  totalSeconds = minutes * 60 + seconds;
  initialTotalSeconds = totalSeconds;

  // Toggle buttons
  document.querySelector(".timer").classList.add("hide");
  document.querySelector(".clear").classList.remove("hide");

  // Show the timer display
  document.getElementById("demo").classList.remove("hide");
  document.getElementById("progress").classList.remove("hide");

  // Immediately display initial time
  updateTimerDisplay();

  // Start the timer countdown
  timerInterval = setInterval(() => {
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      document.getElementById("demo").innerHTML = "TIME'S UP!";

      // Show start button and hide clear button when timer expires
      document.querySelector(".timer").classList.remove("hide");
      document.querySelector(".clear").classList.add("hide");
      return;
    }

    updateTimerDisplay();
  }, 1000);
};

const clearTimer = () => {
  // Stop the timer
  clearInterval(timerInterval);

  // Reset display
  document.getElementById("demo").innerHTML = "";
  document.getElementById("progress-bar").style.width = "0%";

  // Reset form if needed
  const countdownForm = document.getElementById("countdown");
  if (countdownForm) {
    countdownForm.elements[0].value = "";
    countdownForm.elements[1].value = "";
  }

  // Show start button and hide clear button
  document.querySelector(".timer").classList.remove("hide");
  document.querySelector(".clear").classList.add("hide");

  // Hide the timer display elements
  document.getElementById("demo").classList.add("hide");
  document.getElementById("progress").classList.add("hide");
};

const updateTimerDisplay = () => {
  // Calculate minutes and seconds correctly
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60) % 60;

  const formattedMinutes = formatTimeUnit(minutes);
  const formattedSeconds = formatTimeUnit(seconds);

  document.getElementById(
    "demo"
  ).innerHTML = `${formattedMinutes}:${formattedSeconds}`;

  // Update progress bar
  if (initialTotalSeconds > 0) {
    const progressPercentage = (totalSeconds * 100) / initialTotalSeconds;
    document.getElementById(
      "progress-bar"
    ).style.width = `${progressPercentage}%`;
  }
};

const formatTimeUnit = (unit) => {
  return unit < 10 ? `0${unit}` : `${unit}`;
};
