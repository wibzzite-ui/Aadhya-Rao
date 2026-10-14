/**
 * ============================================================
 * AADHYA RAO BEAUTY — MAIN APPLICATION
 * ============================================================
 * Premium makeup artist portfolio website
 * ============================================================
 */

import { SITE_CONFIG, PORTFOLIO_PROJECTS, SERVICES } from './config.js';

// ─── INITIALIZATION ───
document.addEventListener('DOMContentLoaded', () => {
  initHeroPortrait();
  initNavigation();
  initMobileMenu();
  initPortfolio();
  initServices();
  initInstagram();
  initWhatsApp();
  initContactForm();
  initChatbot();
  initBackToTop();
  initScrollAnimations();
  initSmoothScroll();
  setMinDate();
});

// ─── HERO PORTRAIT CONFIGURATION & VERIFICATION ───
function initHeroPortrait() {
  const heroImg = document.getElementById('hero-portrait-img');
  const missingNotice = document.getElementById('portrait-missing-notice');
  if (!heroImg) return;

  const portraitConfig = SITE_CONFIG.heroPortrait;
  if (portraitConfig && portraitConfig.src) {
    heroImg.alt = portraitConfig.alt || 'Aadhya Rao, makeup artist in Bengaluru';

    heroImg.addEventListener('error', () => {
      console.warn(`Artist portrait missing at ${portraitConfig.src}. Expected filename: ${portraitConfig.expectedPath || 'public/images/aadhya-portrait.jpg'}`);
      if (missingNotice) {
        missingNotice.classList.add('active');
        missingNotice.removeAttribute('hidden');
      }
    });

    heroImg.addEventListener('load', () => {
      if (missingNotice) {
        missingNotice.classList.remove('active');
        missingNotice.setAttribute('hidden', '');
      }
    });

    if (heroImg.complete && heroImg.naturalWidth > 0) {
      if (missingNotice) {
        missingNotice.classList.remove('active');
        missingNotice.setAttribute('hidden', '');
      }
    }
  }
}

// ─── NAVIGATION (5 CORE PAGES) ───
function initNavigation() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['home', 'portfolio', 'services', 'about', 'contact'];

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active state tracking
    let currentSectionId = 'home';
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.offsetTop - 120;
        if (currentScroll >= top) {
          currentSectionId = id;
        }
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

// ─── MOBILE MENU ───
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const close = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');
  const links = overlay.querySelectorAll('a');

  function openMenu() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    close.focus();
  }

  function closeMenu() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.focus();
  }

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });
}

// ─── PORTFOLIO (6 CURATED CONCEPTS) ───
function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  function renderProjects(filter = 'all') {
    const projects = filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    grid.innerHTML = projects.map((project, index) => `
      <article class="portfolio-card" 
               data-project-id="${project.id}" 
               tabindex="0" 
               role="button" 
               aria-label="View ${project.title} — ${project.category}"
               style="animation-delay: ${index * 0.08}s">
        <div class="portfolio-card-image">
          <img src="${project.image}" 
               alt="${project.alt}" 
               loading="${index < 3 ? 'eager' : 'lazy'}" 
               width="400" 
               height="533"
               onerror="this.parentElement.innerHTML='<div class=\\'portfolio-card-image-fallback\\'>${project.title}</div>'" />
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-overlay-text">
              <span class="card-view">
                Explore Look
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </div>
        <div class="portfolio-card-info">
          <div class="portfolio-card-category">${project.category}</div>
          <h3 class="portfolio-card-title">${project.title}</h3>
          <p class="portfolio-card-desc">${project.shortDescription}</p>
        </div>
      </article>
    `).join('');

    // Add click & keyboard handlers
    grid.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('click', () => openProjectModal(card.dataset.projectId));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(card.dataset.projectId);
        }
      });
    });
  }

  // Filter tab interactions
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderProjects(btn.dataset.filter);
    });
  });

  renderProjects();
  initPortfolioModal();
}

// ─── PORTFOLIO MODAL ───
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !closeBtn) return;
  let previousFocus = null;

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    if (previousFocus) previousFocus.focus();
  }

  window.openProjectModal = function(projectId) {
    const project = PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    previousFocus = document.activeElement;
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <div class="modal-image">
        <img src="${project.image}" alt="${project.alt}" />
      </div>
      <div class="modal-body">
        <div class="modal-category">${project.category} · Curated Concept</div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-description">${project.fullDescription}</p>
        <div class="modal-approach">
          <h4>Artistry & Skin Focus</h4>
          <p>${project.approach}</p>
        </div>
        <div class="modal-details">
          ${project.details.map(d => `<span class="modal-detail-tag">${d}</span>`).join('')}
        </div>
        <div class="modal-concept-note">
          Curated concept portfolio piece created for demonstration. Not a commercial client endorsement.
        </div>
        <div class="modal-actions">
          <a href="#contact" class="btn btn-primary" id="modal-enquire-btn">Enquire for Similar Look</a>
        </div>
      </div>
    `;

    const enquireBtn = content.querySelector('#modal-enquire-btn');
    if (enquireBtn) {
      enquireBtn.addEventListener('click', () => {
        closeModal();
      });
    }

    modal.removeAttribute('hidden');
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    closeBtn.focus();
  };
}

// ─── SERVICES (WITHOUT INVENTED PRICES) ───
function initServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = SERVICES.map(service => `
    <article class="service-card">
      <div class="service-card-image">
        <img src="${service.image}" 
             alt="${service.alt}" 
             loading="lazy" 
             width="400" 
             height="240" />
      </div>
      <div class="service-card-body">
        <div class="service-card-tag">${service.tagline}</div>
        <h3 class="service-card-title">${service.title}</h3>
        <p class="service-card-desc">${service.description}</p>
        <a href="#contact" class="service-card-cta">
          Enquire for Occasion
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `).join('');
}

// ─── INSTAGRAM VISUAL JOURNAL PREVIEW ───
function initInstagram() {
  const grid = document.getElementById('instagram-grid');
  const link = document.getElementById('instagram-link');
  if (!grid) return;

  const previewTiles = [
    { src: '/images/hero-bridal.jpg', alt: 'Bridal portraiture preview' },
    { src: '/images/rose-gold-engagement.jpg', alt: 'Rose at first light engagement preview' },
    { src: '/images/golden-hour.jpg', alt: 'Warm golden hour reception preview' },
    { src: '/images/smoky-eye.jpg', alt: 'Editorial after-dark study preview' },
  ];

  grid.innerHTML = previewTiles.map(tile => `
    <div class="instagram-mini-tile">
      <img src="${tile.src}" alt="${tile.alt}" loading="lazy" width="160" height="160" />
    </div>
  `).join('');

  if (link) {
    if (SITE_CONFIG.instagram.url && SITE_CONFIG.instagram.isConfigured) {
      link.href = SITE_CONFIG.instagram.url;
    } else {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Visual Journal: ${SITE_CONFIG.instagram.handle}\n\nTo link a verified Instagram profile, configure SITE_CONFIG.instagram.url in src/config.js.`);
      });
    }
  }
}

// ─── WHATSAPP INTEGRATION ───
function initWhatsApp() {
  const btn = document.getElementById('whatsapp-btn');
  const note = document.getElementById('whatsapp-note');
  if (!btn) return;

  if (SITE_CONFIG.whatsapp.isConfigured && SITE_CONFIG.whatsapp.phoneNumber) {
    if (note) note.textContent = 'Instant chat active. Click above to open WhatsApp directly.';
    btn.addEventListener('click', () => {
      openWhatsApp(SITE_CONFIG.whatsapp.defaultMessage);
    });
  } else {
    btn.addEventListener('click', () => {
      alert('WhatsApp Business Setup:\n\nTo enable instant WhatsApp messaging, set your business phone number in src/config.js:\nSITE_CONFIG.whatsapp.phoneNumber = "919876543210";\nSITE_CONFIG.whatsapp.isConfigured = true;');
    });
    if (note) note.textContent = 'WhatsApp connects directly once phone number is set in site config.';
  }
}

function openWhatsApp(message, data = {}) {
  if (!SITE_CONFIG.whatsapp.isConfigured || !SITE_CONFIG.whatsapp.phoneNumber) {
    alert('WhatsApp number is not configured in site settings.');
    return;
  }

  let fullMessage = message;
  if (data.service) fullMessage += `\nOccasion: ${data.service}`;
  if (data.date) fullMessage += `\nDate: ${data.date}`;
  if (data.location) fullMessage += `\nVenue/City: ${data.location}`;

  const encodedMessage = encodeURIComponent(fullMessage);
  const url = `https://wa.me/${SITE_CONFIG.whatsapp.phoneNumber}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ─── CONTACT / BOOKING ENQUIRY FORM ───
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  const success = document.getElementById('form-success');
  const resetBtn = document.getElementById('form-reset-btn');
  if (!form || !success || !resetBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (SITE_CONFIG.contact.isConfigured && SITE_CONFIG.contact.endpoint) {
      submitForm(data);
    } else {
      // In demo mode: Show verification and give clear setup instructions
      form.style.display = 'none';
      success.removeAttribute('hidden');
    }
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    form.style.display = '';
    success.setAttribute('hidden', '');
    clearErrors();
  });
}

function validateForm() {
  let isValid = true;
  clearErrors();

  const name = document.getElementById('form-name');
  const email = document.getElementById('form-email');
  const eventType = document.getElementById('form-event-type');
  const eventDate = document.getElementById('form-event-date');

  if (!name.value.trim()) {
    showError('error-name', 'Please enter your name');
    name.classList.add('error');
    isValid = false;
  }

  if (!email.value.trim()) {
    showError('error-email', 'Please enter your email');
    email.classList.add('error');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError('error-email', 'Please enter a valid email address');
    email.classList.add('error');
    isValid = false;
  }

  if (!eventType.value) {
    showError('error-event-type', 'Please select an occasion type');
    eventType.classList.add('error');
    isValid = false;
  }

  if (!eventDate.value) {
    showError('error-event-date', 'Please select your occasion date');
    eventDate.classList.add('error');
    isValid = false;
  } else {
    const selectedDate = new Date(eventDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError('error-event-date', 'Date must be today or in the future');
      eventDate.classList.add('error');
      isValid = false;
    }
  }

  return isValid;
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function setMinDate() {
  const dateInput = document.getElementById('form-event-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

function submitForm(data) {
  console.log('Production submission to endpoint:', SITE_CONFIG.contact.endpoint, data);
}

// ─── BEAUTY ASSISTANT CHATBOT (LOCAL PREDEFINED RESPONSES) ───
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const minimize = document.getElementById('chatbot-minimize');
  const wrapper = document.getElementById('chatbot-wrapper');
  const window_el = document.getElementById('chatbot-window');
  const messagesEl = document.getElementById('chatbot-messages');
  const quickRepliesEl = document.getElementById('chatbot-quick-replies');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  if (!toggle || !minimize || !wrapper || !window_el) return;

  let chatState = {
    step: 'welcome',
    isOpen: false,
  };

  function toggleChat() {
    chatState.isOpen = !chatState.isOpen;
    if (chatState.isOpen) {
      wrapper.classList.add('open');
      window_el.removeAttribute('hidden');
      if (messagesEl.children.length === 0) {
        showWelcome();
      }
      inputEl.focus();
    } else {
      wrapper.classList.remove('open');
      window_el.setAttribute('hidden', '');
    }
  }

  toggle.addEventListener('click', toggleChat);
  minimize.addEventListener('click', toggleChat);

  sendBtn.addEventListener('click', handleUserInput);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserInput();
    }
  });

  function handleUserInput() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    inputEl.value = '';
    processFreeText(text);
  }

  function showWelcome() {
    addMessage("Hello! I am Aadhya's digital assistant. How can I guide your look design today?", 'bot');
    showQuickReplies([
      { text: 'Bridal Looks Guide', action: 'bridal' },
      { text: 'Skin Prep Tips', action: 'prep' },
      { text: 'Booking Process', action: 'booking' },
      { text: 'Bengaluru & Travel', action: 'travel' },
    ]);
  }

  function showQuickReplies(replies) {
    quickRepliesEl.innerHTML = replies.map(r => `
      <button class="quick-reply-btn" data-action="${r.action}">${r.text}</button>
    `).join('');

    quickRepliesEl.querySelectorAll('.quick-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addMessage(btn.textContent, 'user');
        quickRepliesEl.innerHTML = '';
        processAction(btn.dataset.action);
      });
    });
  }

  function addMessage(text, sender, isHtml = false) {
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    div.innerHTML = `<div class="chat-bubble">${isHtml ? text : escapeHtml(text)}</div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBotMessageWithDelay(text, delay = 600, isHtml = false) {
    quickRepliesEl.innerHTML = '';
    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.innerHTML = `<div class="chat-bubble"><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`;
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      if (typing.parentNode) {
        messagesEl.removeChild(typing);
      }
      addMessage(text, 'bot', isHtml);
    }, delay);

    return delay;
  }

  function processAction(action) {
    switch (action) {
      case 'bridal':
        addBotMessageWithDelay("Aadhya creates bespoke bridal looks designed around your bone structure, outfit drape, and ceremony lighting — from sheer, dewy modern minimalism to classic ceremonial red with defined kohl.");
        setTimeout(() => {
          showQuickReplies([
            { text: 'Skin Prep Tips', action: 'prep' },
            { text: 'Enquire for Date', action: 'booking' },
            { text: 'Back to Menu', action: 'welcome' },
          ]);
        }, 1000);
        break;

      case 'prep':
        addBotMessageWithDelay("For optimal makeup finish on wedding days: keep hydration high 2-3 weeks prior, avoid aggressive chemical peels within 10 days of your event, and share your skin sensitivities during your consultation.");
        setTimeout(() => {
          showQuickReplies([
            { text: 'Bridal Looks Guide', action: 'bridal' },
            { text: 'Enquire for Date', action: 'booking' },
            { text: 'Back to Menu', action: 'welcome' },
          ]);
        }, 1000);
        break;

      case 'booking':
        addBotMessageWithDelay("To enquire for your date: please use the 'Bookings & Enquiries' form on the site. Share your date, venue location, and event type. Aadhya will review availability and discuss next steps.");
        setTimeout(() => {
          showQuickReplies([
            { text: 'Bengaluru & Travel', action: 'travel' },
            { text: 'Back to Menu', action: 'welcome' },
          ]);
        }, 1000);
        break;

      case 'travel':
        addBotMessageWithDelay("Aadhya is based in Bengaluru, Karnataka, and conducts both studio consultations and on-location bridal dressing across the city. Destination bookings for weddings across India are accepted upon request.");
        setTimeout(() => {
          showQuickReplies([
            { text: 'Enquire for Date', action: 'booking' },
            { text: 'Back to Menu', action: 'welcome' },
          ]);
        }, 1000);
        break;

      case 'welcome':
      default:
        showWelcome();
        break;
    }
  }

  function processFreeText(query) {
    const q = query.toLowerCase();
    if (q.includes('bride') || q.includes('wedding') || q.includes('bridal')) {
      processAction('bridal');
    } else if (q.includes('skin') || q.includes('prep') || q.includes('care')) {
      processAction('prep');
    } else if (q.includes('book') || q.includes('date') || q.includes('price') || q.includes('cost')) {
      processAction('booking');
    } else if (q.includes('travel') || q.includes('location') || q.includes('bengaluru') || q.includes('bangalore')) {
      processAction('travel');
    } else {
      addBotMessageWithDelay("I am happy to help guide you. You can explore curated looks in the portfolio or fill out the enquiry form with your event details.");
      setTimeout(() => {
        showQuickReplies([
          { text: 'Bridal Looks Guide', action: 'bridal' },
          { text: 'Booking Process', action: 'booking' },
        ]);
      }, 1000);
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ─── BACK TO TOP ───
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

// ─── SMOOTH SCROLL ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
