// ============================================
// ROBIN SARKAR — PORTFOLIO SCRIPT
// ============================================
 
console.log("Portfolio script loaded ✅ — Robin Sarkar");
 
// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
 
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (hasMouse && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Swap to the custom cursor only once the mouse has actually moved
        if (!document.body.classList.contains("has-cursor")) {
            ringX = mouseX; ringY = mouseY;
            document.body.classList.add("has-cursor");
        }
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
    const applyTheme = (isDark) => {
        document.body.classList.toggle("dark-mode", isDark);
        themeToggle.textContent = isDark ? "☀️" : "🌙";
    };

    // Remember the choice between visits
    let savedTheme = null;
    try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
    applyTheme(savedTheme === "dark");

    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
        try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
        console.log(`Theme → ${isDark ? "dark" : "light"}`);
    });
}
 
// ============================================
// NAV — scroll shadow + mobile hamburger
// ============================================
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav__links");
 
const scrollProgress = document.getElementById("scrollProgress");

function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    if (scrollProgress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (hamburger && navLinks) {
    const setMenu = (open) => {
        navLinks.classList.toggle("open", open);
        hamburger.setAttribute("aria-expanded", open);
        hamburger.textContent = open ? "✕" : "☰";
    };
    hamburger.addEventListener("click", () => {
        setMenu(!navLinks.classList.contains("open"));
    });
    navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => setMenu(false));
    });
}

// Highlight the nav link for the section currently on screen
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const link = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (link) link.classList.toggle("active", entry.isIntersecting);
    });
}, { rootMargin: "-45% 0px -55% 0px" });

document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));
 
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
if (prefersReducedMotion) {
    if (typeEl) typeEl.textContent = phrases[0];
} else {
    setTimeout(typeLoop, 1500);
}
 
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
            entry.target.querySelectorAll(".skill-card__fill").forEach((bar, i) => {
                const w = bar.getAttribute("data-width");
                setTimeout(() => { bar.style.width = w + "%"; }, 200 + i * 90);
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
        link: "https://github.com/robinsarkar121/My-Personal-Website",
        tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    },
    {
        title: "Venture Ecosystem Web Scraper",
        description: "Built during my internship at Plum Alley. Collects and structures venture ecosystem data — people, firms, and programs — to surface high-value introduction pathways for deal sourcing.",
        tags: ["Python", "Web Scraping", "Data"],
    },
    {
        title: "Relationship-Mapping Platform",
        description: "A CRM-ready tool, also built at Plum Alley, that turns raw investor research into a structured map of connections, helping convert them into warm, thesis-aligned deal introductions.",
        tags: ["Python", "CRM", "Research Tooling"],
    },
    // Uncomment and fill in when you build more (link is optional):
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
 
        card.append(title, desc, tagList);

        if (project.link) {
            const link = document.createElement("a");
            link.className = "project-card__link";
            link.href = project.link;
            link.textContent = "View project →";
            if (project.link.startsWith("http")) {
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener");
            }
            card.append(link);
        }

        // Glow follows the mouse across the card
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            card.style.setProperty("--my", `${e.clientY - rect.top}px`);
        });

        grid.appendChild(card);
    });
 
    console.log(`Rendered ${projects.length} project(s) ✅`);
}
 
// ============================================
// FOOTER YEAR
// ============================================
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
 