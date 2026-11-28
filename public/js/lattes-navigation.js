const navbar = document.querySelector(".navbar");
const menu = document.getElementById("fo-menu");
const toggle = navbar.querySelector(".navbar-toggle");

toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("in");
    toggle.setAttribute("aria-expanded", String(isOpen));
});

navbar.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.offsetParent && menu.classList.contains("in")) {
        menu.classList.remove("in");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
    }
});

function updateNavbar() {
    navbar.classList.toggle("navbar-shrink", window.scrollY > 75);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();
