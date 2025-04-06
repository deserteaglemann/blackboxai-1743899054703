// CLOD - Main Application Script
document.addEventListener('DOMContentLoaded', () => {
    // Form submission handler
    const djLoginForm = document.getElementById('dj-login');
    if (djLoginForm) {
        djLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // TODO: Implement actual authentication
            console.log('DJ login submitted');
            // Temporary redirect for development
            window.location.href = 'create-event.html';
        });
    }

    // Register button handler
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            // TODO: Implement registration flow
            alert('Registration feature coming soon!');
        });
    }

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });

    // Dark mode toggle (for future implementation)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 bg-neon-dark text-white px-3 py-1 rounded text-sm';
    tooltip.textContent = tooltipText;
    tooltip.style.top = `${e.target.offsetTop - 30}px`;
    tooltip.style.left = `${e.target.offsetLeft}px`;
    tooltip.id = 'current-tooltip';
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.getElementById('current-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'false') {
    document.documentElement.classList.remove('dark');
}

// Utility function for API calls
async function clodFetch(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`/api/${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error('CLOD API Error:', error);
        return { error: true, message: 'Network error' };
    }
}