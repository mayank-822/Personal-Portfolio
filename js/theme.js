// Theme Toggle Functionality
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to set theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  
  // Check for saved theme preference or use OS preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    setTheme(initialTheme);
  }
  
  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth transition
    document.documentElement.classList.add('theme-transition');
    
    // Set the new theme
    setTheme(newTheme);
    
    // Remove transition class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
    
    // Optional: Add interactive feedback
    themeToggleBtn.classList.add('animate-pulse-slow');
    setTimeout(() => {
      themeToggleBtn.classList.remove('animate-pulse-slow');
    }, 500);
  });
  
  // Listen for OS theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    }
  });
}