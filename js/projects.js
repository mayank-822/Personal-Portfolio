// Projects Functionality
function initProjects() {
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Set initial state - show all projects
  filterButtons[0].classList.add('active');
  
  // Filter projects when a button is clicked
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects based on category
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Hide all cards with a fade effect
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
  
  // Project details modal (optional)
  const createProjectModal = () => {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-container neumorph-card">
        <button class="modal-close">×</button>
        <div class="modal-content">
          <div class="modal-image">
            <img src="" alt="Project Image">
          </div>
          <div class="modal-details">
            <h3 class="modal-title"></h3>
            <p class="modal-description"></p>
            <div class="modal-tech"></div>
            <div class="modal-links">
              <a href="#" class="neumorph-button primary view-project" target="_blank">View Project</a>
              <a href="#" class="neumorph-button secondary view-code" target="_blank">View Code</a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal functionality
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
    
    return modal;
  };
  
  // Create project modal (uncomment to enable)
  // const projectModal = createProjectModal();
  
  // Open project details in modal
  // projectCards.forEach(card => {
  //   card.addEventListener('click', (e) => {
  //     // Prevent opening if clicking on direct links
  //     if (e.target.closest('.project-link')) return;
  //     
  //     const title = card.querySelector('.project-title').textContent;
  //     const description = card.querySelector('.project-description').textContent;
  //     const imageSrc = card.querySelector('.project-image img').src;
  //     const techTags = card.querySelector('.project-technologies').innerHTML;
  //     
  //     // Set modal content
  //     projectModal.querySelector('.modal-title').textContent = title;
  //     projectModal.querySelector('.modal-description').textContent = description;
  //     projectModal.querySelector('.modal-image img').src = imageSrc;
  //     projectModal.querySelector('.modal-tech').innerHTML = techTags;
  //     
  //     // Show modal
  //     projectModal.classList.add('active');
  //     document.body.classList.add('no-scroll');
  //   });
  // });
}