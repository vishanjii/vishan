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
    const current = words[index];
    const display = current.substring(0, char);
    typingText.innerHTML = display + '<span class="cursor">|</span>';

    if (!deleting && char < current.length) char++;
    else if (deleting && char > 0) char--;
    else if (!deleting && char === current.length) {
        deleting = true;
        setTimeout(type, 1000);
        return;
    } else if (deleting && char === 0) {
        deleting = false;
        index = (index + 1) % words.length;
    }

    setTimeout(type, deleting ? 80 : 150);
}
type();

/* ===== FADE-IN SECTIONS ON SCROLL ===== */
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100) {
            setTimeout(() => section.classList.add("visible"), i * 150); // stagger effect
        }
    });
});

/* ===== PROJECT MODAL POPUP ===== */
const modal = document.createElement("div");
modal.id = "project-modal";
modal.style.cssText = `
    position: fixed; top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.7); display:flex;
    justify-content:center; align-items:center;
    visibility:hidden; opacity:0; transition:0.3s;
    z-index: 9999;
`;
const modalContent = document.createElement("div");
modalContent.style.cssText = `
    background:white; padding:25px; border-radius:10px;
    max-width:500px; text-align:center; position:relative;
`;
const closeBtn = document.createElement("span");
closeBtn.innerHTML = "&times;";
closeBtn.style.cssText = `
    position:absolute; top:10px; right:15px; cursor:pointer;
    font-size:1.5rem; font-weight:bold;
`;
modalContent.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

closeBtn.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
});

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        modalContent.innerHTML = closeBtn.outerHTML + `<h3>${card.querySelector("h3").textContent}</h3>
            <p>${card.querySelector("p").textContent}</p>`;
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
    });

    // Random color hover effect
    card.addEventListener("mouseenter", () => {
        card.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 85%)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.backgroundColor = "";
    });
});

/* ===== SKILL HOVER ANIMATION & SOUND ===== */
const beep = new Audio("https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3");
document.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        beep.volume = 0.2;
        beep.play();
        const bar = document.createElement("div");
        bar.className = "skill-bar-anim";
        bar.style.cssText = `
            height:8px; background:#00bcd4; width:0; border-radius:4px; margin-top:10px;
            transition: width 1s ease;
        `;
        if(!card.querySelector(".skill-bar-anim")) card.appendChild(bar);
        setTimeout(() => bar.style.width = "100%", 50);
    });
    card.addEventListener("mouseleave", () => {
        const bar = card.querySelector(".skill-bar-anim");
        if(bar) bar.remove();
    });
});

/* ===== BACK TO TOP BUTTON ===== */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.className = "top-button";
Object.assign(topBtn.style, {
    position: "fixed", bottom: "20px", right: "20px",
    padding: "10px 15px", borderRadius: "50%", display: "none", zIndex: "999"
});
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== PARALLAX HERO IMAGE ===== */
const heroImg = document.querySelector(".profile-img");
window.addEventListener("scroll", () => {
    if(heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

/* ===== ANIMATED NUMBER COUNTERS ===== */
const counters = document.querySelectorAll(".counter"); // Add <span class="counter" data-target="100">0</span> in HTML where needed
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 200; // speed
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

/* ===== MOUSE-TRACKING FLOATING PARTICLES ===== */
const particleContainer = document.createElement("div");
particleContainer.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    pointer-events:none; z-index: 1000;
`;
document.body.appendChild(particleContainer);

document.addEventListener("mousemove", e => {
    const particle = document.createElement("div");
    particle.style.cssText = `
        position:absolute; width:8px; height:8px; background: #00bcd4;
        border-radius:50%; top:${e.clientY}px; left:${e.clientX}px;
        opacity:0.8; pointer-events:none; transition: all 0.6s ease-out;
    `;
    particleContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
});
