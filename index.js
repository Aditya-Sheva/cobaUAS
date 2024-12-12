document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Reset all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
            
            // Reset animations
            const titles = slide.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
            titles.forEach(el => {
                el.classList.remove('opacity-100');
                el.classList.add('opacity-0', 'translate-y-10');
            });
        });

        dots.forEach(dot => dot.classList.remove('bg-white', 'w-6'));

        // Show current slide
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        dots[index].classList.add('bg-white', 'w-6');

        // Animate content
        const titles = slides[index].querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
        titles.forEach((el, i) => {
            setTimeout(() => {
                el.classList.remove('opacity-0', 'translate-y-10');
                el.classList.add('opacity-100');
            }, (i + 1) * 300);
        });
    }

    // Initial slide
    showSlide(0);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
});

document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        alert(`Mencari produk: ${query}`);
        // Implementasikan logika pencarian produk di sini
    } else {
        alert('Masukkan kata kunci untuk mencari produk!');
    }
});
