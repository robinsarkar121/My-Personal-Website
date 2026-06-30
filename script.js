// ============================================
// ROBIN SARKAR — PORTFOLIO SCRIPT
// ============================================
 
console.log("Portfolio script loaded ✅ — Robin Sarkar");
 
// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
 
if (window.innerWidth > 900 && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
 
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });
 
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();
}
 
// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.querySelector("#theme-toggle");
 
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        console.log(`Theme → ${isDark ? "dark" : "light"}`);
    });
}
 
// ============================================
// NAV — scroll shadow + mobile hamburger
// ============================================
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav__links");
 
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
});
 
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
}
 
// ============================================
// TYPEWRITER EFFECT
// ============================================
const phrases = [
    "Aspiring full-stack developer.",
    "Building for the web — one commit at a time.",
    "HTML × CSS × JavaScript.",
    "Student. Gamer. Creator.",
];
 
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById("typewriter");
 
function typeLoop() {
    if (!typeEl) return;
    const current = phrases[phraseIdx];
    if (deleting) {
        typeEl.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; charIdx = 0; setTimeout(typeLoop, 500); return; }
        setTimeout(typeLoop, 40);
    } else {
        typeEl.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
        setTimeout(typeLoop, 65);
    }
}
setTimeout(typeLoop, 1500);
 
// ============================================
// SCROLL REVEAL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
 
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
 
// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll(".skill-card__fill").forEach(bar => {
                const w = bar.getAttribute("data-width");
                setTimeout(() => { bar.style.width = w + "%"; }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
 
const skillsGrid = document.querySelector(".skills-grid");
if (skillsGrid) skillObserver.observe(skillsGrid);
 
// ============================================
// PROJECTS — rendered from JS array
// ============================================
const projects = [
    {
        title: "Personal Portfolio",
        description: "This very site — built from scratch using semantic HTML5, modern CSS (custom properties, Grid, Flexbox), and vanilla JavaScript. My first cohort lab turned into something I'm genuinely proud of.",
        link: "#",
        tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    },
    // Uncomment and fill in when you build more:
    // {
    //     title: "Next Project",
    //     description: "Description of the next thing I build.",
    //     link: "https://github.com/yourusername/project",
    //     tags: ["JavaScript", "DOM"],
    // },
];
 
const grid = document.querySelector("#projects-grid");
 
if (grid) {
    projects.forEach((project, i) => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.style.animationDelay = `${i * 0.15}s`;
 
        const title = document.createElement("h3");
        title.textContent = project.title;
 
        const desc = document.createElement("p");
        desc.textContent = project.description;
 
        const tagList = document.createElement("div");
        tagList.className = "project-card__tags";
        project.tags.forEach(label => {
            const tag = document.createElement("span");
            tag.className = "project-card__tag";
            tag.textContent = label;
            tagList.appendChild(tag);
        });
 
        const link = document.createElement("a");
        link.className = "project-card__link";
        link.href = project.link;
        link.textContent = "View project →";
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
 
        card.append(title, desc, tagList, link);
        grid.appendChild(card);
    });
 
    console.log(`Rendered ${projects.length} project(s) ✅`);
}
 
// ============================================
// FOOTER YEAR
// ============================================
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
 