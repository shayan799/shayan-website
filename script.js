
// ================================
// THEME TOGGLE
// ================================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme");

    if (currentTheme === "light") {
        document.body.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀";
    } else {
        document.body.setAttribute("data-theme", "light");
        themeToggle.textContent = "☾";
    }
});


// ================================
// AUTOMATIC COPYRIGHT YEAR
// ================================

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();
