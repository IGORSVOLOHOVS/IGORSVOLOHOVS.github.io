document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL ANIMATION LOGIC ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

