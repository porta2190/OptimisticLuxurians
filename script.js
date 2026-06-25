// Optimistic Luxurians - Website Interactions

// Tailwind script configuration
function initTailwind() {
    if (window.tailwind) {
        window.tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'serif-custom': ['Playfair Display', 'Georgia', 'serif']
                    }
                }
            }
        };
    }
}

// Navbar scroll behavior
function initNavbar() {
    const nav = document.getElementById('nav');
    
    function handleScroll() {
        if (window.scrollY > 20) {
            nav.classList.add('nav-scrolled', 'shadow-sm');
        } else {
            nav.classList.remove('nav-scrolled', 'shadow-sm');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    let isOpen = false;
    
    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('nav-mobile');
            menuBtn.innerHTML = '<i class="fa-solid fa-times text-xl"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('nav-mobile');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        }
    });
    
    // Close on nav link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            isOpen = false;
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            isOpen = false;
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && menuBtn) {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
    }
}

// Smooth scroll helper
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const navHeight = window.innerWidth >= 768 ? 160 : 112;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    closeMobileMenu();
}

// Gallery data
const galleryImages = [
    { src: 'images/2.jpg', caption: 'Premium exterior detailing on a luxury sedan — mirror finish with perfect reflections' },
    { src: 'images/1.jpg', caption: 'Hand-finished wheel and tire detailing — deep black sidewall and gleaming alloys' },
    { src: 'images/3.jpg', caption: 'Interior detailing — meticulous leather cleaning and conditioning' },
    { src: 'images/6.jpg', caption: 'Professional ceramic coating application for long-term protection' },
    { src: 'images/4.jpg', caption: 'Driveway pressure washing — dramatic transformation on concrete' },
    { src: 'images/5.jpg', caption: 'Pressure washing concrete surfaces and hardscapes' },
    { src: 'images/7.jpg', caption: 'Before & After: Complete detailing transformation' }
];

let currentGalleryIndex = 0;

function openGalleryModal(index) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    
    currentGalleryIndex = index;
    
    modalImage.src = galleryImages[index].src;
    modalCaption.textContent = galleryImages[index].caption;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Keyboard support
    document.addEventListener('keydown', handleGalleryKeydown, { once: true });
}

function handleGalleryKeydown(e) {
    if (e.key === 'Escape') {
        closeGalleryModal();
    } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
    } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
    }
}

function closeGalleryModal(event) {
    // Only close if clicking the background
    if (event && event.target.id !== 'gallery-modal') return;
    
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryModal();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryModal();
}

function updateGalleryModal() {
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = galleryImages[currentGalleryIndex].src;
        modalCaption.textContent = galleryImages[currentGalleryIndex].caption;
        modalImage.style.transition = 'opacity 0.2s ease';
        modalImage.style.opacity = '1';
    }, 80);
}

// Package selection — pre-fills form
function selectPackage(packageName) {
    scrollToSection('contact');
    
    // Small delay to allow scroll to finish
    setTimeout(() => {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Try to match select value
            let matched = false;
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].text.includes(packageName.split(' - ')[0])) {
                    serviceSelect.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
            
            if (!matched) {
                // Fallback to first option match
                serviceSelect.value = serviceSelect.options[1]?.value || '';
            }
            
            // Flash highlight
            serviceSelect.style.transition = 'none';
            serviceSelect.style.boxShadow = '0 0 0 3px rgba(197, 164, 110, 0.3)';
            setTimeout(() => {
                serviceSelect.style.boxShadow = '';
                serviceSelect.style.transition = '';
            }, 1100);
        }
    }, 650);
}

// Form handling - Netlify Forms compatible
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    
    // Disable button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="inline-flex items-center gap-x-2">
                <i class="fa-solid fa-spinner fa-spin"></i> 
                SENDING...
            </span>
        `;
    }
    
    // Prepare form data for Netlify
    const formData = new FormData(form);
    
    // Ensure form-name is included (some setups need it explicitly)
    formData.append('form-name', 'booking');
    
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            // Success - reset form and show modal
            form.reset();
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            
            showSuccessModal();
        } else {
            throw new Error('Form submission was not successful');
        }
    })
    .catch((error) => {
        // Fallback if something goes wrong
        console.error("Form submission error:", error);
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
        
        alert("There was a problem sending your request. Please try calling us directly at (770) 555-0199 or email hello@optimisticluxurians.com");
    });
}

function showSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
}

function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.classList.remove('flex');
    successModal.classList.add('hidden');
    
    // Optional: scroll to top or show thank you banner
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add keyboard escape support for modals
function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        const galleryModal = document.getElementById('gallery-modal');
        const successModal = document.getElementById('success-modal');
        
        if (e.key === 'Escape') {
            if (!galleryModal.classList.contains('hidden') && galleryModal.classList.contains('flex')) {
                closeGalleryModal();
            } else if (!successModal.classList.contains('hidden') && successModal.classList.contains('flex')) {
                closeSuccessModal();
            }
        }
    });
}

// Make nav links work with smooth scroll on desktop too
function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    scrollToSection(targetId);
                }
            }
        });
    });
}

// Simple stats counter animation (optional polish)
function initCounters() {
    const stats = document.querySelectorAll('.text-4xl.font-semibold');
    
    if (!stats.length || 'IntersectionObserver' in window === false) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const text = stat.textContent.trim();
                    if (text.includes('%') || text.includes('.')) {
                        // Skip percentage and rating for now (they're not integers)
                        return;
                    }
                    
                    const finalNum = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    if (!finalNum) return;
                    
                    let start = 0;
                    const duration = 1100;
                    const stepTime = 40;
                    const increment = Math.ceil(finalNum / (duration / stepTime));
                    
                    const interval = setInterval(() => {
                        start += increment;
                        if (start >= finalNum) {
                            stat.textContent = text; // restore original formatting
                            clearInterval(interval);
                        } else {
                            stat.textContent = start;
                        }
                    }, stepTime);
                });
                
                observer.disconnect();
            }
        });
    }, { threshold: 0.7 });
    
    // Attach observer to the about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
}

// Preload a couple gallery images (subtle)
function preloadGallery() {
    galleryImages.forEach((imgData, index) => {
        if (index < 3) { // preload first few
            const img = new Image();
            img.src = imgData.src;
        }
    });
}

// Initialize everything
function init() {
    initTailwind();
    initNavbar();
    initMobileMenu();
    initSmoothScrollLinks();
    initModalKeyboard();
    preloadGallery();
    initCounters();
    
    // Bonus: allow pressing "/" anywhere to focus name input on contact form
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName === 'BODY') {
            e.preventDefault();
            const contact = document.getElementById('contact');
            if (contact) {
                contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    const nameInput = document.getElementById('name');
                    if (nameInput) nameInput.focus();
                }, 700);
            }
        }
    });
    
    // Console nice message for devs
    console.log('%c[Optimistic Luxurians] Website ready — premium detailing site loaded.', 'color:#C5A46E');
}

// Run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export useful helpers for potential console use
window.OptimisticLuxurians = {
    scrollToSection,
    selectPackage,
    openGallery: (i) => openGalleryModal(i || 0)
};
