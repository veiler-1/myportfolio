/* ==========================================================================
   AHMED MOHAMED SAAD - PORTFOLIO SCRIPT (STUDIO CHARCOAL EDITION)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSparkleCanvas();
  initNavbarScroll();
  initSkillsFilter();
  initSkillProgressAnimation();
  initProjectModals();
  initPdfViewerModal();
  initContactForm();
});

/* ==================== CANVAS SPARKLE PARTICLES ==================== */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 35;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: Math.random() > 0.5 ? '#e2e8f0' : '#94a3b8'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==================== NAVBAR & SCROLL SPY ==================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (window.scrollY >= secTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==================== SKILLS FILTER ==================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

/* ==================== SKILL PROGRESS BAR ANIMATION ==================== */
function initSkillProgressAnimation() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPct = bar.getAttribute('data-percentage');
        bar.style.width = targetPct + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* ==================== PROJECT MODALS ==================== */
function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-project-modal');

  if (!modalBackdrop) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      loadProjectContent(projId);
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
}

function loadProjectContent(projId) {
  const modalBody = document.getElementById('modal-body-content');
  if (!modalBody) return;

  if (projId === 'network-bank') {
    modalBody.innerHTML = `
      <div class="project-cat">Networking & Infrastructure Project • Cisco Packet Tracer</div>
      <h2 class="section-title gradient-text" style="text-align: left; margin-bottom: 14px;">Bank Enterprise Network Infrastructure</h2>
      <p style="color: var(--text-muted); margin-bottom: 22px;">
        Designed and configured a multi-branch enterprise bank network architecture connecting a Main Branch in Cairo (New Cairo – 5th Settlement) and a Secondary Branch in Alexandria, accommodating over 125 endpoint PCs across segmented VLANs and routers.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px;">
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass);">
          <img src="assets/project_network_cisco.jpg" style="width: 100%; height: 220px; object-fit: cover;" alt="Cisco Network Topology" />
        </div>
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass);">
          <img src="assets/project_network_topo.jpg" style="width: 100%; height: 220px; object-fit: cover;" alt="Network Topo Diagram" />
        </div>
      </div>

      <div class="net-calc-box">
        <h4 style="color: var(--primary-accent); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-network-wired"></i> Interactive Branch Explorer
        </h4>
        <div class="branch-nav">
          <button class="branch-btn active" onclick="switchBranch('cairo')">🏛️ Cairo Main Branch (New Cairo)</button>
          <button class="branch-btn" onclick="switchBranch('alex')">⚓ Alexandria Secondary Branch</button>
        </div>

        <div id="branch-details-box">
          <div class="branch-depts-grid">
            <div class="dept-card">
              <h6>Hall Department</h6>
              <span>20 PCs</span>
            </div>
            <div class="dept-card">
              <h6>Customer Service</h6>
              <span>50 PCs</span>
            </div>
            <div class="dept-card">
              <h6>Admin Offices</h6>
              <span>13 PCs</span>
            </div>
            <div class="dept-card">
              <h6>Loans Department</h6>
              <span>20 PCs</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="project-tech-stack" style="margin-bottom:0;">
          <span class="tech-pill">Cisco Packet Tracer</span>
          <span class="tech-pill">VLSM Subnetting</span>
          <span class="tech-pill">VLAN Isolation</span>
          <span class="tech-pill">Routing Protocols</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="showToast('Network topology specifications loaded!')">Download Spec Sheet 📄</button>
      </div>
    `;
  } else if (projId === 'flutter-ecommerce') {
    modalBody.innerHTML = `
      <div class="project-cat">Mobile Application • Flutter & BLoC</div>
      <h2 class="section-title gradient-text" style="text-align: left; margin-bottom: 14px;">Modern E-Commerce Mobile Application</h2>
      <p style="color: var(--text-muted); margin-bottom: 22px;">
        A high-performance cross-platform e-commerce mobile application crafted with Flutter, implementing state-of-the-art software architecture (Clean Architecture + BLoC Pattern) and REST API communication via Dio.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px;">
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass); text-align: center; background: rgba(0,0,0,0.3);">
          <img src="assets/project_flutter_mobile.jpg" style="max-height: 270px; object-fit: contain;" alt="App Screenshot" />
        </div>
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass); text-align: center; background: rgba(0,0,0,0.3);">
          <img src="assets/project_flutter_mockup.jpg" style="max-height: 270px; object-fit: contain;" alt="UI Flow Mockup" />
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.02); padding: 18px; border-radius: 12px; border: 1px solid var(--border-glass);">
        <h4 style="color: var(--primary-accent); margin-bottom: 10px;">💡 Architectural Highlights</h4>
        <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.92rem; line-height: 1.8;">
          <li>Clean separation of concerns: Presentation Layer, Domain Layer, Data Layer.</li>
          <li>State management handled via BLoC (Business Logic Component).</li>
          <li>Robust RESTful API integration using Dio HTTP client with interceptors & custom error handlers.</li>
          <li>Seamless shopping cart, product reviews, filtering, and animated UI flows.</li>
        </ul>
      </div>

      <div style="margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="project-tech-stack" style="margin-bottom:0;">
          <span class="tech-pill">Flutter</span>
          <span class="tech-pill">Dart</span>
          <span class="tech-pill">BLoC Pattern</span>
          <span class="tech-pill">Dio REST API</span>
          <span class="tech-pill">Clean Architecture</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="showToast('Repository link ready!')">View GitHub Repo 🐙</button>
      </div>
    `;
  }
}

/* ==================== SWITCH BRANCH (NETWORKING TOOL) ==================== */
window.switchBranch = function(branch) {
  const btns = document.querySelectorAll('.branch-btn');
  const detailsBox = document.getElementById('branch-details-box');
  if (!detailsBox) return;

  btns.forEach(b => b.classList.remove('active'));

  if (branch === 'cairo') {
    btns[0].classList.add('active');
    detailsBox.innerHTML = `
      <div class="branch-depts-grid">
        <div class="dept-card">
          <h6>Hall Department</h6>
          <span>20 PCs</span>
        </div>
        <div class="dept-card">
          <h6>Customer Service</h6>
          <span>50 PCs</span>
        </div>
        <div class="dept-card">
          <h6>Admin Offices</h6>
          <span>13 PCs</span>
        </div>
        <div class="dept-card">
          <h6>Loans Department</h6>
          <span>20 PCs</span>
        </div>
      </div>
    `;
  } else {
    btns[1].classList.add('active');
    detailsBox.innerHTML = `
      <div class="branch-depts-grid">
        <div class="dept-card">
          <h6>Operations Vault</h6>
          <span>12 PCs</span>
        </div>
        <div class="dept-card">
          <h6>Branch Admin</h6>
          <span>10 PCs</span>
        </div>
      </div>
    `;
  }
};

/* ==================== PDF PRESENTATION MODAL ==================== */
function initPdfViewerModal() {
  const pdfModal = document.getElementById('pdf-modal');
  const openPdfBtns = document.querySelectorAll('.open-pdf-modal');
  const pdfClose = document.getElementById('pdf-modal-close');

  if (!pdfModal) return;

  openPdfBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      pdfModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderPdfGallery();
    });
  });

  const closeModal = () => {
    pdfModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (pdfClose) pdfClose.addEventListener('click', closeModal);
  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) closeModal();
  });
}

function renderPdfGallery() {
  const pdfGalleryBox = document.getElementById('pdf-gallery-content');
  if (!pdfGalleryBox) return;

  let slidesHtml = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge-soft">📄 Original PDF Presentation Gallery</span>
      <h3 class="section-title gradient-text" style="font-size: 1.7rem; margin: 8px 0;">Portfolio Slide Deck</h3>
    </div>
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
  `;

  for (let i = 1; i <= 9; i++) {
    slidesHtml += `
      <div style="width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-card);">
        <img src="pdf_images/page_${i}.png" style="width: 100%; display: block;" alt="Slide ${i}" loading="lazy" />
      </div>
    `;
  }

  slidesHtml += `</div>`;
  pdfGalleryBox.innerHTML = slidesHtml;
}

/* ==================== CONTACT FORM & TOAST ==================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

window.showToast = function(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span id="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  document.getElementById('toast-msg').innerText = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
};
