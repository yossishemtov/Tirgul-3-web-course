// Select elements from the DOM
const header = document.querySelector('h1'); // Main header element
const app = document.getElementById('app'); // Main application container
const ddMenu = document.querySelector('#ddMenu'); // Dropdown menu container
const sandwitch = document.querySelectorAll('svg'); // Hamburger and close icons
const html = document.documentElement; // Root HTML element

// Toggle the 'dark' class on the HTML element
const toggle = () => {
    html.classList.toggle('dark'); // Switch between dark and light themes
}

// Set the view based on the selected option
function setView(v) {
    header.innerText = v; // Update the header with the selected view
    toggleMenu(true); // Hide the menu after selection

    // Clear previous content
    app.innerHTML = '';

    // Render different views based on the selected option
    if (v === 'Calculator') {
        renderCalculator(); // Show the calculator
    } else if (v === 'About') {
        renderAbout(); // Show about section
    } else if (v === 'Contact') {
        renderContact(); // Show contact section
    }
}

// Toggle the visibility of the dropdown menu
function toggleMenu(hide) {
    if (!hide) {
        ddMenu.classList.toggle('hidden'); // Show or hide the menu
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden'); // Toggle icons
        });
    } else {
        ddMenu.classList.add('hidden'); // Hide the menu
        document.querySelectorAll('svg')[0].classList.remove('hidden'); // Show hamburger icon
        document.querySelectorAll('svg')[1].classList.add('hidden'); // Hide close icon
    }
}

// Add a new row to the specified container with the given content
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`; // Create row layout
    container.insertAdjacentHTML('beforeend', row); // Append row to container
}

// Add a monitor (display area) to the specified container with the given text
const addMonitor = (container, text) => {
    const t = text ?? ''; // Default text if not provided
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor); // Append monitor to container
}

// Create a button element with the specified text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''; // Full width for 'calculate' button
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
}

// Add buttons to the specified container based on the given array of numbers
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join(''); // Generate buttons HTML
    addRow(container, btnHTML); // Add buttons row to container
}

// Handle click events on the buttons
const click = (event) => {
    const monitor = document.getElementById('monitor'); // Display area
    const bac = monitor.innerText.trim(); // Current text on monitor
    const a = event.target.innerText; // Text of clicked button
    console.log(a); // Log button text

    if (a === 'clear') {
        monitor.innerText = ''; // Clear monitor
    } else if (a === 'calculate') {
        try {
            monitor.innerText = bac + '=' + eval(bac); // Calculate and display result
        } catch {
            monitor.innerText = 'Error'; // Handle errors in expression
        }
    } else {
        monitor.innerText += a; // Append button text to monitor
    }
}

// Render the calculator view
function renderCalculator() {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']; // Buttons labels
    app.innerHTML = ''; // Clear app container
    addMonitor(app); // Add display area
    addButtons(app, labels); // Add buttons
    const buttons = document.querySelectorAll('.d-btn'); // Select all buttons
    buttons.forEach((el) => el.addEventListener('click', click)); // Add click event listener to buttons
}

// Render the 'About' view
function renderAbout() {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">About content goes here.</div>'; // About section content
}

// Render the 'Contact' view
function renderContact() {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Contact content goes here.</div>'; // Contact section content
}

// Render the theme toggle buttons
function renderThemeToggle() {
    const themeToggleContainer = document.getElementById('insertTheme'); // Container for theme toggle buttons

    const darkButton = document.createElement('button'); // Button to activate dark theme
    darkButton.classList.add('dark:hidden', 'block'); // Classes for visibility
    darkButton.onclick = toggle; // Toggle theme on click
    darkButton.textContent = 'Dark'; // Button label

    const lightButton = document.createElement('button'); // Button to activate light theme
    lightButton.classList.add('hidden', 'dark:block'); // Classes for visibility
    lightButton.onclick = toggle; // Toggle theme on click
    lightButton.textContent = 'Light'; // Button label

    themeToggleContainer.innerHTML = ''; // Clear existing buttons
    themeToggleContainer.appendChild(darkButton); // Append dark mode button
    themeToggleContainer.appendChild(lightButton); // Append light mode button
}

// Initial render calls
renderThemeToggle(); // Render theme toggle buttons
renderCalculator(); // Render initial calculator view
