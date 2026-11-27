
// ================================
// THEME TOGGLE
// ================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
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
}


// ================================
// AUTOMATIC COPYRIGHT YEAR
// ================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ================================
// LOAD YAML DATA
// ================================

async function loadData(file) {
    const response = await fetch(`./data/${file}`);

    if (!response.ok) {
        throw new Error(`Could not load ${file}: ${response.status}`);
    }

    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}


// ================================
// LOAD HOMEPAGE
// ================================

async function loadHome() {
    try {
        const home = await loadData("home.yml");

        const eyebrow = document.querySelector("#home .eyebrow");
        const heading = document.querySelector("#home h1");
        const subtitle = document.querySelector("#home h2");
        const description = document.querySelector("#home .hero-description");
        const primaryButton = document.querySelector("#home .button.primary");
        const secondaryButton = document.querySelector("#home .button.secondary");

        if (eyebrow) {
            eyebrow.textContent = home.eyebrow || "";
        }

        if (heading) {
    const nameSpan = heading.querySelector("span");

    if (nameSpan && home.heading) {
        const parts = home.heading.split("Shayan Abdullah.");

        if (parts.length === 2) {
            heading.firstChild.textContent = parts[0];
            nameSpan.textContent = "Shayan Abdullah.";
        } else {
            heading.textContent = home.heading;
        }
    } else {
        heading.textContent = home.heading || "";
    }
}

        if (subtitle) {
            subtitle.textContent = home.subtitle || "";
        }

        if (description) {
            description.textContent = home.description || "";
        }

        if (primaryButton && home.primary_button) {
            primaryButton.textContent = home.primary_button.text || "";
            primaryButton.href = home.primary_button.link || "#";
        }

        if (secondaryButton && home.secondary_button) {
            secondaryButton.textContent = home.secondary_button.text || "";
            secondaryButton.href = home.secondary_button.link || "#";
        }

    } catch (error) {
        console.error("Homepage loading error:", error);
    }
}


// ================================
// LOAD ABOUT ME
// ================================

async function loadProfile() {
    try {
        const profile = await loadData("profile.yml");

        const introduction = document.getElementById("profile-introduction");
        const biography = document.getElementById("profile-biography");
        const interests = document.getElementById("profile-interests");

        if (introduction) {
            introduction.textContent = profile.introduction || "";
        }

        if (biography) {
            biography.textContent = profile.biography || "";
        }

        if (interests && Array.isArray(profile.interests)) {
            interests.replaceChildren();

            profile.interests.forEach((interest) => {
                const item = document.createElement("li");
                item.textContent = interest;
                interests.appendChild(item);
            });
        }

    } catch (error) {
        console.error("Profile loading error:", error);
    }
}


// ================================
// START WEBSITE CONTENT LOADING
// ================================

loadHome();
loadProfile();
