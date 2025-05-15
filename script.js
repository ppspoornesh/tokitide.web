// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1000);
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Fade-In Scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(el => appearOnScroll.observe(el));

// Order-Fab Button Visibility
const orderFab = document.querySelector('.order-fab');
window.addEventListener('scroll', () => {
  orderFab.classList.toggle('visible', window.scrollY > 400);
});

// Like Button
document.querySelectorAll('.like-btn').forEach(btn => {
  const id = btn.getAttribute('aria-label');
  btn.classList.toggle('liked', localStorage.getItem(id) === 'liked');
  btn.addEventListener('click', () => {
    const isLiked = btn.classList.toggle('liked');
    localStorage.setItem(id, isLiked ? 'liked' : '');
  });
});

// Swiper Initialization
const productSwiper = new Swiper('.swiper-container:not(.reviews-swiper)', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

const reviewsSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});