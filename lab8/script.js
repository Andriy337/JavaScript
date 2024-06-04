document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const carousels = document.querySelectorAll('.carousel');

    
    function updateImages() {
        const screenWidth = window.innerWidth;
        const images = document.querySelectorAll('.slide img');

        images.forEach(img => {
            const mediumSrc = img.getAttribute('data-src-medium');
            const largeSrc = img.getAttribute('data-src-large');

            if (screenWidth < 768) {
                img.src = mediumSrc;
            } else {
                img.src = largeSrc;
            }
        });
    }

    
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        const src = img.src;
        img.setAttribute('data-src-large', src);
    });

    window.addEventListener('resize', updateImages);
    updateImages();

    carousels.forEach(carousel => {
        const slidesContainer = carousel.querySelector('.slides');
        const slides = carousel.querySelectorAll('.slide');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        const indicators = carousel.querySelectorAll('.indicator');

        let currentSlide = 0;
        let slideWidth = slides[0].clientWidth;
        let slideInterval = setInterval(nextSlide, 3000);

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        hamburger.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        prev.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 3000);
        });

        next.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 3000);
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 3000);
            });
        });

        window.addEventListener('resize', () => {
            slideWidth = slides[0].clientWidth;
            slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            updateImages();
        });
    });
});





