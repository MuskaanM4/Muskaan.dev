document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initStatCounters();
    initVibeTags();
    initTimelineToggle();
    initInterestCards();
});

function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'Code by day, chaos by night ✨',
        'Professional bug creator 🐛',
        'Dog mom × 4 🐾',
        'Powered by cake & caffeine 🍰'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = phrases[phraseIndex];

        if (!deleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(type, deleting ? 40 : 80);
    }

    type();
}

function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach((card) => {
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl) return;

        const target = parseInt(numberEl.dataset.target, 10);
        const suffix = numberEl.dataset.suffix || '';

        card.addEventListener('click', () => {
            card.classList.add('stat-bump');
            setTimeout(() => card.classList.remove('stat-bump'), 300);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(numberEl, target, suffix);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(card);
    });
}

function animateCounter(el, target, suffix) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current + suffix;
    }, 40);
}

function initVibeTags() {
    const tags = document.querySelectorAll('.vibe-tag');
    const vibeDisplay = document.getElementById('vibeDisplay');

    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            tags.forEach((t) => t.classList.remove('active'));
            tag.classList.add('active');

            if (vibeDisplay) {
                const emoji = tag.dataset.emoji || '✨';
                const msg = tag.dataset.msg || tag.textContent;
                vibeDisplay.innerHTML = `${emoji} <strong>${msg}</strong>`;
                vibeDisplay.classList.remove('vibe-bounce');
                void vibeDisplay.offsetWidth;
                vibeDisplay.classList.add('vibe-bounce');
            }
        });
    });
}

function initTimelineToggle() {
    document.querySelectorAll('.timeline-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.timeline-link')) return;

            const wasExpanded = item.classList.contains('expanded');
            item.closest('.timeline')
                .querySelectorAll('.timeline-item')
                .forEach((i) => i.classList.remove('expanded'));

            if (!wasExpanded) {
                item.classList.add('expanded');
            }
        });
    });
}

function initInterestCards() {
    document.querySelectorAll('.interest-card').forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');

            const sparkle = card.querySelector('.card-sparkle');
            if (sparkle) {
                sparkle.textContent = ['✨', '💖', '🌸', '⭐', '🎀'][
                    Math.floor(Math.random() * 5)
                ];
            }
        });
    });
}
