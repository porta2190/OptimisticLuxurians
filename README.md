# Optimistic Luxurians
**Premium Auto Detailing & Pressure Washing**

A beautiful, modern single-page website for Optimistic Luxurians.

## Features
- Elegant luxury design with gold accents on clean dark/light palettes
- Fully responsive (mobile-first)
- Smooth scrolling navigation
- Interactive gallery with lightbox modal + keyboard navigation
- Package selection that prefills the booking form
- Working booking / quote request form (simulated submission + success state)
- Mobile hamburger menu
- Fast loading with Tailwind via CDN + Font Awesome icons

## Quick Start
1. Open `index.html` directly in any modern browser, **or**
2. Serve locally:

```bash
# Python 3
python3 -m http.server 8080

# Then visit http://localhost:8080
```

## Customization
- Update phone, email, and service area in index.html
- Replace images in the `images/` folder (keep same filenames or update src attributes)
- Adjust pricing and services easily by editing the Packages and Services sections
- The booking form currently simulates sending; to connect to real email, integrate Formspree, Netlify Forms, or your own backend.

## Project Structure
```
optimistic-luxurians-website/
├── index.html
├── script.js
├── README.md
└── images/
    ├── 1.jpg   # Wheel detail
    ├── 2.jpg   # Hero luxury sedan
    ├── 3.jpg   # Interior detail
    ├── 4.jpg   # Driveway pressure wash
    ├── 5.jpg   # House siding
    ├── 6.jpg   # Ceramic coating
    └── 7.jpg   # Before/after
```

## Tech
- Tailwind CSS (Play CDN)
- Vanilla JavaScript
- Font Awesome 6
- Responsive, accessible, no frameworks needed

---

Built with pride for Optimistic Luxurians.  
Feel free to reach out for further branding, booking integrations, or additional pages.