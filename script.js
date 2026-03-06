const header = document.querySelector(".main-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

function applyHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", applyHeaderState);
applyHeaderState();

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setActiveMenuItem() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const activeByPage = {
    "": "index.html",
    "index.html": "index.html",
    "services.html": "services.html",
    "gallery.html": "gallery.html",
    "faqs.html": "faqs.html",
    "contact.html": "contact.html",
    "service-newborn.html": "services.html",
    "service-basic.html": "services.html",
    "service-model.html": "services.html",
    "service-maternity.html": "services.html",
    "service-high-end.html": "services.html",
    "service-other.html": "services.html"
  };

  const target = activeByPage[path] || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === target);
  });
}

setActiveMenuItem();

function normalizeText(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ");
}

const searchForm = document.getElementById("site-search-form");
const searchInput = document.getElementById("site-search-input");
const searchMessage = document.getElementById("search-message");

const searchRoutes = [
  { keys: ["home", "trang chu"], page: "index.html" },
  { keys: ["services", "service", "dich vu"], page: "services.html" },
  { keys: ["gallery", "thu vien"], page: "gallery.html" },
  { keys: ["faq", "faqs", "cau hoi"], page: "faqs.html" },
  { keys: ["contact", "contact me", "lien he"], page: "contact.html" },
  { keys: ["newborn"], page: "service-newborn.html" },
  { keys: ["basic"], page: "service-basic.html" },
  { keys: ["model"], page: "service-model.html" },
  { keys: ["maternity"], page: "service-maternity.html" },
  { keys: ["high end", "high-end", "highend"], page: "service-high-end.html" },
  { keys: ["other", "khac"], page: "service-other.html" }
];

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = normalizeText(searchInput.value);
    if (!keyword) return;

    const found = searchRoutes.find((item) =>
      item.keys.some((key) => keyword.includes(normalizeText(key)))
    );

    if (found) {
      window.location.href = found.page;
      return;
    }

    if (searchMessage) {
      searchMessage.classList.add("show");
      setTimeout(() => searchMessage.classList.remove("show"), 1700);
    }
  });
}

const heroSlider = document.querySelector("[data-hero-slider]");
if (heroSlider) {
  const track = heroSlider.querySelector(".hero-track");
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const dots = heroSlider.querySelector(".slider-dots");
  const prev = heroSlider.querySelector(".slider-control.prev");
  const next = heroSlider.querySelector(".slider-control.next");
  let index = 0;

  function renderDots() {
    if (!dots) return;
    dots.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.classList.toggle("is-active", i === index);
      dot.addEventListener("click", () => {
        index = i;
        render();
      });
      dots.appendChild(dot);
    });
  }

  function render() {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    if (dots) {
      dots.querySelectorAll("button").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    }
  }

  prev?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  next?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    render();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    render();
  }, 5600);

  renderDots();
  render();
}

const servicesCarousel = document.querySelector("[data-service-carousel]");
const servicesPrev = document.querySelector("[data-services-prev]");
const servicesNext = document.querySelector("[data-services-next]");

function updateCarouselButtons() {
  if (!servicesCarousel || !servicesPrev || !servicesNext) return;
  const maxScrollLeft = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;
  servicesPrev.disabled = servicesCarousel.scrollLeft < 8;
  servicesNext.disabled = servicesCarousel.scrollLeft >= maxScrollLeft - 8;
}

if (servicesCarousel && servicesPrev && servicesNext) {
  const step = () => {
    const first = servicesCarousel.querySelector(".service-tile");
    if (!first) return 300;
    const style = window.getComputedStyle(servicesCarousel);
    const gap = Number.parseInt(style.columnGap || style.gap || "18", 10);
    return first.getBoundingClientRect().width + gap;
  };

  servicesPrev.addEventListener("click", () => {
    servicesCarousel.scrollBy({ left: -step(), behavior: "smooth" });
  });

  servicesNext.addEventListener("click", () => {
    servicesCarousel.scrollBy({ left: step(), behavior: "smooth" });
  });

  servicesCarousel.addEventListener("scroll", updateCarouselButtons);
  window.addEventListener("resize", updateCarouselButtons);
  updateCarouselButtons();
}

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;
  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    faqItems.forEach((el) => el.classList.remove("is-open"));
    if (!isOpen) item.classList.add("is-open");
  });
});
