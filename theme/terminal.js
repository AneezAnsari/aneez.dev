document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded: Initializing Terminal Script"); // Add this line

    const terminalToggleLink = document.getElementById('terminalToggleLink');
    const terminalContainer = document.getElementById('terminalContainer');
    const terminalOutput = document.getElementById('terminalOutput'); // Assuming you have this
    const terminalInput = document.getElementById('terminalInput');   // Assuming you have this
    const terminalBackdrop = document.getElementById('terminal-backdrop'); // If you added this

    console.log('terminalToggleLink element:', terminalToggleLink);
    console.log('terminalContainer element:', terminalContainer);
    console.log('terminalOutput element:', terminalOutput);
    console.log('terminalInput element:', terminalInput);
    console.log('terminalBackdrop element:', terminalBackdrop);


    if (!terminalToggleLink) {
        console.error("ERROR: terminalToggleLink (ID: 'terminalToggleLink') not found in HTML!");
    }
    if (!terminalContainer) {
        console.error("ERROR: terminalContainer (ID: 'terminalContainer') not found in HTML!");
    }
    // ... rest of your terminal.js code
    // (Make sure the existing addEventListener for terminalToggleLink is below these console logs)

    if (terminalToggleLink && terminalContainer) { // Only attach listener if both are found
        terminalToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Terminal toggle link clicked!"); // Add this line
            terminalContainer.classList.toggle('is-visible');
            if (terminalBackdrop) {
                terminalBackdrop.classList.toggle('is-visible');
            }
            if (terminalContainer.classList.contains('is-visible')) {
                terminalInput.focus();
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }
    // ... rest of your terminal.js code (like handling commands, etc.)
});

    function handleCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const arg = parts[1];

        // Fixed the template literal issue: `aneez@portfolio:~${currentPath}$ ${command}`
        printToTerminal(`aneez@portfolio:~${currentPath}$ ${command}`, 'command'); // Echo command

        switch (cmd) {
            case 'help':
                printToTerminal("Available commands:");
                printToTerminal("- ls: List contents of current directory.");
                printToTerminal("- cd [directory]: Change directory. Use 'cd ..' to go up.");
                printToTerminal("- clear: Clear the terminal screen.");
                printToTerminal("- about: Learn about this portfolio.");
                printToTerminal("- home: Go back to the main homepage.");
                // Specific commands for sections
                if (currentPath === '/') {
                    printToTerminal("- projects: Go to projects section.");
                    printToTerminal("- connect: Go to connect section.");
                    printToTerminal("- resume: Go to resume section.");
                } else if (currentPath === '/connect') {
                    printToTerminal("- email: Display email address.");
                    printToTerminal("- github: Open GitHub profile.");
                    printToTerminal("- pgp: Download PGP public key.");
                } else if (currentPath === '/resume') {
                    printToTerminal("- download-pdf: Download resume PDF.");
                }
                break;

            case 'ls':
                const contents = fileSystem[currentPath];
                if (contents) {
                    contents.forEach(item => {
                        let displayItem = item;
                        // Fixed the template literal issue: `${currentPath}${item}/`
                        if (fileSystem[`${currentPath}${item}/`]) { // Check if it's a directory
                            displayItem += '/';
                        }
                        printToTerminal(displayItem);
                    });
                } else {
                    printToTerminal(`Error: Cannot list contents of ${currentPath}`, 'error');
                }
                break;

            case 'cd':
                if (arg === '..') {
                    const lastSlash = currentPath.lastIndexOf('/', currentPath.length - 2);
                    if (lastSlash !== -1) {
                        currentPath = currentPath.substring(0, lastSlash + 1);
                    } else {
                        currentPath = '/';
                    }
                    printToTerminal(`Changed directory to ${currentPath}`);
                }
                // Fixed the template literal issue: `${currentPath}${arg}/`
                else if (arg && fileSystem[`${currentPath}${arg}/`]) {
                    currentPath = `${currentPath}${arg}/`;
                    printToTerminal(`Changed directory to ${currentPath}`);
                } else if (arg === 'projects') {
                    window.location.href = 'main/projects/index.html';
                } else if (arg === 'connect') {
                    window.location.href = 'main/connect/index.html';
                } else if (arg === 'resume') {
                    window.location.href = 'main/resume/index.html';
                } else {
                    printToTerminal(`Error: Directory not found: ${arg}`, 'error');
                }
                // Update prompt with new path if displayed dynamically
                // Fixed the template literal issue: `aneez@portfolio:~${currentPath}$`
                document.querySelector('.terminal-prompt').textContent = `aneez@portfolio:~${currentPath}$`;
                break;

            case 'clear':
                terminalOutput.innerHTML = 'Welcome to the Aneez shell. Type \'help\' for commands.\n';
                break;

            case 'about':
                printToTerminal("This is Aneez's digital playground, showcasing projects, thoughts, and creations.");
                printToTerminal("Currently, you are interacting with a simulated terminal.");
                break;

            case 'home':
                window.location.href = './index.html';
                break;

            // Specific commands for /connect
            case 'email':
                if (currentPath === '/connect/') {
                    printToTerminal("My email: aneez.professional@protonmail.com");
                } else {
                    printToTerminal("Error: 'email' command only available in /connect", 'error');
                }
                break;
            case 'github':
                if (currentPath === '/connect/') {
                    printToTerminal("Opening GitHub profile...");
                    window.open("https://github.com/AneezAnsari", "_blank"); // Open in new tab
                } else {
                    printToTerminal("Error: 'github' command only available in /connect", 'error');
                }
                break;
            case 'pgp':
                if (currentPath === '/connect/') {
                    printToTerminal("Downloading PGP public key...");
                    // Create a temporary link to trigger download
                    const a = document.createElement('a');
                    a.href = 'main/about/connect/pgp_public.asc'; // Adjust path if needed
                    a.download = 'pgp_public.asc';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    printToTerminal("Error: 'pgp' command only available in /connect", 'error');
                }
                break;

            // Specific commands for /resume
            case 'download-pdf':
                if (currentPath === '/resume/') {
                    printToTerminal("Downloading resume PDF...");
                    // Create a temporary link to trigger download
                    const a = document.createElement('a');
                    a.href = 'assets/books/Aneez_Resume.pdf'; // **UPDATE THIS PATH TO YOUR ACTUAL RESUME PDF**
                    a.download = 'Aneez_Resume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    printToTerminal("Error: 'download-pdf' command only available in /resume", 'error');
                }
                break;

            default:
                printToTerminal(`Error: Command not found: ${cmd}. Type 'help' for commands.`, 'error');
        }
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent new line in input
            const command = terminalInput.value.trim();
            if (command) {
                handleCommand(command);
                terminalInput.value = ''; // Clear input field
            }
        }
    });

    // --- Terminal Toggling Logic ---
    terminalToggleLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the '#' in href from jumping the page
        terminalContainer.classList.toggle('is-visible');
        // if (terminalBackdrop) terminalBackdrop.classList.toggle('is-visible'); // Toggle backdrop if you added it

        if (terminalContainer.classList.contains('is-visible')) {
            terminalInput.focus(); // Focus input when terminal becomes visible
            // Optionally clear output when opened (uncomment if desired)
            // terminalOutput.innerHTML = 'Welcome to the Aneez shell. Type \'help\' for commands.\n';
        }
    });
}); // End of the single DOMContentLoaded listener