
// ======================================
// MAEGAN'S PERSONAL HOMEPAGE
// Navigation, animations, and interactions
// ======================================

// Enable scroll-reveal styles only when JavaScript is available.
document.documentElement.classList.add("js-ready");

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a navigation link.
document.querySelectorAll("#nav-links a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

// Close the menu when clicking outside the navigation.
document.addEventListener("click", function (event) {
    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

// Close the mobile menu when switching to desktop width.
window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".timeline-item, .education-card, .learning-banner, .contact-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach(function (element) {
        element.classList.add("revealed");
    });
}

// BACK-TO-TOP BUTTON
const backToTop = document.getElementById("back-to-top");

window.addEventListener(
    "scroll",
    function () {
        backToTop.classList.toggle("visible", window.scrollY > 350);
    },
    { passive: true }
);

backToTop.addEventListener("click", function () {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });
});

// AUTOMATIC COPYRIGHT YEAR
document.getElementById("current-year").textContent =
    new Date().getFullYear();
