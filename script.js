let minutes = 0;
let seconds = 1;
let timerInterval;
let isRunning = false;

function updateDisplay() {
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

function setCustomTime() {
  const input = document.getElementById("customMinutes").value;
  const parsed = parseInt(input);
  if (!isNaN(parsed) && parsed > 0) {
    minutes = parsed;
    seconds = 0;
    updateDisplay();
  } else {
    alert("Please enter a valid number of minutes.");
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Pomodoro complete!");
        growPlant(); 
        return;
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

function growPlant() {
  const grid = document.getElementById("plant-grid");
  const plant = document.createElement("div");
  plant.classList.add("plant-icon");
  plant.setAttribute("draggable", "true");
  plant.id = "plant-" + Date.now();  // Give each plant a unique id
  plant.addEventListener("dragstart", dragStart);
  grid.appendChild(plant);
}

function addPlanToInventory() {
  const grid = document.getElementById('plant-grid');
  const plant = document.createElement("div");
  plant.classList.add("plant-icon");
  plant.setAttribute("draggable","true");
  plant.id = "plant-" + Date.now();
  plant.addEventListener("dragstart", dragStart);
  grid.appendChild(plant);

}
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

// Allow garden to accept drops
const garden = document.getElementById("garden");
garden.addEventListener("dragover", (e) => {
  e.preventDefault(); // Needed to allow drop
});

garden.addEventListener("drop", (e) => {
  e.preventDefault();
  const plantId = e.dataTransfer.getData("text/plain");
  const plant = document.getElementById(plantId);
  garden.appendChild(plant);
  
  // Optional: position the plant where dropped
  const rect = garden.getBoundingClientRect();
  plant.style.position = "absolute";
  plant.style.left = (e.clientX - rect.left - 20) + "px";
  plant.style.top = (e.clientY - rect.top - 20) + "px";
});

document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      const plantId = e.dataTransfer.getData("text/plain");
      const plantElement = document.getElementById(plantId);
      tile.appendChild(plantElement);
    });
  });
});