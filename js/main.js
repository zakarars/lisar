// Select elements
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Clone first and last images
const firstClone = carouselImages[0].cloneNode(true);
const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

carouselSlide.appendChild(firstClone);
carouselSlide.insertBefore(lastClone, carouselImages[0]);

let allImages = document.querySelectorAll('.carousel-slide img');

// Carousel counters
let counter = 1;
let size;

// Function to set the initial size and position
function initializeCarousel() {
  size = allImages[0].clientWidth; // Get the width of one image
  carouselSlide.style.transition = 'none'; // Disable transition during setup
  carouselSlide.style.transform = `translateX(${-size * counter}px)`; // Set initial position
}

// Function to ensure images are fully loaded
function waitForImagesToLoad() {
  const promises = Array.from(allImages).map(
    img =>
      new Promise(resolve => {
        if (img.complete) {
          resolve(); // Image is already loaded
        } else {
          img.addEventListener('load', resolve); // Wait for load event
        }
      })
  );

  return Promise.all(promises);
}

// Initialize carousel after images are loaded
waitForImagesToLoad()
  .then(() => {
    initializeCarousel();
  })
  .catch(err => console.error('Error loading images:', err));

// Debounce function to limit resize event firing
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Update size on window resize
window.addEventListener(
  'resize',
  debounce(() => {
    size = allImages[0].clientWidth; // Recalculate image size
    carouselSlide.style.transition = 'none'; // Disable transition during resize
    carouselSlide.style.transform = `translateX(${-size * counter}px)`; // Adjust position
  }, 100)
);

// Transition end event
carouselSlide.addEventListener('transitionend', () => {
  const currentImage = allImages[counter];
  if (currentImage.id === 'first-clone') {
    carouselSlide.style.transition = 'none';
    counter = 1;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  } else if (currentImage.id === 'last-clone') {
    carouselSlide.style.transition = 'none';
    counter = allImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});

// Next button event
nextBtn.addEventListener('click', () => {
  if (counter >= allImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

// Prev button event
prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

// Mobile Navigation Menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// Function to toggle the menu
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show'); // Add/remove the 'show' class
  navToggle.classList.toggle('active'); // Optionally, animate the toggle button
});

// Optional: Close the menu when a link is clicked (for better UX)
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show'); // Hide the menu
    navToggle.classList.remove('active'); // Reset the toggle button
  });
});

const testimonialSlideContainer = document.querySelector('.testimonial-slide-container');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrevBtn = document.getElementById('testimonialPrev');
const testimonialNextBtn = document.getElementById('testimonialNext');

let currentSlide = 0;

// Function to update the slide position
function updateSlidePosition() {
  testimonialSlideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Next button functionality
testimonialNextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length; // Loop back to the first slide
  updateSlidePosition();
});

// Previous button functionality
testimonialPrevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length; // Loop back to the last slide
  updateSlidePosition();
});

// Ensure the container width is set correctly
window.addEventListener('resize', () => {
  testimonialSlideContainer.style.width = `${testimonialSlides.length * 100}%`;
  testimonialSlides.forEach(slide => {
    slide.style.width = `${100 / testimonialSlides.length}%`;
  });
});

// Initial setup
testimonialSlideContainer.style.width = `${testimonialSlides.length * 100}%`;
testimonialSlides.forEach(slide => {
  slide.style.width = `${100 / testimonialSlides.length}%`;
});


const header = document.querySelector('header');

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Adjust the scroll distance as needed
    header.classList.add('scrolled'); // Add a class when scrolling down
  } else {
    header.classList.remove('scrolled'); // Remove the class when back to the top
  }
});
