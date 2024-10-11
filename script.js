document.addEventListener('DOMContentLoaded', function() {
  const resumeDialog = document.getElementById("resume-dialog");
  const openButton = document.getElementById("resume-btn");
  const closeButton = document.querySelector(".close-resume");
  const body = document.body;

  
  // Create overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  body.appendChild(overlay);

  // Nav menu functionality
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  const menuItems = document.querySelectorAll('.nav-links a');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;

  // Default message for the description area
  const defaultDescriptionMessage = "Click on a project to view details";

  function setDefaultDescriptionMessage() {
    const projectDescription = document.getElementById("description");
    if (!projectDescription.innerHTML.trim()) {
      projectDescription.innerHTML = `<p>${defaultDescriptionMessage}</p>`;
    }
  }

  setDefaultDescriptionMessage();

  // Add event listeners to navigation items
  const navItems = document.querySelectorAll('nav ul li a');
  navItems.forEach((navItem) => {
    navItem.addEventListener('click', (event) => {
      event.preventDefault();

      // Get the target section ID from the href attribute
      const targetSectionId = navItem.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetSectionId);

      // Scroll to the target section
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Project tiles functionality
  const projectTiles = document.querySelectorAll(".project-tile");
  projectTiles.forEach((tile) => {
    const title = tile.querySelector(".project-title").textContent;
    const description = tile.querySelector(".project-details").innerHTML;

    tile.addEventListener("mouseover", () => {
      document.documentElement.style.setProperty("--animation-play-state", "paused");
    });

    tile.addEventListener("click", () => {
      const projectDescription = document.getElementById("description");
      projectDescription.innerHTML = `<h3>${title}</h3>${description}`;
    });

    tile.addEventListener("mouseout", () => {
      document.documentElement.style.setProperty("--animation-play-state", "running");
    });
  });

  // Set default project description message if the description is empty
  const projectDescription = document.getElementById("description");
  projectDescription.addEventListener('DOMSubtreeModified', setDefaultDescriptionMessage);

  // Modal functionality
  openButton.addEventListener("click", function() {
    resumeDialog.showModal();
    overlay.style.display = "block";
    body.classList.add("modal-open");
  });

  closeButton.addEventListener("click", function() {
    closeModal();
  });

  overlay.addEventListener("click", function() {
    closeModal();
  });

  function closeModal() {
    resumeDialog.close();
    overlay.style.display = "none";
    body.classList.remove("modal-open");
  }

  resumeDialog.addEventListener("click", function(event) {
    if (event.target === resumeDialog) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && resumeDialog.open) {
      closeModal();
    }
  });
});