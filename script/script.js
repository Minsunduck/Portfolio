// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

initAnimations();

// Initialize all animations
function initAnimations() {
  // Header animation
  gsap.from(".header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Section animations
  gsap.utils.toArray("section").forEach((section) => {
    const elements = section.querySelectorAll(".portfolio-item");

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  // Mobile menu
  setupMobileMenu();
}

// Mobile menu
function setupMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  let isMenuOpen = false;

  mobileToggle.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;

    // Animate hamburger icon
    const spans = mobileToggle.querySelectorAll("span");

    if (isMenuOpen) {
      gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.3 });
      gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });

      // Show menu
      navMenu.style.display = "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "100%";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.background = "white";
      navMenu.style.padding = "20px";
      navMenu.style.boxShadow = "0 5px 25px rgba(0,0,0,0.1)";

      gsap.fromTo(navMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.3 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });

      // Hide menu
      gsap.to(navMenu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          navMenu.style.display = "";
          navMenu.style.flexDirection = "";
          navMenu.style.position = "";
          navMenu.style.top = "";
          navMenu.style.left = "";
          navMenu.style.right = "";
          navMenu.style.background = "";
          navMenu.style.padding = "";
          navMenu.style.boxShadow = "";
        },
      });
    }
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        mobileToggle.click();
      }
    });
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".gallery-item, .journey-item, .portfolio-item");
  animatedElements.forEach((el) => observer.observe(el));
});

// Add CSS animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Preload images (disabled - using local images only)
function preloadImages() {
  // This function is disabled as we're using local images only
  console.log("Image preloading skipped - using local images only");
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages);

// Error handling for missing images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", (e) => {
      console.log(`Failed to load image: ${e.target.src}`);
      // You could set a placeholder image here
      // e.target.src = 'path/to/placeholder.jpg';
    });
  });
});

//quick menu
let win = window;
const dot = document.querySelector(".dot");
let body = document.querySelector("body");
const header = document.querySelector(".header");

win.addEventListener("scroll", () => {
  let sct = this.scrollY;
  if (sct > 300) {
    dot.style.opacity = "1";
  } else {
    dot.style.opacity = "0";
  }
});

dot.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Add resize handler for responsive adjustments
window.addEventListener(
  "resize",
  throttle(() => {
    // Recalculate positions and animations on resize
    ScrollTrigger.refresh();
  }, 250)
);

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Early setup for contact button (in case user clicks before animations load)
  const contactBtn = document.querySelector(".contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;

        // Use native scrolling if GSAP hasn't loaded yet
        if (typeof gsap !== "undefined" && gsap.to) {
          gsap.to(window, {
            scrollTo: offsetTop,
            duration: 1,
            ease: "power3.inOut",
          });
        } else {
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // About <-> Skills 토글 기능
  const aboutContent = document.querySelector(".about-content");
  const skillsContent = document.querySelector("#skills");
  const btnAbout = document.querySelector(".about-btn");
  const btnSkills = document.querySelector(".about-btn-skills");

  if (aboutContent && skillsContent && btnAbout && btnSkills) {
    // 초기 상태: Skills 숨김
    skillsContent.style.display = "none";

    // About 버튼 활성 상태 표시
    btnAbout.classList.add("active");

    // Skills 버튼 클릭 시
    btnSkills.addEventListener("click", (e) => {
      e.preventDefault();

      // 버튼 상태 변경
      btnAbout.classList.remove("active");
      btnSkills.classList.add("active");

      resetSkillsBars(); // 초기화
      $(aboutContent).fadeOut(300, () => {
        $(skillsContent).fadeIn(300, () => {
          animateSkillsBars(); // 다시 채우기
          if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
        });
      });
    });

    // About 버튼 클릭 시
    btnAbout.addEventListener("click", (e) => {
      e.preventDefault();

      // 버튼 상태 변경
      btnSkills.classList.remove("active");
      btnAbout.classList.add("active");

      // Skills 내용 숨기고 About 내용 보이기
      $(skillsContent).fadeOut(300, () => {
        resetSkillsBars(); // 다음에 다시 들어왔을 때 0%부터
        $(aboutContent).fadeIn(300);
      });
    });
  }

  setupCustomCursor();

  // Load header logo Lottie (local file: ./assets/mandarine.json)
  try {
    const logoContainer = document.getElementById("logo-lottie");
    if (logoContainer && typeof lottie !== "undefined") {
      if (!logoContainer.dataset.lottieInit) {
        lottie.loadAnimation({
          container: logoContainer,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "./lottie/mandarine.json",
        });
        logoContainer.dataset.lottieInit = "true";
      }
    }
  } catch (err) {
    console.error("Failed to initialize logo Lottie", err);
  }
});

// Custom cursor setup
function setupCustomCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;
  if (matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const setDot = gsap.quickSetter(dot, "css");
  const setRing = gsap.quickSetter(ring, "css");
  let x = window.innerWidth / 2,
    y = window.innerHeight / 2;

  // 처음 한번 표시
  gsap.set([dot, ring], { opacity: 1 });

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    // 점은 빠르게, 링은 살짝 딜레이
    gsap.to(dot, { x, y, duration: 0.06, overwrite: "auto" });
    gsap.to(ring, { x, y, duration: 0.06, overwrite: "auto" });
  });

  // 링크/버튼 위에서 강조
  const hoverTargets = document.querySelectorAll("a, button, .contact-btn");
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });

  // 페이지 벗어나면 숨김
  document.addEventListener("mouseleave", () => gsap.to([dot, ring], { opacity: 0, duration: 0.15 }));
  document.addEventListener("mouseenter", () => gsap.to([dot, ring], { opacity: 1, duration: 0.15 }));
}

// ===== Skills bars (single source of truth) =====
let skillsBarsInitialized = false;

function resetSkillsBars() {
  const section = document.querySelector("#skills");
  if (!section) return;

  section.querySelectorAll(".bar").forEach((bar) => {
    let progEl = bar.querySelector(".progress");
    if (!progEl) {
      progEl = document.createElement("span");
      progEl.className = "progress";
      bar.prepend(progEl);
    }
    // 즉시 초기화
    progEl.style.transition = "none";
    progEl.style.width = "0%";
    void progEl.offsetWidth; // reflow
    progEl.style.transition = "width 1.2s ease";

    const rateEl = bar.querySelector(".rate");
    if (rateEl) rateEl.textContent = "";
  });

  skillsBarsInitialized = false;
}

function animateSkillsBars() {
  const section = document.querySelector("#skills");
  if (!section) return;

  const bars = section.querySelectorAll(".bar");
  bars.forEach((bar, idx) => {
    const rateEl = bar.querySelector(".rate");
    if (!rateEl) return;

    let progEl = bar.querySelector(".progress");
    if (!progEl) {
      progEl = document.createElement("span");
      progEl.className = "progress";
      bar.prepend(progEl);
    }

    const rate = Math.max(0, Math.min(100, Number(rateEl.dataset.rate || 0)));
    rateEl.textContent = rate + "%";

    // 재생
    progEl.style.transition = "none";
    progEl.style.width = "0%";
    void progEl.offsetWidth;
    progEl.style.transition = "width 1.2s ease";
    progEl.style.width = rate + "%";
  });

  skillsBarsInitialized = true;
}

// Skills bars setup
function setupSkillsBars() {
  const section = document.querySelector("#skills");
  if (!section) return;

  // 보이는 순간 1회 실행
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !skillsBarsInitialized) {
            animateSkillsBars();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(section);
  } else {
    animateSkillsBars();
  }

  // Skills 버튼으로 탭 전환 후에도 보장
  const btnSkills = document.querySelector(".about-btn-skills");
  if (btnSkills) {
    btnSkills.addEventListener("click", () => {
      setTimeout(() => {
        if (!skillsBarsInitialized) animateSkillsBars();
      }, 300);
    });
  }
}

document.addEventListener("DOMContentLoaded", setupSkillsBars);

// Simple Custom Cursor
function initSimpleCursor() {
  // 터치 기기 체크
  if (matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  // 기본 커서 숨기기 (원하지 않으면 주석 처리)
  document.body.classList.add("hide-cursor");

  // 마우스 움직임
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  // 페이지 진입/이탈
  document.addEventListener("mouseenter", () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });

  // 호버 효과 (선택사항)
  const hoverElements = document.querySelectorAll("a, button, .contact-btn, .btn");

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // 초기 위치
  gsap.set(cursor, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    opacity: 1,
  });
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", initSimpleCursor);

// Portfolio 슬라이드 애니메이션
function setupPortfolioAnimations() {
  // Project1 오른쪽 슬라이드 인
  const project1Right = document.querySelector("#project1 .right");

  if (project1Right) {
    gsap.fromTo(
      project1Right,
      {
        x: "120%",
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
      },
      {
        x: "10%",
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#project1",
          start: "top 70%",
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );
  }

  // Project2 오른쪽 슬라이드 인
  const project2Right = document.querySelector("#project2 .Project-right");

  if (project2Right) {
    gsap.fromTo(
      project2Right,
      {
        x: "120%",
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
      },
      {
        x: "0%",
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#project2",
          start: "top 70%",
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );
  }

  // Project3 오른쪽 슬라이드 인 (추가)
  const project3Right = document.querySelector("#project3 .right");

  if (project3Right) {
    gsap.fromTo(
      project3Right,
      {
        x: "120%",
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
      },
      {
        x: "10%",
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#project3",
          start: "top 70%",
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );
  }
}

function setupProjectLeftObserver() {
  const targets = ["#project1", "#project3"]; // project3 추가

  targets.forEach((selector) => {
    const target = document.querySelector(selector);
    const left = document.querySelector(`${selector} .Project-left`);
    if (!target || !left) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            left.classList.add("slide-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(target);
  });
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // ...existing code...
  setupPortfolioAnimations();
  // ...existing code...
});

// DOMContentLoaded 또는 초기화 함수에서 호출
document.addEventListener("DOMContentLoaded", () => {
  setupProjectLeftObserver();
});
