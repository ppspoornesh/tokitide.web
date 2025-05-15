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
    }, 500);
  };

  changeCaption();
  const captionInterval = setInterval(changeCaption, 3000);

  setTimeout(() => {
    clearInterval(captionInterval);
    preloader.classList.add('hidden');
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
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
