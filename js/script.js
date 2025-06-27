// === SCRIPT PRINCIPAL DE FUNCIONALIDADES ===

// 1. CAMBIO DE MODO CLARO/OSCURO
const themeToggleBtn = document.getElementById('themeToggle');
const iconMoon = themeToggleBtn?.querySelector('.icon-moon');
const iconSun = themeToggleBtn?.querySelector('.icon-sun');

function updateThemeIcon() {
  const isLight = document.body.classList.contains('light-mode');
  if (iconMoon && iconSun) {
    iconMoon.classList.toggle('visually-hidden', isLight);
    iconSun.classList.toggle('visually-hidden', !isLight);
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.add('theme-transition');
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
  });
}

// === AL CARGAR DOM ===
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  updateThemeIcon();

  AOS.init({ duration: 800, once: true, offset: 50 });

  // Hero Swiper
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      speed: 1000,
      autoplay: { delay: 3000, disableOnInteraction: false }
    });
  }

  // Testimonios Swiper
  if (document.querySelector('.testimonios-slider')) {
    new Swiper('.testimonios-slider', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }

  // Footer año dinámico
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // === FILTRO LATERAL ===
  const filtersSidebar = document.getElementById("filtersSidebar");
  const toggleFiltersBtn = document.getElementById("toggleFilters");
  const closeFiltersBtn = document.getElementById("closeFilters");
  const applyFiltersBtn = document.getElementById("applyFilters");

  if (filtersSidebar && toggleFiltersBtn && closeFiltersBtn) {
    toggleFiltersBtn.addEventListener("click", () => {
      filtersSidebar.classList.toggle("open");
    });
    closeFiltersBtn.addEventListener("click", () => {
      filtersSidebar.classList.remove("open");
    });
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      filterProducts();
      filtersSidebar.classList.remove("open");
    });
  }

  function filterProducts() {
    const categoryFilters = document.querySelectorAll('.filters-sidebar input[name="category"]');
    const brandFilters = document.querySelectorAll('.filters-sidebar input[name="brand"]');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const productCards = document.querySelectorAll('.product-item-card');

    const selectedCategories = Array.from(categoryFilters).filter(c => c.checked).map(c => c.value);
    const selectedBrands = Array.from(brandFilters).filter(b => b.checked).map(b => b.value);
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    productCards.forEach(card => {
      const category = card.dataset.category;
      const brand = card.dataset.brand;
      const price = parseFloat(card.dataset.price);

      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
      const matchPrice = price >= minPrice && price <= maxPrice;

      card.style.display = (matchCategory && matchBrand && matchPrice) ? "" : "none";
    });
  }

  // === Menú hamburguesa ===
  const toggleButton = document.querySelector(".mobile-nav-toggle");
  const navigation = document.querySelector(".main-navigation");
  toggleButton?.addEventListener("click", () => {
    toggleButton.classList.toggle("is-open");
    navigation.classList.toggle("is-open");
  });

  // FILTRO SIMPLE POR DATA-FILTER
  const filtros = document.querySelectorAll('[data-filter]');
  const productos = document.querySelectorAll('.product-card');
  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      const categoria = filtro.dataset.filter;
      productos.forEach(prod => {
        prod.style.display = categoria === 'todos' || prod.dataset.categoria === categoria ? 'block' : 'none';
      });
    });
  });
});

// === BOTÓN SCROLL ARRIBA ===
const scrollTopBtn = document.getElementById('backToTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === MISIÓN Y VISIÓN HOVER ===
document.querySelectorAll('.mission-vision-grid h4').forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.add('clicked');
    setTimeout(() => {
      el.classList.remove('clicked');
    }, 500);
  });
});

// === SOBRE NOSOTROS HOVER ===
document.querySelectorAll('.about-text h3').forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.add('clicked');
    setTimeout(() => {
      el.classList.remove('clicked');
    }, 500);
  });
});
