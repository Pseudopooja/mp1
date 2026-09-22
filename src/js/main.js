// ---------------------------------
// Page setup
// ---------------------------------

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');


// Prevent browser from reopening halfway down the page
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  updateNavbar();
  updatePositionIndicator();
});


// ---------------------------------
// Get only sections linked in navbar
// ---------------------------------

const navSections = [];

navLinks.forEach((link) => {
  const target = document.querySelector(
    link.getAttribute('href')
  );

  if (target) {
    navSections.push(target);
  }
});


// ---------------------------------
// Smooth scrolling
// ---------------------------------

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const target =
      document.querySelector(
        link.getAttribute('href')
      );

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ---------------------------------
// Navbar resizing
// ---------------------------------

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-small');
  } else {
    navbar.classList.remove('navbar-small');
  }
}


// ---------------------------------
// Active navigation indicator
// ---------------------------------

function updatePositionIndicator() {
  /*
    Use a reading line partway down the viewport.

    This works better than checking only the very
    top of the screen, especially because there
    are decorative sections without navbar links.
  */

  const readingLine =
    Math.max(
      navbar.offsetHeight + 20,
      window.innerHeight * 0.35
    );

  let currentSection = navSections[0];

  navSections.forEach((section) => {
    const rect =
      section.getBoundingClientRect();

    if (rect.top <= readingLine) {
      currentSection = section;
    }
  });


  // Requirement:
  // Contact must be active at bottom of page
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5;

  if (atBottom) {
    currentSection =
      document.querySelector('#contact');
  }


  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (
      currentSection &&
      link.getAttribute('href') ===
        `#${currentSection.id}`
    ) {
      link.classList.add('active');
    }
  });
}


// ---------------------------------
// Scroll + resize events
// ---------------------------------

window.addEventListener('scroll', () => {
  updateNavbar();
  updatePositionIndicator();
});

window.addEventListener('resize', () => {
  updatePositionIndicator();
});


updateNavbar();
updatePositionIndicator();


// ---------------------------------
// Carousel
// ---------------------------------

const slides =
  document.querySelectorAll('.project-slide');

const dots =
  document.querySelectorAll('.dot');

const previousButton =
  document.querySelector('.carousel-arrow.previous');

const nextButton =
  document.querySelector('.carousel-arrow.next');

let currentSlide = 0;


function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}


if (
  slides.length > 0 &&
  previousButton &&
  nextButton
) {
  previousButton.addEventListener(
    'click',
    () => {
      currentSlide =
        (currentSlide - 1 + slides.length) %
        slides.length;

      showSlide(currentSlide);
    }
  );


  nextButton.addEventListener(
    'click',
    () => {
      currentSlide =
        (currentSlide + 1) %
        slides.length;

      showSlide(currentSlide);
    }
  );


  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;

      showSlide(currentSlide);
    });
  });


  showSlide(currentSlide);
}


// ---------------------------------
// ---------- Modal ----------

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const closeButton = document.querySelector('.modal-close');
const projectButtons = document.querySelectorAll('.project-button');


function openModal(button) {
  modalTitle.textContent = button.dataset.title;
  modalDescription.textContent = button.dataset.description;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');
}


function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('modal-open');
}


// Open modal
projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button);
  });
});


// Close with X button
closeButton.addEventListener('click', closeModal);


// Close when clicking outside modal card
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});


// Close with Escape key
window.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    modal.classList.contains('open')
  ) {
    closeModal();
  }
});