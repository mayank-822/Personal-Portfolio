// Contact Form Validation and Handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  
  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Show error message
  const showError = (input, errorElement, message) => {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
  };
  
  // Clear error message
  const clearError = (input, errorElement) => {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
  };
  
  // Real-time validation for inputs
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters');
    } else {
      clearError(nameInput, nameError);
    }
  });
  
  emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address');
    } else {
      clearError(emailInput, emailError);
    }
  });
  
  subjectInput.addEventListener('input', () => {
    if (subjectInput.value.trim().length < 3) {
      showError(subjectInput, subjectError, 'Subject must be at least 3 characters');
    } else {
      clearError(subjectInput, subjectError);
    }
  });
  
  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
    } else {
      clearError(messageInput, messageError);
    }
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters');
      isValid = false;
    }
    
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
    }
    
    if (subjectInput.value.trim().length < 3) {
      showError(subjectInput, subjectError, 'Subject must be at least 3 characters');
      isValid = false;
    }
    
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    // Form is valid - prepare form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim()
    };
    
    // Submit button state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual AJAX call if needed)
    setTimeout(() => {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success-message';
      successMessage.innerHTML = `
        <div class="neumorph-card success-card">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <p>Thank you for your message! I'll get back to you soon.</p>
        </div>
      `;
      
      // Reset form
      contactForm.reset();
      
      // Append success message
      contactForm.appendChild(successMessage);
      
      // Reset button
      submitButton.innerText = originalText;
      submitButton.disabled = false;
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
          successMessage.remove();
        }, 300);
      }, 5000);
      
      // Log form data (replace with actual form processing)
      console.log('Form submitted:', formData);
    }, 1500);
  });
}