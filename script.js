/* ===== HEADER SHADOW ===== */
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.style.boxShadow = window.scrollY > 50
        ? "0 4px 12px rgba(0,0,0,0.4)"
        : "none";
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* ===== TYPING EFFECT ===== */
const typingText = document.querySelector(".hero-text h3");
const words = ["Science Student", "Web Designer", "Learner", "Tech Enthusiast"];
let index = 0, char = 0, deleting = false;

function type() {
    let current = words[index];
    let display = current.substring(0, char);
    typingText.textContent = display;

    if (!deleting && char < current.length) char++;
    else if (deleting && char > 0) char--;
    else deleting ? (deleting = false, index = (index + 1) % words.length) 
                  : deleting = true;

    setTimeout(type, deleting ? 80 : 150);
}
type();

/* ===== PROJECT POPUP ===== */
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        alert(`Project: ${card.querySelector("h3").textContent}
        
Details: ${card.querySelector("p").textContent}`);
    });
});

/* ===== SKILL HOVER SOUND ===== */
const beep = new Audio("https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3");
document.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        beep.volume = 0.2;
        beep.play();
    });
});

/* ===== BACK TO TOP BUTTON ===== */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.className = "top-button";
document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 15px";
topBtn.style.borderRadius = "50%";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
