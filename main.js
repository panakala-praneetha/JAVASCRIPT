// Initial Event Data
const events = [
  { name: "Music Fiesta", date: "2025-06-15", category: "Music", seats: 10 },
  { name: "Yoga Morning", date: "2025-07-01", category: "Health", seats: 15 },
  { name: "Tech Meetup", date: "2025-08-20", category: "Technology", seats: 20 },
  { name: "Painting Workshop", date: "2025-09-05", category: "Art", seats: 8 }
];

let registeredEvents = [];

// Cached DOM Elements
const allEventsContainer = document.querySelector("#allEvents");
const myEventsList = document.querySelector("#myEventsList");
const addEventForm = document.querySelector("#addEventForm");
const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");
const filterMusicBtn = document.querySelector("#filterMusic");
const showAllBtn = document.querySelector("#showAll");

// Track Current Filters/Search
let currentCategoryFilter = null;
let currentSearchTerm = "";

/**
 * Renders the list of events based on current filters
 */
const renderEvents = () => {
  allEventsContainer.innerHTML = "";

  const normalizedSearch = currentSearchTerm.trim().toLowerCase();

  const filteredEvents = events.filter(event => {
    const matchesCategory = !currentCategoryFilter || event.category === currentCategoryFilter;
    const matchesSearch = event.name.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  if (filteredEvents.length === 0) {
    allEventsContainer.innerHTML = "<p>No events found.</p>";
    return;
  }

  filteredEvents.forEach(event => {
    allEventsContainer.appendChild(createEventCard(event));
  });
};

/**
 * Creates a DOM element for a single event card
 * @param {Object} event 
 * @returns {HTMLElement}
 */
const createEventCard = (event) => {
  const card = document.createElement("div");
  card.className = "event-card";

  card.innerHTML = `
    <h3>${event.name}</h3>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Category:</strong> ${event.category}</p>
    <p><strong>Seats:</strong> ${event.seats}</p>
  `;

  const registerBtn = document.createElement("button");
  registerBtn.textContent = "Register";
  registerBtn.onclick = () => registerEvent(event.name);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.marginLeft = "10px";
  cancelBtn.onclick = () => cancelEvent(event.name);

  card.appendChild(registerBtn);
  card.appendChild(cancelBtn);

  return card;
};

/**
 * Updates the "My Registered Events" list
 */
const updateMyEvents = () => {
  myEventsList.innerHTML = "";
  registeredEvents.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    myEventsList.appendChild(li);
  });
};

/**
 * Registers an event by name
 * @param {string} name 
 */
const registerEvent = (name) => {
  if (!registeredEvents.includes(name)) {
    registeredEvents.push(name);
    updateMyEvents();
  }
};

/**
 * Cancels a registered event by name
 * @param {string} name 
 */
const cancelEvent = (name) => {
  registeredEvents = registeredEvents.filter(e => e !== name);
  updateMyEvents();
};

/**
 * Adds a new event from the form inputs
 */
const addEvent = () => {
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const category = document.getElementById("eventCategory").value;
  const seats = parseInt(document.getElementById("eventSeats").value, 10);

  if (name && date && category && !isNaN(seats)) {
    events.push({ name, date, category, seats });
    renderEvents();
  }
};

// Event Listeners

// Add event form submit
addEventForm.onsubmit = (e) => {
  e.preventDefault();
  addEvent();
  addEventForm.reset();
};

// Category dropdown change
categoryFilter.onchange = (e) => {
  currentCategoryFilter = e.target.value || null;
  renderEvents();
};

// Search input typing
searchInput.addEventListener("input", (e) => {
  currentSearchTerm = e.target.value;
  renderEvents();
});

// Filter buttons
filterMusicBtn.onclick = () => {
  currentCategoryFilter = "Music";
  currentSearchTerm = "";
  categoryFilter.value = "Music";
  searchInput.value = "";
  renderEvents();
};

showAllBtn.onclick = () => {
  currentCategoryFilter = null;
  currentSearchTerm = "";
  categoryFilter.value = "";
  searchInput.value = "";
  renderEvents();
};

// Initial render
renderEvents();
updateMyEvents();
