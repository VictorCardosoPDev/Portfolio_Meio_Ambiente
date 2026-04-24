const words = ['Tecnologia', 'Saúde', 'Meio Ambiente'];
let currentIndex = 0;

function updateHeroText() {
    const textElement = document.getElementById('changing-text');

    if (!textElement) {
        return;
    }

    textElement.style.opacity = '0';
    textElement.style.transform = 'translateY(5px)';

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        textElement.textContent = words[currentIndex];
        textElement.style.opacity = '1';
        textElement.style.transform = 'translateY(0)';
    }, 500);
}

function initHeroText() {
    updateHeroText();
    setInterval(updateHeroText, 3000);
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href').includes(current));
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initModalHandlers() {
    const modalButtons = document.querySelectorAll('.project-card[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close');

    modalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

function initCarousel() {
    const buttonLeft = document.getElementById('slideLeft');
    const buttonRight = document.getElementById('slideRight');
    const track = document.getElementById('carouselTrack');

    if (!buttonLeft || !buttonRight || !track) {
        return;
    }

    buttonLeft.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
    });

    buttonRight.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

function initProjectFilter() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const projectCards = document.querySelectorAll('.project-item');

    carouselItems.forEach((item) => {
        item.addEventListener('click', () => {
            carouselItems.forEach((currentItem) => currentItem.classList.remove('active'));
            item.classList.add('active');

            const targetCategory = item.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const cardCategory = card.getAttribute('data-category');
                const visible = targetCategory === 'todos' || targetCategory === cardCategory;

                card.style.display = visible ? 'grid' : 'none';

                if (visible) {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = null;
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroText();
    initCarousel();
    initProjectFilter();
    initModalHandlers();

    window.addEventListener('scroll', setActiveNavLink);
});

const slides = document.querySelectorAll(".slide");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const heroButton = document.querySelector(".hero-btn");

const projectData = [
    {
        title: "Projeto RestaurAPA",
        description: "Restauração ecológica de campos nativos do bioma Pampa.",
        buttonText: "Conheça nossos projetos",
        buttonLink: "#projetos"
    },
    {
        title: "Projeto Nosso Itapuã",
        description: "Controle de espécies invasoras e manejo da vegetação nativa.",
        buttonText: "Conheça nossos projetos",
        buttonLink: "#projetos"
    },
    {
        title: "Projetos Futuros",
        description: "Faça parte desse futuro.",
        buttonText: "Seja um apoiador",
        buttonLink: "#investidor"
    }
];

let currentSlide = 0;

function updateSlide() {
    slides.forEach(slide => slide.classList.remove("active"));

    slides[currentSlide].classList.add("active");

    heroTitle.textContent = projectData[currentSlide].title;
    heroDescription.textContent = projectData[currentSlide].description;

    heroButton.textContent = projectData[currentSlide].buttonText;
    heroButton.setAttribute("href", projectData[currentSlide].buttonLink);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);

setInterval(nextSlide, 5000);