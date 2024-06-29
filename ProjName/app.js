// Select elements from the DOM
const header = document.querySelector('h1'); // Header element
const app = document.getElementById('app'); // Main app container
const ddMenu = document.querySelector('#ddMenu'); // Dropdown menu
const sandwitch = document.querySelectorAll('svg'); // Sandwich menu icons
const html = document.documentElement; // HTML root element

// Toggle the 'dark' class on the HTML element
const toggle = () => html.classList.toggle('dark');

// Set the view based on the selected option
const setView = (v) => {
    header.innerText = v; // Set header text
    toggleMenu(true); // Hide the menu

    // Render different views based on the selected option
    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
}

// Toggle the visibility of the dropdown menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden'); // Toggle hidden class on the dropdown menu
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden'); // Toggle hidden class on all SVG elements
        });
    } else {
        ddMenu.classList.add('hidden'); // Hide the dropdown menu
        document.querySelectorAll('svg')[0].classList.remove('hidden'); // Show the first SVG
        document.querySelectorAll('svg')[1].classList.add('hidden'); // Hide the second SVG
    }
}

// Add a new row to the specified container with the given content
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`; // Create a new row with the content
    container.insertAdjacentHTML('beforeend', row); // Add the row to the container
}

// Add a monitor (display area) to the specified container with the given text
const addMonitor = (container, text) => {
    const t = text ?? ''; // Set the text to an empty string if not provided
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`; // Create the monitor element
    container.insertAdjacentHTML('beforeend', monitor); // Add the monitor to the container
}

// Create a button element with the specified text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''; // Apply a special class if the text is 'calculate'
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`; // Return the button HTML
}

// Add buttons to the specified container based on the given array of numbers
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join(''); // Create button HTML for each number
    addRow(container, btnHTML); // Add the buttons to the container
}

// Handle click events on the buttons
const click = (event) => {
    const monitor = document.getElementById('monitor'); // Get the monitor element
    const bac = monitor.innerText.trim(); // Get the current text in the monitor
    const a = event.target.innerText; // Get the text of the clicked button
    console.log(a); // Log the clicked button text for debugging
    if (a === 'clear') {
        monitor.innerText = ''; // Clear the monitor text
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac); // Calculate the result and display it
    } else {
        monitor.innerText += a; // Append the clicked button text to the monitor
    }
}

// Render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']; // Button labels
    app.innerHTML = ''; // Clear the app container
    addMonitor(app); // Add the monitor to the app
    addButtons(app, labels); // Add the buttons to the app
    const buttons = document.querySelectorAll('.d-btn'); // Get all buttons
    buttons.forEach((el) => el.addEventListener('click', click)); // Add click event listeners to the buttons
}

// Render the 'About' view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'; // Set the content for the About view
}

// Render the 'Contact' view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'; // Set the content for the Contact view
}

// Render the dropdown menu
const renderMenu = () => {
    const menuHTML = `
        <button class="block py-1 px-2" onclick="setView('Calculator')">Calculator</button>
        <button class="block py-1 px-2" onclick="setView('About')">About</button>
        <button class="block py-1 px-2" onclick="setView('Contact')">Contact</button>
    `; // Create menu buttons
    ddMenu.innerHTML = menuHTML; // Set the menu HTML
}

// Render the theme toggle buttons
const renderThemeToggle = () => {
    const themeToggleHTML = `
        <button class="dark:hidden block" onclick="toggle()">Dark</button>
        <button class="hidden dark:block" onclick="toggle()">Light</button>
    `; // Create theme toggle buttons
    document.querySelector('.flex.justify-between > div').innerHTML = themeToggleHTML; // Set the theme toggle HTML
}

// Initial render calls
renderMenu(); // Render the dropdown menu
renderThemeToggle(); // Render the theme toggle buttons
renderCalculator(); // Render the calculator view by default
