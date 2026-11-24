
/* ========================================
   THUNDER TITANS - MAIN JAVASCRIPT
======================================== */


/* ========================================
   1. MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // Close menu after clicking a link

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", event => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

        }

    });

}


/* ========================================
   2. CURRENT YEAR
======================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ========================================
   3. ACTIVE NAVIGATION LINK
======================================== */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);


/* ========================================
   4. SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(
    ".about-content, .mvv-card, .activity-card, .committee-card, .gallery-item, .contact-info, .contact-form"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ========================================
   5. GALLERY LIGHTBOX
======================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCounter = document.getElementById("lightboxCounter");

let currentImageIndex = 0;


function showGalleryImage(index) {

    if (!galleryImages.length) return;

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    const selectedImage = galleryImages[currentImageIndex];

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${galleryImages.length}`;

}


function openLightbox(index) {

    if (!lightbox) return;

    showGalleryImage(index);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    lightboxClose.focus();

}


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});


if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);

}


if (lightboxPrev) {

    lightboxPrev.addEventListener("click", () => {

        showGalleryImage(currentImageIndex - 1);

    });

}


if (lightboxNext) {

    lightboxNext.addEventListener("click", () => {

        showGalleryImage(currentImageIndex + 1);

    });

}


// Close lightbox by clicking outside the image

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


// Keyboard controls

document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        showGalleryImage(currentImageIndex + 1);

    }

    if (event.key === "ArrowLeft") {

        showGalleryImage(currentImageIndex - 1);

    }

});


/* ========================================
   6. CONTACT FORM
======================================== */

// Add your real club email address here.

const CLUB_EMAIL = "yourclubemail@example.com";

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();


        // Check required fields

        if (!name || !email || !subject || !message) {

            alert("Please fill in all fields.");

            return;

        }


        // Validate email

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        // Check club email

        if const CLUB_EMAIL = "thundertitans14@gmail.com"; {

            alert("Please set your real club email address in script.js first.");

            return;

        }


        // Prepare email content

        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Open email application

        window.location.href =
            `mailto:${CLUB_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    });

}
