document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initTheme();
  initNavigation();
  initAnimations();
  initProjects();
  initContactForm();
  initCounters();
  initBackToTop();
});

// Initialize counters
function initCounters() {
  const counterElements = document.querySelectorAll('.counter');
  
  const startCounting = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const count = +element.innerText;
    const increment = target / 100;
    
    if (count < target) {
      element.innerText = Math.ceil(count + increment);
      setTimeout(() => startCounting(element), 20);
    } else {
      element.innerText = target;
    }
  };
  
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5
  });
  
  counterElements.forEach(counter => {
    counter.innerText = '0';
    observer.observe(counter);
  });
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  const toggleBackToTopButton = () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  };
  
  window.addEventListener('scroll', toggleBackToTopButton);
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Handle form submission (placeholder)
document.addEventListener('submit', function(e) {
  if (e.target.id === 'contact-form') {
    e.preventDefault();
    
    // Simulate successful form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      const formMessage = document.createElement('div');
      formMessage.className = 'form-message success';
      formMessage.innerHTML = `
        <p>Thank you for your message! I'll get back to you soon.</p>
      `;
      
      e.target.reset();
      e.target.appendChild(formMessage);
      submitButton.innerText = originalText;
      submitButton.disabled = false;
      
      setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => formMessage.remove(), 300);
      }, 5000);
    }, 1500);
  }
});

// Add preloader (optional)
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('preloader-finish');
  }
});

// Handle responsive images
function handleResponsiveImages() {
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    if (window.innerWidth < 768) {
      // Smaller image for mobile
      heroImage.src = heroImage.getAttribute('data-mobile-src') || heroImage.src;
    } else {
      // Full sized image for desktop
      heroImage.src = heroImage.getAttribute('data-desktop-src') || heroImage.src;
    }
  }
}

window.addEventListener('resize', handleResponsiveImages);
handleResponsiveImages();