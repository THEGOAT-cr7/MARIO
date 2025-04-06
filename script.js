// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Typed.js
  const typed = new Typed(".typed-text", {
    strings: ["Aziz mehmon!", "Xush kelibsiz!"],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true,
    backDelay: 1000,
    startDelay: 800,
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector("nav");

  mobileMenuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !nav.contains(event.target) &&
      !mobileMenuBtn.contains(event.target) &&
      nav.classList.contains("active")
    ) {
      nav.classList.remove("active");
    }
  });

  // Yangiliklar bo'limini yopish
  const closeNewsBtn = document.getElementById("closeNewsBtn");
  const newsAlert = document.getElementById("newsAlert");

  if (closeNewsBtn && newsAlert) {
    closeNewsBtn.addEventListener("click", function () {
      newsAlert.style.display = "none";
    });
  }

  // Yon reklamani yopish
  const closeSideAdBtn = document.getElementById("closeSideAdBtn");
  const sideAd = document.getElementById("sideAd");

  if (closeSideAdBtn && sideAd) {
    closeSideAdBtn.addEventListener("click", function () {
      sideAd.style.display = "none";
    });
  }

  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show the selected slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Stop slideshow on user interaction
  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlideshow();
      showSlide(index);
      startSlideshow();
    });
  });

  // Initialize slideshow
  if (slides.length > 0) {
    startSlideshow();
  }

  // Menu Filter
  const menuCategories = document.querySelectorAll(".menu-category");
  const menuItems = document.querySelectorAll(".menu-item");

  menuCategories.forEach((category) => {
    category.addEventListener("click", () => {
      // Remove active class from all categories
      menuCategories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to clicked category
      category.classList.add("active");

      const selectedCategory = category.getAttribute("data-category");

      // Show/hide menu items based on category
      menuItems.forEach((item) => {
        if (
          selectedCategory === "all" ||
          item.getAttribute("data-category") === selectedCategory
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    testimonialDots.forEach((dot) => dot.classList.remove("active"));

    // Show the selected testimonial
    testimonials[index].classList.add("active");
    testimonialDots[index].classList.add("active");

    currentTestimonial = index;
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Start automatic testimonial rotation
  function startTestimonialRotation() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
  }

  // Stop rotation on user interaction
  function stopTestimonialRotation() {
    clearInterval(testimonialInterval);
  }

  // Add click event to testimonial dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopTestimonialRotation();
      showTestimonial(index);
      startTestimonialRotation();
    });
  });

  // Initialize testimonial rotation
  if (testimonials.length > 0) {
    startTestimonialRotation();
  }

  // Oshpazlar slideri - FIXED VERSION
  const chefsSlider = document.querySelector(".chefs-slider");
  const chefCards = document.querySelectorAll(".chef-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const chefSliderDotsContainer = document.querySelector(".chef-slider-dots");

  if (chefsSlider && chefCards.length > 0) {
    let slidesPerView = 3;
    let currentIndex = 0;
    let totalSlides = chefCards.length;

    // Responsive uchun slidesPerView ni o'zgartirish
    function updateSlidesPerView() {
      if (window.innerWidth < 768) {
        slidesPerView = 1;
      } else if (window.innerWidth < 992) {
        slidesPerView = 2;
      } else {
        slidesPerView = 3;
      }

      // Slider dots yaratish
      createSliderDots();

      // Slider ni yangilash
      updateSlider();
    }

    // Slider dots yaratish
    function createSliderDots() {
      chefSliderDotsContainer.innerHTML = "";
      const totalDots = Math.ceil(totalSlides / slidesPerView);

      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("chef-slider-dot");
        if (i === Math.floor(currentIndex / slidesPerView))
          dot.classList.add("active");

        dot.addEventListener("click", () => {
          currentIndex = i * slidesPerView;
          updateSlider();
        });

        chefSliderDotsContainer.appendChild(dot);
      }
    }

    // Slider ni yangilash
    function updateSlider() {
      // Maksimal indeksni hisoblash
      const maxIndex = Math.max(0, totalSlides - slidesPerView);

      // Indeksni chegaralash
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      // Slider ni siljitish - FIX: Ensure cards are properly sized and positioned
      const cardWidth = 100 / slidesPerView;
      const translateValue = -currentIndex * cardWidth;
      chefsSlider.style.transform = `translateX(${translateValue}%)`;

      // Dots ni yangilash
      const dots = document.querySelectorAll(".chef-slider-dot");
      const activeDotIndex = Math.floor(currentIndex / slidesPerView);

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeDotIndex);
      });

      // Prev/Next buttonlarni yangilash
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;

      // Disabled buttonlar uchun stil
      if (currentIndex === 0) {
        prevBtn.style.opacity = "0.5";
        prevBtn.style.cursor = "not-allowed";
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
      }

      if (currentIndex >= maxIndex) {
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "not-allowed";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      }
    }

    // Card width ni o'rnatish - FIXED: Ensure proper card sizing
    function setCardWidths() {
      const cardWidth = 100 / slidesPerView;
      chefCards.forEach((card) => {
        card.style.flex = `0 0 ${cardWidth}%`;
        // Ensure proper spacing
        card.style.maxWidth = `${cardWidth}%`;
        card.style.boxSizing = "border-box";
      });
    }

    // Prev/Next buttonlar
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      const maxIndex = totalSlides - slidesPerView;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });

    // Responsive uchun event listener
    window.addEventListener("resize", () => {
      const oldSlidesPerView = slidesPerView;
      updateSlidesPerView();
      setCardWidths();

      // Agar slidesPerView o'zgargan bo'lsa, indeksni qayta hisoblash
      if (oldSlidesPerView !== slidesPerView) {
        currentIndex = Math.min(currentIndex, totalSlides - slidesPerView);
        if (currentIndex < 0) currentIndex = 0;
        updateSlider();
      }
    });

    // Slider ni ishga tushirish
    updateSlidesPerView();
    setCardWidths();
    updateSlider();
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("header nav a, .footer-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
        }

        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert(
        `Rahmat, ${name}! Sizning xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz.`
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
      header.style.padding = "0.5rem 0";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.padding = "1rem 0";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });
});
