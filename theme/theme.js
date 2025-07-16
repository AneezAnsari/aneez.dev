// themes/theme.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // This refers to the <html> tag
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');

    // Function to set the theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update theme-color meta tag
        if (themeColorMetaTag) {
            if (theme === 'dark') {
                themeColorMetaTag.setAttribute('content', '#000000'); // Black for dark mode
            } else {
                themeColorMetaTag.setAttribute('content', '#FFFFFF'); // White for light mode
            }
        }
    };

    // Check for saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no theme is saved, default to light mode (or detect system preference)
        setTheme('light');
    }

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }
});
