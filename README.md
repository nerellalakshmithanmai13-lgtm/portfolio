# 🚀 N. Lakshmi Thanmai — Personal Portfolio Website
### Final-Year B.Tech ECE Student | 2027 Campus Recruitment Showcase

Designed and engineered with world-class UI/UX design and modern frontend architecture tailored specifically for **campus recruitment drives (Batch 2027)**, technical recruiters, hiring managers, and core engineering leads.

---

## 🌟 Highlights & Key Differentiators

1. **Recruiter-First Conversion Funnel**:
   - **60-Second Recruiter Snapshot & Scorecard**: A modal summarizing why Lakshmi is a top 1% hire (9.59 CGPA, ESP32 IoT prototypes, 2 national conference research papers, ABVP Best Student Award).
   - **Dual Resume Delivery**:
     - **Interactive ATS Resume Modal** with browser print engine (`window.print()` formatted via dedicated `@media print` CSS).
     - **Direct Original PDF Download** linking directly to the verified resume file.
   - **1-Click Copy**: Instant clipboard copy of the candidate summary for HR notes and applicant tracking systems.

2. **Interactive Engineering Lab (Simulators)**:
   - **ESP32 Multi-LED Hardware Controller**:
     - Interactive virtual breadboard with 4 GPIO channels (GPIO 2 - Red, GPIO 4 - Blue, GPIO 16 - Green, GPIO 17 - Amber).
     - Individual pin toggling, all-on/all-off modes, running wave chaser mode.
     - Live virtual serial monitor (`COM3 @ 115200 baud`) showing simulated Python `serial.write()` calls.
   - **Automatic Plant Watering & Irrigation Feedback**:
     - Interactive soil moisture slider with real-time 12-bit ADC raw calculations (`0-4095`) and voltage readings (`0-3.3V`).
     - Automated closed-loop relay threshold logic (< 35% triggers 5V water pump with animated motor state).
     - Quick drought/rain simulation buttons.

3. **ECE Developer CLI / Interactive Terminal**:
   - A fully functional keyboard-driven terminal allowing recruiters to run commands (`help`, `about`, `cgpa`, `skills`, `projects`, `research`, `awards`, `contact`, `hire`, `resume`, `clear`).
   - Quick command chips for one-click execution on mobile and desktop.

4. **Visual Aesthetics & Technical Polish**:
   - **Dual Theme Engine**: Cyber Slate Dark Mode (default) & Clean Corporate Light Mode with `localStorage` memory and system preference detection.
   - **Interactive PCB Circuit Canvas**: Procedural canvas background drawing microchip via pads and orthogonal circuit traces that respond dynamically to mouse proximity.
   - **Responsive Design**: Flawlessly tested across mobile (320px+), tablet, and desktop viewports.
   - **Accessibility & Performance**: High-contrast typography, zero runtime framework bloat, instant page loading speed.

---

## 📂 File Structure

```
├── index.html                    # Semantic HTML5 single-page application
├── styles.css                    # Custom CSS design system, dark/light themes, animations & print engine
├── script.js                     # Interactive simulators, canvas, CLI terminal, modals & state logic
├── Nerella Lakshmi Thanmai.pdf    # Candidate's original verified resume
├── thanmaidata - student_data.pdf# Student performance analytical dataset
└── README.md                     # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Simplest)
Simply double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
You can serve the directory using Python or Node.js:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 1-Click Free Hosting & Deployment

This portfolio is completely self-contained with zero build step dependencies, making it ready to deploy on:

1. **GitHub Pages**:
   - Create a repository named `<username>.github.io` on GitHub.
   - Push `index.html`, `styles.css`, `script.js`, and the PDF files.
   - Go to **Settings > Pages** and select the `main` branch.

2. **Netlify**:
   - Drag and drop this folder directly into the [Netlify Drop](https://app.netlify.com/drop) zone.

3. **Vercel**:
   - Run `npx vercel` in the folder or connect your GitHub repository.

---

## 🎓 Candidate Information Summary

- **Name**: Nerella Lakshmi Thanmai (N. Lakshmi Thanmai)
- **Degree**: B.Tech in Electronics & Communication Engineering (2023 - 2027)
- **College**: Sri Venkateswara College of Engineering (SVCE), Tirupati
- **CGPA**: **9.59 / 10.0**
- **Intermediate (MPC)**: Sri Chaitanya Junior College — **92.4%**
- **High School (SSC)**: St. Arnold's High School — **98.3%**
- **Email**: `nlakshmithanmai@gmail.com`
- **Phone**: `+91 9618476903`
- **LinkedIn**: `linkedin.com/in/lakshmi`
- **Honors**: Best Student Award (Sri Venkateswara Pratibha Purashkar, ABVP 2025)
- **Conference Papers**:
  - *AI-Based Face Recognition System* (5th National Conference NCA SCTE-2026, ACE College, Hyderabad)
  - *Water Resources Protection from Encroachment using Google Maps and Drone Technology* (IETE Vijayawada & PVPSIT)
- **Certifications**:
  - 120-Hr Virtual AI/ML Internship (APSCHE & SmartBridge)
  - Python Essentials (LinkedIn)
  - AI for Beginners (HP LIFE)
  - CAD Designs to 3D Printing (NIELIT Calicut)
  - Designing of IoT (S.V. University, Tirupati)
