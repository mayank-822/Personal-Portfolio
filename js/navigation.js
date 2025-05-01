// Navigation Functionality
function initNavigation() {
  // Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Highlight active navigation link based on scroll position
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 300;
    
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop navigation
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
        
        // Mobile navigation
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Header background on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Smooth scroll to section when clicking navigation links
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  // Add event listeners to navigation links
  navLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    link.addEventListener('click', (e) => scrollToSection(e, sectionId));
  });
  
  mobileNavLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    link.addEventListener('click', (e) => scrollToSection(e, sectionId));
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial call to set the active link
  updateActiveNavLink();
}