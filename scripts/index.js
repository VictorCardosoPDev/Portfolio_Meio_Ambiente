const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-links a");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((a) => {
                a.classList.remove("active");
                if (a.getAttribute("href").includes(current)) {
                    a.classList.add("active");
                }
            });
        });

const textElement = document.getElementById("changing-text");
const words = ["Tecnologia", "Saúde", "Meio Ambiente"]; 

let currentIndex = 0;

function updateText() {
    
    textElement.style.opacity = 0;
    textElement.style.transform = "translateY(5px)";

    setTimeout(() => {
        // Troca apenas a palavra inicial
        currentIndex = (currentIndex + 1) % words.length;
        textElement.textContent = words[currentIndex];

        // Efeito de entrada
        textElement.style.opacity = 1;
        textElement.style.transform = "translateY(0)";
    }, 500);
}

setInterval(updateText, 3000);

// 2. Lógica dos Modais
function openModal(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttonLeft = document.getElementById('slideLeft');
    const buttonRight = document.getElementById('slideRight');
    const track = document.getElementById('carouselTrack');
    
    // Elementos para o filtro
    const carouselItems = document.querySelectorAll('.carousel-item');
    const projectCards = document.querySelectorAll('.project-item');

    // Lógica de rolagem das setas
    if(buttonLeft && buttonRight && track) {
        buttonLeft.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
        });

        buttonRight.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // Lógica de clique para filtrar os projetos
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Remove a classe 'active' de todos os itens do carrossel e adiciona no clicado
            carouselItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. Pega o valor do data-filter do item clicado
            const targetCategory = item.getAttribute('data-filter');

            // 3. Mostra ou esconde os cards baseados na categoria
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (targetCategory === 'todos' || targetCategory === cardCategory) {
                    card.style.display = 'block'; // Mostra o card
                    
                    // Reinicia a animação CSS para dar o efeito visual toda vez que clica
                    card.style.animation = 'none';
                    card.offsetHeight; // Força o reflow do navegador
                    card.style.animation = null; 
                } else {
                    card.style.display = 'none'; // Esconde os outros
                }
            });
        });
    });
});