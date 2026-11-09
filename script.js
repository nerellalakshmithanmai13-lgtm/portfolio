/**
 * N. LAKSHMI THANMAI - PORTFOLIO INTERACTIVE CORE
 * Interactive Hardware Simulations, ECE CLI Terminal, Recruiter Snapshot, Dual Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initCircuitCanvas();
  initNavbarScroll();
  initESP32Simulator();
  initPlantSimulator();
  initRecruiterCLI();
  initSkillsFilter();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. THEME ENGINE (DARK / LIGHT DUAL MODE)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? '🌙 Cyber Dark' : '☀️ Clean Light'} mode`);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }
}

/* ==========================================================================
   2. INTERACTIVE CIRCUIT / PCB BACKGROUND CANVAS
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const totalNodes = Math.min(45, Math.floor((width * height) / 25000));

  for (let i = 0; i < totalNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const traceColor = isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.15)';
    const nodeColor = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.5)';
    const activeColor = isLight ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.8)';

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.03;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Draw node pad (like a PCB via)
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + Math.sin(n.pulse) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Connect orthogonal PCB-like lines
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          // ECE 90-degree circuit traces style
          const midX = (n.x + n2.x) / 2;
          ctx.lineTo(midX, n.y);
          ctx.lineTo(midX, n2.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = traceColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      const distMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (distMouse < 120) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. NAVBAR SCROLL SPY & MOBILE MENU
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
      const isOpen = navLinksContainer.classList.contains('mobile-open');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* ==========================================================================
   4. ESP32 MULTI-LED HARDWARE & PYTHON CONTROLLER SIMULATOR
   ========================================================================== */
function initESP32Simulator() {
  const leds = {
    2: { el: document.getElementById('led-pin-2'), state: false, colorClass: 'active-red', label: 'LED 1 (GPIO 2 - Red)' },
    4: { el: document.getElementById('led-pin-4'), state: false, colorClass: 'active-blue', label: 'LED 2 (GPIO 4 - Blue)' },
    16: { el: document.getElementById('led-pin-16'), state: false, colorClass: 'active-green', label: 'LED 3 (GPIO 16 - Green)' },
    17: { el: document.getElementById('led-pin-17'), state: false, colorClass: 'active-yellow', label: 'LED 4 (GPIO 17 - Amber)' }
  };

  const simConsole = document.getElementById('esp32-console');
  let waveInterval = null;

  function logConsole(msg, type = 'info') {
    if (!simConsole) return;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const color = type === 'success' ? '#34d399' : type === 'warn' ? '#fbbf24' : '#38bdf8';
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="color:#64748b;">[${time}]</span> <span style="color:${color};">> ${msg}</span>`;
    simConsole.appendChild(entry);
    simConsole.scrollTop = simConsole.scrollHeight;
  }

  window.toggleLED = function(pin) {
    stopWavePattern();
    const item = leds[pin];
    if (!item || !item.el) return;
    item.state = !item.state;
    item.el.classList.toggle(item.colorClass, item.state);
    logConsole(`Python serial.write(b"PIN_${pin}_${item.state ? 'HIGH' : 'LOW'}\\n") -> Pin ${pin} is now ${item.state ? 'HIGH (3.3V)' : 'LOW (0V)'}`, item.state ? 'success' : 'warn');
  };

  window.setAllLEDs = function(turnOn) {
    stopWavePattern();
    Object.keys(leds).forEach((pin) => {
      const item = leds[pin];
      item.state = turnOn;
      if (item.el) {
        if (turnOn) item.el.classList.add(item.colorClass);
        else item.el.classList.remove(item.colorClass);
      }
    });
    logConsole(`Python command: esp32.broadcast_state(${turnOn ? 'True' : 'False'}) -> All 4 channels ${turnOn ? 'HIGH' : 'LOW'}`, turnOn ? 'success' : 'warn');
  };

  window.startWavePattern = function() {
    stopWavePattern();
    logConsole(`Python script: Running sequence loop [CHASER WAVE MODE @ 250ms]...`, 'info');
    let index = 0;
    const pins = [2, 4, 16, 17];

    waveInterval = setInterval(() => {
      pins.forEach((p, i) => {
        const item = leds[p];
        if (item.el) {
          if (i === index) {
            item.el.classList.add(item.colorClass);
            item.state = true;
          } else {
            item.el.classList.remove(item.colorClass);
            item.state = false;
          }
        }
      });
      index = (index + 1) % pins.length;
    }, 280);
  };

  function stopWavePattern() {
    if (waveInterval) {
      clearInterval(waveInterval);
      waveInterval = null;
    }
  }

  window.stopWavePattern = stopWavePattern;
}

/* ==========================================================================
   5. AUTOMATIC PLANT WATERING & SOIL MOISTURE SIMULATOR
   ========================================================================== */
function initPlantSimulator() {
  const slider = document.getElementById('moisture-slider');
  const moistureVal = document.getElementById('moisture-val-display');
  const adcDisplay = document.getElementById('adc-raw-display');
  const pumpIcon = document.getElementById('pump-motor-icon');
  const pumpStatusText = document.getElementById('pump-status-badge');
  const dial = document.getElementById('moisture-dial');

  if (!slider) return;

  function updateIrrigationSystem(val) {
    const moisture = parseInt(val, 10);
    moistureVal.textContent = `${moisture}%`;
    
    // 12-bit ADC simulation on ESP32 (0 - 4095)
    // Higher moisture = lower resistance = higher voltage / lower ADC raw if inverted
    const simulatedADC = Math.round(4095 - (moisture / 100) * 2800);
    const voltage = ((4095 - simulatedADC) / 4095 * 3.3).toFixed(2);
    adcDisplay.textContent = `ADC Raw: ${simulatedADC} | ${voltage}V`;

    // Dial border style
    if (dial) {
      dial.style.borderColor = moisture < 35 ? '#ef4444' : moisture < 65 ? '#10b981' : '#38bdf8';
    }

    // Closed loop irrigation logic: Threshold 35%
    if (moisture < 35) {
      // Dry soil: Pump ON
      pumpIcon.classList.add('pumping');
      pumpStatusText.innerHTML = '<i class="fa-solid fa-droplet fa-beat"></i> PUMP ACTIVE (IRRIGATING)';
      pumpStatusText.className = 'badge badge-emerald';
    } else {
      // Adequate moisture: Pump OFF
      pumpIcon.classList.remove('pumping');
      pumpStatusText.innerHTML = '<i class="fa-solid fa-circle-check"></i> MOISTURE OPTIMAL (STANDBY)';
      pumpStatusText.className = 'badge badge-cyan';
    }
  }

  slider.addEventListener('input', (e) => {
    updateIrrigationSystem(e.target.value);
  });

  window.simulateRainEvent = function() {
    slider.value = 85;
    updateIrrigationSystem(85);
    showToast('Simulated Rain / Manual Watering event -> Soil moisture increased to 85%');
  };

  window.simulateDroughtEvent = function() {
    slider.value = 18;
    updateIrrigationSystem(18);
    showToast('Simulated Dry Soil condition (18%) -> Automatic Relay engaged & Pump started!');
  };
}

/* ==========================================================================
   6. INTERACTIVE RECRUITER CLI TERMINAL
   ========================================================================== */
function initRecruiterCLI() {
  const cliInput = document.getElementById('cli-input');
  const cliLog = document.getElementById('cli-output-log');

  if (!cliInput || !cliLog) return;

  const commands = {
    help: () => `
<span style="color:#38bdf8; font-weight:700;">AVAILABLE RECRUITER TERMINAL COMMANDS:</span>
  <span style="color:#10b981;">about</span>      - 60-second summary on N. Lakshmi Thanmai
  <span style="color:#10b981;">cgpa</span>       - Academic track record & credentials (9.59 B.Tech)
  <span style="color:#10b981;">skills</span>     - Core technical & hardware competencies
  <span style="color:#10b981;">projects</span>   - Hands-on IoT, ESP32, and ML engineering work
  <span style="color:#10b981;">research</span>   - National conference published papers (NCA SCTE, IETE)
  <span style="color:#10b981;">awards</span>     - Best Student Award 2025 & honors
  <span style="color:#10b981;">contact</span>    - Direct phone, email, and recruitment links
  <span style="color:#10b981;">resume</span>     - Open clean ATS printable resume modal
  <span style="color:#10b981;">clear</span>      - Clear terminal screen
`,
    about: () => `
<span style="color:#f8fafc; font-weight:700;">N. LAKSHMI THANMAI</span> - Class of 2027 ECE Final-Year Engineer
- Institution: Sri Venkateswara College of Engineering (SVCE)
- Core Focus: IoT Embedded Systems, Python Programming, Microcontrollers, and Applied AI.
- Differentiating Edge: Rare combination of top-tier academic rigor (9.59 CGPA), national conference research author, and practical hardware prototyping experience.
`,
    cgpa: () => `
<span style="color:#fbbf24; font-weight:700;">ACADEMIC DISCIPLINE & BOARD RESULTS:</span>
  🎓 <span style="color:#38bdf8;">B.Tech in ECE:</span> <strong>9.59 / 10.0 CGPA</strong> (SVCE, 2023-2027)
  🏫 <span style="color:#38bdf8;">Intermediate MPC:</span> <strong>92.4%</strong> (Sri Chaitanya Junior College, 2021-2023)
  🎒 <span style="color:#38bdf8;">High School (SSC):</span> <strong>98.3%</strong> (St. Arnold's High School, 2020-2021)
  <em>Top academic consistency across all tiers of education.</em>
`,
    skills: () => `
<span style="color:#34d399; font-weight:700;">CORE TECHNICAL STACK:</span>
  • <span style="color:#38bdf8;">Languages:</span> Python, C
  • <span style="color:#38bdf8;">Hardware & IoT:</span> ESP32, Arduino, Microcontroller Architecture, GPIO Interfacing, Sensor Integration (Soil Moisture, Relays, Pumps)
  • <span style="color:#38bdf8;">Tools & Platforms:</span> MATLAB (Basics), CAD Designs to 3D Printing (NIELIT), Google Maps GIS API, Git/GitHub
  • <span style="color:#38bdf8;">Applied AI/ML:</span> Soft Computing, Face Recognition Biometrics, 120-Hr AI/ML Internship (APSCHE & SmartBridge)
`,
    projects: () => `
<span style="color:#a855f7; font-weight:700;">ENGINEERING PORTFOLIO:</span>
  1. <strong>Multi-LED Control using ESP32 and Python</strong> (IoT GPIO synchronization, serial communication, latency &lt;50ms)
  2. <strong>Automatic Plant Watering System</strong> (Closed-loop analog soil moisture sensor, relay actuator, water pump conservation)
  3. <strong>AI-Based Face Recognition System</strong> (Soft computing conference research at ACE Engg College)
  4. <strong>Drone & Satellite Water Resource Protection</strong> (IETE & PVPSIT published research)
`,
    research: () => `
<span style="color:#38bdf8; font-weight:700;">CONFERENCE RESEARCH & PUBLICATIONS:</span>
  📄 <em>"AI-Based Face Recognition System"</em> - Presented at 5th National Conference on Applications of Soft Computing Techniques in Engineering (NCA SCTE-2026), Hyderabad.
  📄 <em>"Water Resources Protection from Encroachment using Google Maps and Drone Technology"</em> - IETE Vijayawada & PVPSIT.
`,
    awards: () => `
<span style="color:#fbbf24; font-weight:700;">HONORS & AWARDS:</span>
  🏆 <strong>Best Student Award</strong> - Sri Venkateswara Pratibha Purashkar, ABVP 2025.
  📜 5+ Industry Certifications (LinkedIn, HP LIFE, NIELIT Calicut, S.V. University, APSCHE).
`,
    contact: () => `
<span style="color:#34d399; font-weight:700;">GET IN TOUCH:</span>
  ✉️ Email:    <a href="mailto:nlakshmithanmai@gmail.com" style="color:#38bdf8;">nlakshmithanmai@gmail.com</a>
  📱 Phone:    <a href="tel:+919618476903" style="color:#38bdf8;">+91 9618476903</a>
  🔗 LinkedIn: <a href="https://linkedin.com/in/lakshmi" target="_blank" style="color:#38bdf8;">linkedin.com/in/lakshmi</a>
  📍 Location: Andhra Pradesh, India (Open to 2027 Campus Recruitment Pan-India)
`,
    hire: () => `
<span style="color:#10b981; font-weight:700;">READY FOR CAMPUS RECRUITMENT 2027!</span>
Target Roles: Embedded Systems Engineer, IoT Developer, Graduate Engineering Trainee, Software Development Engineer (Python), AI/ML Engineer.
Direct interview invitation: <a href="#contact" style="color:#38bdf8;">Scroll to Contact Form</a>
`,
    resume: () => {
      openResumeModal();
      return `<span style="color:#34d399;">Opening ATS printable resume preview...</span>`;
    },
    clear: () => {
      cliLog.innerHTML = '';
      return '';
    }
  };

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = cliInput.value.trim().toLowerCase();
      cliInput.value = '';
      if (!rawInput) return;

      const userLine = document.createElement('div');
      userLine.innerHTML = `<span style="color:#38bdf8;">thanmai@ece-svce:~$</span> <span style="color:#f8fafc; font-weight:600;">${rawInput}</span>`;
      cliLog.appendChild(userLine);

      const respLine = document.createElement('div');
      respLine.style.marginBottom = '0.75rem';

      if (commands[rawInput]) {
        const result = commands[rawInput]();
        if (rawInput !== 'clear') {
          respLine.innerHTML = result;
          cliLog.appendChild(respLine);
        }
      } else {
        respLine.innerHTML = `<span style="color:#ef4444;">Command not recognized: '${rawInput}'. Type <strong style="color:#38bdf8;">help</strong> to see valid commands.</span>`;
        cliLog.appendChild(respLine);
      }

      cliLog.parentElement.scrollTop = cliLog.parentElement.scrollHeight;
    }
  });

  window.runCLICommand = function(cmd) {
    cliInput.value = cmd;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    cliInput.dispatchEvent(event);
  };
}

/* ==========================================================================
   7. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skills-filter-tabs .filter-tab');
  const cards = document.querySelectorAll('.skill-category-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. MODALS (RECRUITER 60-SEC PITCH & RESUME VIEWER)
   ========================================================================== */
function initModals() {
  const recruiterModal = document.getElementById('recruiter-modal');
  const resumeModal = document.getElementById('resume-modal');

  window.openRecruiterModal = function() {
    if (recruiterModal) recruiterModal.classList.add('active');
  };

  window.closeRecruiterModal = function() {
    if (recruiterModal) recruiterModal.classList.remove('active');
  };

  window.openResumeModal = function() {
    if (resumeModal) resumeModal.classList.add('active');
  };

  window.closeResumeModal = function() {
    if (resumeModal) resumeModal.classList.remove('active');
  };

  // Close on outside click
  [recruiterModal, resumeModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRecruiterModal();
      closeResumeModal();
    }
  });

  window.copyRecruiterPitch = function() {
    const text = `
Candidate: N. Lakshmi Thanmai
Role Target: 2027 Campus Recruitment (Embedded Systems, IoT, Python, Software Engineering)
Academic Record: 9.59/10 CGPA (B.Tech ECE, SVCE) | 92.4% Inter | 98.3% SSC
Key Competencies: Python, C, ESP32, GPIO Interfacing, Microcontrollers, MATLAB, AI/ML Soft Computing
Honors: Best Student Award 2025 (ABVP Pratibha Purashkar), 2 National Conference Research Papers
Email: nlakshmithanmai@gmail.com | Phone: +91 9618476903
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Recruiter summary copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy automatically. You can copy the text manually.');
    });
  };

  window.printResume = function() {
    window.print();
  };
}

/* ==========================================================================
   9. CONTACT FORM HANDLING & TOAST ALERTS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('recruiter-name').value.trim();
    const company = document.getElementById('recruiter-company').value.trim();
    const email = document.getElementById('recruiter-email').value.trim();
    const message = document.getElementById('recruiter-msg').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all required fields.');
      return;
    }

    // Prepare direct mailto link as fallback for immediate recruiter action
    const subject = encodeURIComponent(`Campus Recruitment 2027 / Interview Invitation - ${company || 'Hiring Team'}`);
    const body = encodeURIComponent(
      `Hello Lakshmi,\n\nMy name is ${name} from ${company || 'our team'}.\nWe came across your portfolio and were impressed by your 9.59 CGPA in ECE, ESP32 IoT projects, and research papers.\n\nMessage:\n${message}\n\nBest regards,\n${name}\n${email}`
    );

    // Open user's email client
    window.location.href = `mailto:nlakshmithanmai@gmail.com?subject=${subject}&body=${body}`;

    showToast('🚀 Opening your email client to connect with Lakshmi!');
    form.reset();
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--accent-cyan);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
