// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const captions = ['Crafting Your Vibe...', 'Unleashing Creativity...', 'Your Style Awaits...'];
  const captionEl = document.querySelector('.preloader-caption');
  let index = 0;

  const changeCaption = () => {
    captionEl.style.opacity = 0;
    setTimeout(() => {
      captionEl.textContent = captions[index];
      captionEl.style.opacity = 1;
      index = (index + 1) % captions.length;
    }, 400);
  };

  changeCaption();
  const captionInterval = setInterval(changeCaption, 2500);

  setTimeout(() => {
    clearInterval(captionInterval);
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600); // Remove preloader after fade
  }, 3000);
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
const appearOptions = { threshold: 0.15 };
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
  orderFab.classList.toggle('visible', window.scrollY > 300);
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
const productSwiper = new Swiper('.product-swiper', {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 25 },
    1280: { slidesPerView: 4, spaceBetween: 30 },
  },
});

const reviewsSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 25 },
  },
});