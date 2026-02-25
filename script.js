document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });



    // Review form submission
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');

    if (reviewForm && reviewsContainer) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('review-name').value;
            const message = document.getElementById('review-message').value;
            const ratingInput = reviewForm.querySelector('input[name="rating"]:checked');
            const rating = ratingInput ? parseInt(ratingInput.value) : 5;

            // Create stars string
            const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

            // Create review element
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-header">
                    <strong>${name}</strong>
                    <div class="stars">${stars}</div>
                </div>
                <p>"${message}"</p>
                <span class="review-date">Recién publicado</span>
            `;

            // Add to container (at the top)
            reviewsContainer.prepend(reviewCard);

            // Success feedback (Toast)
            const toast = document.getElementById('toast');
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }

            reviewForm.reset();
        });
    }

    // Change header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1rem 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.getElementById('nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }

    // Product Data for Modal
    const productData = {
        golden: {
            title: "Golden Ale Clásica",
            price: "$1.200",
            description: `
                <p>Nuestra Golden Ale es la puerta de entrada perfecta al mundo de la cerveza artesanal. Elaborada con maltas pálidas seleccionadas, ofrece un color dorado brillante y una espuma blanca persistente.</p>
                <p>En boca se percibe un equilibrio sutil entre el dulzor de la malta y un amargor muy suave. Es extremadamente refrescante, ideal para tardes de sol o para acompañar platos ligeros.</p>
                <p><strong>Notas de cata:</strong> Cereales, pan fresco y un toque floral muy ligero al final.</p>
            `,
            images: [
                'assets/img/Birratirada.jpeg',
                'assets/img/Pinta.jpeg',
                'assets/img/PintaMano.jpeg',
                'assets/img/Birra.jpeg'
            ]
        },
        ipa: {
            title: "IPA del Sur",
            price: "$1.500",
            description: `
                <p>Para los amantes de las sensaciones intensas. Nuestra India Pale Ale es una explosión de lúpulo en cada trago. Utilizamos técnicas de Dry-Hopping para potenciar los aromas sin saturar el paladar.</p>
                <p>Presenta un carácter cítrico y resinoso muy marcado, típico de los lúpulos de nuestra región. Su cuerpo es medio y tiene un final seco que te invita a seguir bebiendo.</p>
                <p><strong>Notas de cata:</strong> Pomelo, pino, maracuyá y un amargor firme y elegante.</p>
            `,
            images: [
                'assets/img/Birras.jpeg',
                'assets/img/Pinta.jpeg',
                'assets/img/PintaMano.jpeg',
                'assets/img/neon.jpeg'
            ]
        },
        stout: {
            title: "Stout Nocturna",
            price: "$1.400",
            description: `
                <p>Nuestra cerveza más premiada. Una Stout de cuerpo robusto y color negro profundo, inspirada en las noches estrelladas de la cordillera.</p>
                <p>La combinación de cebadas tostadas y maltas chocolate le otorgan una complejidad única. Es una cerveza cremosa, sedosa y extremadamente reconfortante.</p>
                <p><strong>Notas de cata:</strong> Café espresso, chocolate amargo, regaliz y un sutil fondo ahumado.</p>
            `,
            images: [
                'assets/img/Birratirada2.jpeg',
                'assets/img/Pinta.jpeg',
                'assets/img/PintaMano.jpeg',
                'assets/img/Birras.jpeg'
            ]
        }
    };

    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

    const openModal = (productId) => {
        const data = productData[productId];
        if (!data) return;

        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-price').innerText = data.price;
        document.getElementById('modal-description').innerHTML = data.description;

        const mainImg = document.getElementById('main-modal-img');
        mainImg.style.backgroundImage = `url('${data.images[0]}')`;

        const thumbGrid = document.getElementById('modal-thumbnails');
        thumbGrid.innerHTML = '';
        data.images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumb ${index === 0 ? 'active' : ''}`;
            thumb.style.backgroundImage = `url('${img}')`;
            thumb.addEventListener('click', () => {
                mainImg.style.backgroundImage = `url('${img}')`;
                thumbGrid.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbGrid.appendChild(thumb);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Attach listeners to "Conocer mas" buttons
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = card.querySelector('.btn-buy');
        const productId = card.getAttribute('data-product');
        if (btn && productId) {
            // Replace existing alert listeners
            btn.onclick = (e) => {
                e.stopPropagation();
                openModal(productId);
            };
        }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
