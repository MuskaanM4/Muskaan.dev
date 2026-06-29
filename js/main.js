document.addEventListener('DOMContentLoaded', () => {
    addFloatingBlobs();
    initScrollReveal();
    initNavHighlight();
    initMobileNav();
});

function addFloatingBlobs() {
    if (document.querySelector('.floating-blob')) return;

    const blobs = [
        { class: 'blob-1' },
        { class: 'blob-2' },
        { class: 'blob-3' }
    ];

    blobs.forEach(({ class: cls }) => {
        const blob = document.createElement('div');
        blob.className = `floating-blob ${cls}`;
        document.body.appendChild(blob);
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.hero, .skills-category-card, .featured-card, .project-card, ' +
        '.intro-profile, .timeline-item, .interest-card, .stat-card, .contact-form'
    );

    elements.forEach((el, i) => {
        el.classList.add('reveal');
        el.dataset.revealIndex = String(i % 6);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initNavHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `./${currentPage}` || href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
