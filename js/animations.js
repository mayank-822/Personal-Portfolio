// Animations and Effects
function initAnimations() {
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Animated skill bars
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    skillBars.forEach(bar => {
      const percentage = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
      bar.style.width = '0%';
      
      // Use Intersection Observer to trigger animation when in viewport
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = percentage;
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  };
  
  // Typing animation for hero text (optional)
  const initTypingAnimation = () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let charIndex = 0;
    
    const typeText = () => {
      if (charIndex < text.length) {
        heroTitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeText, 500);
  };
  
  // Hover effects for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelector('.project-overlay').style.opacity = '0';
    });
  });
  
  // Custom cursor effect (optional)
  const initCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
      });
    });
  };
  
  // Button press effect
  const buttons = document.querySelectorAll('.neumorph-button');
  buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
      button.classList.add('pressed');
    });
    
    button.addEventListener('mouseup', () => {
      button.classList.remove('pressed');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('pressed');
    });
  });
  
  // Initialize all animations
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  animateSkillBars();
  
  // Optional animations - enable as needed
  // initTypingAnimation();
  // initCustomCursor();
}