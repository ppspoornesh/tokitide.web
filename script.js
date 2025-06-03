// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const captions = ['Crafting Your Vibe...', 'Unleashing Creativity...', 'Your Style Awaits...'];
  const captionEl = document.querySelector('.preloader-caption');
  let index = 0;

  const changeCaption = () => {
    if (captionEl) {
      captionEl.style.opacity = 0;
      setTimeout(() => {
        captionEl.textContent = captions[index];
        captionEl.style.opacity = 1;
        index = (index + 1) % captions.length;
      }, 400);
    }
  };

  if (preloader && captionEl) {
    changeCaption();
    const captionInterval = setInterval(changeCaption, 2500);

    // Simplified preloader with timeout
    setTimeout(() => {
      clearInterval(captionInterval);
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }, 5000);
  } else {
    console.error('Preloader elements not found. Skipping preloader.');
  }
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
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
} else {
  console.error('Hamburger menu elements not found.');
}

// Fade-In and Pop-In Scroll
const faders = document.querySelectorAll('.fade-in');
const popIns = document.querySelectorAll('.pop-in');
const appearOptions = { threshold: 0.15 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));
popIns.forEach(el => appearOnScroll.observe(el));

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
  }
});

// Order-Fab and Back-to-Top Button Visibility
const orderFab = document.getElementById('order-fab');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const isVisible = window.scrollY > 300;
  if (orderFab) orderFab.classList.toggle('visible', isVisible);
  if (backToTop) backToTop.classList.toggle('visible', isVisible);
});

// Order Modal Handler
const orderModal = document.getElementById('order-modal');
const modalClose = document.getElementById('modal-close');

if (orderFab && orderModal) {
  orderFab.addEventListener('click', (e) => {
    e.preventDefault();
    orderModal.classList.add('active');
  });
}

if (modalClose && orderModal) {
  modalClose.addEventListener('click', () => {
    orderModal.classList.remove('active');
  });

  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
      orderModal.classList.remove('active');
    }
  });
}

// Like Button
document.querySelectorAll('.like-btn').forEach(btn => {
  const id = btn.getAttribute('aria-label');
  btn.classList.toggle('liked', localStorage.getItem(id) === 'liked');
  btn.addEventListener('click', () => {
    const isLiked = btn.classList.toggle('liked');
    localStorage.setItem(id, isLiked ? 'liked' : '');
  });
});

// Swiper Initialization for T-Shirt and Phone Case Collections
if (typeof Swiper !== 'undefined') {
  try {
    const productSwipers = document.querySelectorAll('.product-swiper');
    productSwipers.forEach(swiper => {
      new Swiper(swiper, {
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        },
      });
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
  } catch (error) {
    console.error('Error initializing Swiper:', error);
  }
} else {
  console.error('Swiper library failed to load. Sliders will not function.');
}

// AI Price Predictor
const imageUpload = document.getElementById('image-upload');
const productType = document.getElementById('product-type');
const styleType = document.getElementById('style-type');
const calculateBtn = document.getElementById('calculate-price');
const priceModal = document.getElementById('price-modal');
const priceModalClose = document.getElementById('price-modal-close');
const priceDetails = document.getElementById('price-details');

const styles = {
  tshirt: [
    'Pixar',
    'Ghibli',
    'Watercolor Portrait',
    'Anime',
    'Pencil Sketch',
    'Spider-Verse',
    'Glitch-core',
    'Cartoon',
    'Cyberpunk',
    'Graffiti',
    'Retro-comic',
    'Comic-strip',
    'Manga'
  ],
  phonecase: [
    'Minimalistic Black Line',
    'Kalamkari-Madhubani Art',
    'Mithila-Madhubani Art',
    'Minimalistic B-W Pencil Sketch',
    'Ghibli',
    'Cartoon',
    'Pixar Couple Edition',
    'Rajput Miniature Painting',
    'Oil Painting',
    'Soft Ghibli',
    'Anime-Glitch Hybrid',
    'Cyberpunk',
    'Pencil Sketch',
    'Graffiti Cartoon',
    'Colored Graffiti'
  ]
};

// Base price ranges without complexity adjustment
const basePriceRanges = {
  tshirt: {
    'Pencil Sketch': { min: 300, max: 320 },
    'Minimalistic Black Line': { min: 300, max: 320 },
    'Minimalistic B-W Pencil Sketch': { min: 300, max: 320 },
    'Cartoon': { min: 320, max: 340 },
    'Cartoon Couple Edition': { min: 340, max: 360 },
    'Watercolor Portrait': { min: 340, max: 360 },
    'Graffiti Cartoon': { min: 340, max: 360 },
    'Colored Graffiti': { min: 340, max: 360 },
    'Anime': { min: 340, max: 360 },
    'Manga': { min: 340, max: 360 },
    'Ghibli': { min: 360, max: 380 },
    'Soft Ghibli': { min: 360, max: 380 },
    'Pixar': { min: 360, max: 380 },
    'Retro-comic': { min: 360, max: 380 },
    'Comic-strip': { min: 360, max: 380 },
    'Kalamkari-Madhubani Art': { min: 380, max: 400 },
    'Mithila-Madhubani Art': { min: 380, max: 400 },
    'Rajput Miniature Painting': { min: 380, max: 400 },
    'Oil Painting': { min: 380, max: 400 },
    'Spider-Verse': { min: 380, max: 400 },
    'Glitch-core': { min: 380, max: 400 },
    'Anime-Glitch Hybrid': { min: 380, max: 400 },
    'Cyberpunk': { min: 380, max: 400 },
    'Graffiti': { min: 380, max: 400 }
  },
  phonecase: {
    'Pencil Sketch': { min: 150, max: 160 },
    'Minimalistic Black Line': { min: 150, max: 160 },
    'Minimalistic B-W Pencil Sketch': { min: 150, max: 160 },
    'Cartoon': { min: 160, max: 170 },
    'Cartoon Couple Edition': { min: 160, max: 170 },
    'Graffiti Cartoon': { min: 160, max: 170 },
    'Colored Graffiti': { min: 160, max: 170 },
    'Anime': { min: 170, max: 180 },
    'Manga': { min: 170, max: 180 },
    'Ghibli': { min: 170, max: 180 },
    'Soft Ghibli': { min: 170, max: 180 },
    'Pixar': { min: 170, max: 180 },
    'Retro-comic': { min: 180, max: 190 },
    'Comic-strip': { min: 180, max: 190 },
    'Kalamkari-Madhubani Art': { min: 180, max: 190 },
    'Mithila-Madhubani Art': { min: 180, max: 190 },
    'Rajput Miniature Painting': { min: 180, max: 190 },
    'Oil Painting': { min: 180, max: 190 },
    'Spider-Verse': { min: 190, max: 200 },
    'Glitch-core': { min: 190, max: 200 },
    'Anime-Glitch Hybrid': { min: 190, max: 200 },
    'Cyberpunk': { min: 190, max: 200 },
    'Graffiti': { min: 190, max: 200 }
  }
};

// Populate styles based on product selection
if (productType && styleType) {
  productType.addEventListener('change', () => {
    const product = productType.value;
    styleType.innerHTML = '<option value="" disabled selected>Choose Style</option>';
    if (styles[product]) {
      styles[product].forEach(style => {
        const option = document.createElement('option');
        option.value = style;
        option.textContent = style;
        styleType.appendChild(option);
      });
      styleType.disabled = false;
    } else {
      console.error(`No styles found for product: ${product}`);
      styleType.disabled = true;
    }
  });
}

// Basic image complexity analysis (simulated for demo purposes)
function analyzeImageComplexity(file) {
  try {
    const fileSizeKB = file.size / 1024; // Convert bytes to KB
    if (fileSizeKB < 500) return 'Simple'; // Small files are likely simpler
    if (fileSizeKB < 2000) return 'Medium';
    return 'Detailed'; // Larger files are likely more detailed
  } catch (error) {
    console.error('Error analyzing image complexity:', error);
    return 'Simple'; // Fallback to simple complexity
  }
}

// Calculate price with complexity adjustment
function calculatePrice(product, style, complexity) {
  try {
    const basePrice = basePriceRanges[product][style];
    if (!basePrice) {
      console.error(`No base price found for product: ${product}, style: ${style}`);
      return null;
    }

    // Adjust price based on complexity
    let adjustment = 0;
    if (complexity === 'Medium') adjustment = 10; // +₹10 for medium complexity
    if (complexity === 'Detailed') adjustment = 20; // +₹20 for detailed complexity

    const adjustedPrice = {
      min: basePrice.min + adjustment,
      max: basePrice.max + adjustment
    };

    // Ensure prices stay within specified ranges
    if (product === 'tshirt') {
      adjustedPrice.min = Math.min(Math.max(adjustedPrice.min, 300), 400);
      adjustedPrice.max = Math.min(Math.max(adjustedPrice.max, 300), 400);
    } else if (product === 'phonecase') {
      adjustedPrice.min = Math.min(Math.max(adjustedPrice.min, 150), 200);
      adjustedPrice.max = Math.min(Math.max(adjustedPrice.max, 150), 200);
    }

    return adjustedPrice;
  } catch (error) {
    console.error('Error calculating price:', error);
    return null;
  }
}

// Calculate price on button click
if (calculateBtn && imageUpload && productType && styleType && priceModal && priceDetails) {
  calculateBtn.addEventListener('click', () => {
    const file = imageUpload.files[0];
    const product = productType.value;
    const style = styleType.value;

    // Validation
    if (!file || !product || !style) {
      alert('Please upload an image and select both a product and a style.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSizeMB = 5;
    if (file.size / (1024 * 1024) > maxSizeMB) {
      alert(`File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`);
      return;
    }

    // Analyze image complexity
    const complexity = analyzeImageComplexity(file);

    // Calculate price
    const price = calculatePrice(product, style, complexity);
    if (!price) {
      priceDetails.textContent = 'Error: Price not available for this selection.';
      priceModal.classList.add('active');
      return;
    }

    // Generate price breakdown
    const breakdown = `
Product: ${product === 'tshirt' ? 'T-Shirt' : 'Phone Case'}
Style: ${style}
Image Complexity: ${complexity}
Estimated Price Range: ₹${price.min} - ₹${price.max}
Print Method: ${style.includes('Back Printed') ? 'Back Print' : 'Front Print'}
Optional Add-Ons: None
Note: Final price may vary at checkout.
    `;

    priceDetails.textContent = breakdown;
    priceModal.classList.add('active');
  });
} else {
  console.error('Price predictor elements not found. Check DOM IDs: image-upload, product-type, style-type, calculate-price, price-modal, price-details');
}

// Close price modal
if (priceModalClose && priceModal) {
  priceModalClose.addEventListener('click', () => {
    priceModal.classList.remove('active');
  });

  priceModal.addEventListener('click', (e) => {
    if (e.target === priceModal) {
      priceModal.classList.remove('active');
    }
  });
}
