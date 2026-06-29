document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initProjectModal();
    initProjectCards();
});

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    const countEl = document.getElementById('projectCount');

    if (!filterBtns.length) return;

    function updateCount(visible) {
        if (countEl) {
            countEl.textContent = `Showing ${visible} project${visible !== 1 ? 's' : ''} ✨`;
        }
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visible = 0;

            cards.forEach((card, i) => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;

                if (show) {
                    card.classList.remove('hidden');
                    card.classList.add('card-animate');
                    visible++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('card-animate');
                }
            });

            updateCount(visible);
        });
    });

    updateCount(cards.length);
}

function initProjectModal() {
    const overlay = document.getElementById('projectModal');
    if (!overlay) return;

    const closeBtn = overlay.querySelector('.modal-close');
    const modalTitle = overlay.querySelector('.modal-title');
    const modalDesc = overlay.querySelector('.modal-desc');
    const modalTags = overlay.querySelector('.modal-tech-tags');
    const modalLink = overlay.querySelector('.modal-link');

    document.querySelectorAll('.expand-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');

            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.description;
            modalTags.innerHTML = card.dataset.tags
                .split(',')
                .map((tag) => `<span>${tag.trim()}</span>`)
                .join('');

            const link = card.dataset.link;
            if (link && link !== '#') {
                modalLink.href = link;
                modalLink.classList.remove('modal-link-hidden');
            } else {
                modalLink.classList.add('modal-link-hidden');
            }

            overlay.classList.add('open');
            document.body.classList.add('modal-open');
        });
    });

    function closeModal() {
        overlay.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function initProjectCards() {
    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => card.classList.add('card-raised'));
        card.addEventListener('mouseleave', () => card.classList.remove('card-raised'));
    });
}
