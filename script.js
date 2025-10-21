// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Loading Animation
window.addEventListener('load', function () {
    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);

        // Initialize animations after loading
        initAnimations();
    }, 1500);
});

// Add scroll progress bar
document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
});

// Initialize all animations
function initAnimations() {
    // Header animation
    gsap.from('.header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero section animations
    const heroTl = gsap.timeline();

    heroTl.from('.hero-tagline', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    })
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-btn', {
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.social-links .social-link', {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power3.out',
            stagger: 0.1
        }, '-=0.2')
        .from('.hero-image', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power3.out'
        }, '-=1')
        .from('.stats-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
        }, '-=0.5')
        .from('.geometric-shape', {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1
        }, '-=0.4');

    // Animate skill bars when they come into view

    const totalLength = 500;
    const progressBox = $('.chart');
    function ani() {
        progressBox.each(function () {
            console.log(progressBox);
            let tg = $(this);
            let title = tg.find('h3');
            console.log(title);
            let tgNum = title.attr('data-num');
            let line = tg.find('line');
            console.log(tgNum);
            $({ rate: 0 }).animate(
                { rate: tgNum },
                {
                    duration: 2000,
                    progress: function () {
                        let now = this.rate;
                        let amount = totalLength - (totalLength * now) / 100;
                        title.text(Math.floor(now))
                        line.css({ strokeDashoffset: amount })
                    }
                }
            )
        })
    }
    ScrollTrigger.create({
        trigger: '.charts',
        start: 'top 80%', /* .charts 상단에서 뷰포트 80%에서 시작 */
        once: true,
        onEnter: function () {
            ani()
        }
    })

    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        const elements = section.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in, .gallery-item, .journey-item, .portfolio-item, .testimonial-item, .contact-item');

        if (elements.length > 0) {
            gsap.fromTo(elements,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });

    // Parallax effect for hero shapes
    gsap.to('.geometric-shape', {
        y: -100,
        rotation: 360,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Gallery hover effects
    setupGalleryAnimations();

    // Portfolio filtering
    setupPortfolioFilter();

    // Testimonials carousel
    setupTestimonialsCarousel();

    // Form handling
    setupContactForm();

    // Smooth scrolling for navigation
    setupSmoothScrolling();

    // Mobile menu
    setupMobileMenu();
}

// Gallery animations
function setupGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            gsap.to(image, { scale: 1.1, duration: 0.4, ease: 'power2.out' });
            gsap.to(overlay, { y: 0, duration: 0.4, ease: 'power2.out' });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' });
            gsap.to(overlay, { y: '100%', duration: 0.4, ease: 'power2.out' });
        });
    });
}

// Portfolio filtering
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Animate items out
            gsap.to(portfolioItems, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                stagger: 0.02,
                onComplete: () => {
                    // Show/hide items based on filter
                    portfolioItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        if (filter === 'all' || category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // Animate visible items back in
                    const visibleItems = Array.from(portfolioItems).filter(item =>
                        item.style.display !== 'none'
                    );

                    gsap.fromTo(visibleItems,
                        { opacity: 0, scale: 0.8 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: 'back.out(1.7)',
                            stagger: 0.05
                        }
                    );
                }
            });
        });
    });
}

// Testimonials carousel
function setupTestimonialsCarousel() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                );
            } else {
                item.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Contact form handling
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Animate submit button
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        }, 500);
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                const targetSection = document.querySelector(href) || document.querySelector('.hero');
                const offsetTop = targetSection.offsetTop - 80;

                gsap.to(window, {
                    scrollTo: offsetTop,
                    duration: 1.5,
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Contact button in header
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;

                gsap.to(window, {
                    scrollTo: offsetTop,
                    duration: 1.5,
                    ease: 'power3.inOut'
                });
            } else {
                console.error('Contact section not found');
            }
        });
    } else {
        console.error('Contact button not found');
    }
}

// Mobile menu
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    mobileToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');

        if (isMenuOpen) {
            gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });

            // Show menu
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';

            gsap.fromTo(navMenu,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
            );
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });

            // Hide menu
            gsap.to(navMenu, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    navMenu.style.display = '';
                    navMenu.style.flexDirection = '';
                    navMenu.style.position = '';
                    navMenu.style.top = '';
                    navMenu.style.left = '';
                    navMenu.style.right = '';
                    navMenu.style.background = '';
                    navMenu.style.padding = '';
                    navMenu.style.boxShadow = '';
                }
            });
        }
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileToggle.click();
            }
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.gallery-item, .journey-item, .portfolio-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
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

// Throttled scroll handler
const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;

    // Parallax effects
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach(shape => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 16);

window.addEventListener('scroll', handleScroll);

// Preload images
function preloadImages() {
    const images = [
        'https://themes.creativehunk.com/maria/img/about-img.png',
        'https://themes.creativehunk.com/maria/img/shots-img-1.png',
        'https://themes.creativehunk.com/maria/img/shots-img-2.png',
        'https://themes.creativehunk.com/maria/img/shots-img-3.png',
        'https://themes.creativehunk.com/maria/img/shots-img-4.png',
        'https://themes.creativehunk.com/maria/img/shots-img-5.png',
        'https://themes.creativehunk.com/maria/img/shots-img-6.png',
        'https://themes.creativehunk.com/maria/img/shots-img-7.png',
        'https://themes.creativehunk.com/maria/img/shots-img-8.png',
        'https://themes.creativehunk.com/maria/img/journey-img-1.png',
        'https://themes.creativehunk.com/maria/img/journey-img-2.png',
        'https://themes.creativehunk.com/maria/img/journey-img-3.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-1.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-2.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-3.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-4.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-5.png',
        'https://themes.creativehunk.com/maria/img/portfolio-img-6.png',
        'https://themes.creativehunk.com/maria/img/testimonial-img-1.png',
        'https://themes.creativehunk.com/maria/img/testimonial-img-2.png',
        'https://themes.creativehunk.com/maria/img/testimonial-img-3.png',
        'https://themes.creativehunk.com/maria/img/blog-img-1.png',
        'https://themes.creativehunk.com/maria/img/blog-img-2.png',
        'https://themes.creativehunk.com/maria/img/blog-img-3.png',
        'https://themes.creativehunk.com/maria/img/blog-img-4.png',
        'https://themes.creativehunk.com/maria/img/blog-img-5.png',
        'https://themes.creativehunk.com/maria/img/blog-img-6.png',
        'https://themes.creativehunk.com/maria/img/blog-img-7.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', (e) => {
            console.log(`Failed to load image: ${e.target.src}`);
            // You could set a placeholder image here
            // e.target.src = 'path/to/placeholder.jpg';
        });
    });
});

//quick menu
let win = window;
const dot = document.querySelector('.dot');
let body = document.querySelector('body');
const header = document.querySelector('.header');

win.addEventListener('scroll', () => {
  let sct = this.scrollY;
  if (sct > 300) {
        dot.style.opacity = '1'
    } else {
        dot.style.opacity = '0'
    }
})

dot.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Recalculate positions and animations on resize
    ScrollTrigger.refresh();
}, 250));

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('저의 포트폴리오를 열람해주셔서 감사합니다!');
    
    // Early setup for contact button (in case user clicks before animations load)
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                
                // Use native scrolling if GSAP hasn't loaded yet
                if (typeof gsap !== 'undefined' && gsap.to) {
                    gsap.to(window, {
                        scrollTo: offsetTop,
                        duration: 1,
                        ease: 'power3.inOut'
                    });
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // About <-> Skills 토글 기능
    const aboutContent = document.querySelector('.about-content');
    const skillsContent = document.querySelector('#skills');
    const btnAbout = document.querySelector('.about-btn');
    const btnSkills = document.querySelector('.about-btn-skills');

    if (aboutContent && skillsContent && btnAbout && btnSkills) {
        // 초기 상태: Skills 숨김
        skillsContent.style.display = 'none';

        // About 버튼 활성 상태 표시
        btnAbout.classList.add('active');

        // Skills 버튼 클릭 시
        btnSkills.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 버튼 상태 변경
            btnAbout.classList.remove('active');
            btnSkills.classList.add('active');
            
            resetSkillsBars(); // 초기화
            $(aboutContent).fadeOut(300, () => {
                $(skillsContent).fadeIn(300, () => {
                    animateSkillsBars(); // 다시 채우기
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                });
            });
        });

        // About 버튼 클릭 시
        btnAbout.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 버튼 상태 변경
            btnSkills.classList.remove('active');
            btnAbout.classList.add('active');
            
            // Skills 내용 숨기고 About 내용 보이기
            $(skillsContent).fadeOut(300, () => {
                resetSkillsBars(); // 다음에 다시 들어왔을 때 0%부터
                $(aboutContent).fadeIn(300);
            });
        });
    }

    setupCustomCursor();
});

// Custom cursor setup
function setupCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  if (matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const setDot = gsap.quickSetter(dot, 'css');
  const setRing = gsap.quickSetter(ring, 'css');
  let x = window.innerWidth / 2, y = window.innerHeight / 2;

  // 처음 한번 표시
  gsap.set([dot, ring], { opacity: 1 });

  window.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    // 점은 빠르게, 링은 살짝 딜레이
    gsap.to(dot, { x, y, duration: 0.06, overwrite: 'auto' });
    gsap.to(ring, { x, y, duration: 0.06, overwrite: 'auto' });
  });

  // 링크/버튼 위에서 강조
  const hoverTargets = document.querySelectorAll('a, button, .contact-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });

  // 페이지 벗어나면 숨김
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.15 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.15 }));
}

// ===== Skills bars (single source of truth) =====
let skillsBarsInitialized = false;

function resetSkillsBars() {
  const section = document.querySelector('#skills');
  if (!section) return;

  section.querySelectorAll('.bar').forEach(bar => {
    let progEl = bar.querySelector('.progress');
    if (!progEl) {
      progEl = document.createElement('span');
      progEl.className = 'progress';
      bar.prepend(progEl);
    }
    // 즉시 초기화
    progEl.style.transition = 'none';
    progEl.style.width = '0%';
    void progEl.offsetWidth;           // reflow
    progEl.style.transition = 'width 1.2s ease';

    const rateEl = bar.querySelector('.rate');
    if (rateEl) rateEl.textContent = '';
  });

  skillsBarsInitialized = false;
}

function animateSkillsBars() {
  const section = document.querySelector('#skills');
  if (!section) return;

  const bars = section.querySelectorAll('.bar');
  bars.forEach((bar, idx) => {
    const rateEl = bar.querySelector('.rate');
    if (!rateEl) return;

    let progEl = bar.querySelector('.progress');
    if (!progEl) {
      progEl = document.createElement('span');
      progEl.className = 'progress';
      bar.prepend(progEl);
    }

    const rate = Math.max(0, Math.min(100, Number(rateEl.dataset.rate || 0)));
    rateEl.textContent = rate + '%';

    // 재생
    progEl.style.transition = 'none';
    progEl.style.width = '0%';
    void progEl.offsetWidth;
    progEl.style.transition = 'width 1.2s ease';
    progEl.style.width = rate + '%';
  });

  skillsBarsInitialized = true;
}

// Skills bars setup
function setupSkillsBars() {
  const section = document.querySelector('#skills');
  if (!section) return;

  // 보이는 순간 1회 실행
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting && !skillsBarsInitialized) {
          animateSkillsBars();
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(section);
  } else {
    animateSkillsBars();
  }

  // Skills 버튼으로 탭 전환 후에도 보장
  const btnSkills = document.querySelector('.about-btn-skills');
  if (btnSkills) {
    btnSkills.addEventListener('click', () => {
      setTimeout(() => {
        if (!skillsBarsInitialized) animateSkillsBars();
      }, 300);
    });
  }
}

document.addEventListener('DOMContentLoaded', setupSkillsBars);
