document.addEventListener("DOMContentLoaded", function () {
  // ----- Animate Skill Bars -----
  const progressBars = document.querySelectorAll(".progress-fill");
  function animateSkillBars() {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        bar.style.width = bar.getAttribute("data-width");
      } else {
        bar.style.width = "0"; // Reset when out of view
      }
    });
  }
  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars(); // Run on load

  // ----- Tabs Active State -----
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // ----- Testimonial Slider -----
  const slider = document.querySelector(".slider");
  const dotsContainer = document.querySelector(".dots");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const sliderContainer = document.querySelector(".slider-container");

  let currentSlide = 0;
  let slideWidth = testimonialCards[0].offsetWidth + 49; // Card width + margin
  let totalSlides = testimonialCards.length;
  let visibleSlides = Math.floor(sliderContainer.offsetWidth / slideWidth);
  let totalGroups = Math.ceil(totalSlides / visibleSlides);

  // Generate dots dynamically
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalGroups; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentSlide = i * visibleSlides;
        updateSlider();
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    let activeDotIndex = Math.floor(currentSlide / visibleSlides);
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDotIndex);
    });
  }

  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + visibleSlides) % totalSlides;
    if (currentSlide >= totalSlides - visibleSlides + 1) currentSlide = 0;
    updateSlider();
  }, 3000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + visibleSlides) % totalSlides;
      if (currentSlide >= totalSlides - visibleSlides + 1) currentSlide = 0;
      updateSlider();
    }, 3000);
  }

  window.addEventListener("resize", () => {
    slideWidth = testimonialCards[0].offsetWidth + 32;
    visibleSlides = Math.floor(sliderContainer.offsetWidth / slideWidth);
    totalGroups = Math.ceil(totalSlides / visibleSlides);
    createDots();
    updateSlider();
  });

  createDots();

  // ----- Contact Form Submission -----
  window.submitForm = function () {
    const formInputs = document.querySelectorAll(".form-input");
    const formData = {};
    formInputs.forEach((input) => {
      formData[input.placeholder] = input.value;
    });
    console.log("Form submitted:", formData);
    document.querySelector(".contact-form").reset();
    alert("Message sent successfully!");
  };

  // ----- Text Role Cycling (Upward Movement) -----
  const titles = [
    "GRAPHIC,",
    "FREELANCER,",
    "WEB & UI,",
    "DIGITAL,",
    "ARTIST,",
    "CONTENT CREATOR,",
    "BRAND,"
  ];
  let index = 0;
  const textElement = document.getElementById("changingText");

  function changeText() {
    // Remove the animation class to reset
    textElement.classList.remove("move-up");
    // Force reflow to restart the animation
    void textElement.offsetWidth;
    // Update the text
    textElement.textContent = titles[index];
    // Re-add the class to trigger the upward animation
    textElement.classList.add("move-up");
    // Move to the next title, looping back to 0
    index = (index + 1) % titles.length;
  }
  // Change text every 1 seconds
  setInterval(changeText, 1000);
});

// Modified script.js - Add touch support
document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...

  // Add touch event handling for slider
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });

  function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
          // Swipe left
          currentSlide = Math.min(currentSlide + visibleSlides, totalSlides - 1);
      }
      if (touchEndX - touchStartX > 50) {
          // Swipe right
          currentSlide = Math.max(currentSlide - visibleSlides, 0);
      }
      updateSlider();
      resetAutoSlide();
  }
});