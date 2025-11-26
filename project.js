/* ===============================
   STICKY HEADER SHADOW ON SCROLL
================================*/
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
    } else {
        header.style.boxShadow = "none";
    }
});

/* ===============================
   SMOOTH SCROLLING FOR NAV LINKS
================================*/
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });
});

/* ===============================
   HERO TEXT TYPING EFFECT
================================*/
const typingText = document.querySelector(".hero-text h3");
const words = ["Science Student", "Web Designer", "Learner", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    typingText.textContent = displayedText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 120);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 80);
    } else {
        if (!isDeleting) {
            setTimeout(() => isDeleting = true, 1000);
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 120);
    }
}
typeEffect();

/* ===============================
   FADE-IN ANIMATION ON SCROLL
================================*/
const sections = document.querySelectorAll("section");

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
    });
}, appearOptions);

sections.forEach(section => {
    section.classList.add("hidden");
    appearOnScroll.observe(section);
});

/* ===============================
   PROJECT POPUP DETAILS
================================*/
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        alert(`Project: ${card.querySelector("h3").textContent}
        
Details: ${card.querySelector("p").textContent}`);
    });
});

/* ===============================
   SKILL CARD HOVER SOUND EFFECT
================================*/
const skillCards = document.querySelectorAll(".skill-card");

const beep = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3"
);

skillCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        beep.volume = 0.2;
        beep.play();
    });
});

/* ===============================
   BACK TO TOP BUTTON
================================*/
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 15px";
topBtn.style.fontSize = "20px";
topBtn.style.background = "#007bff";
topBtn.style.color = "#fff";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
