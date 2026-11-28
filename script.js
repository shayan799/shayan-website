
// ================================
// THEME TOGGLE
// ================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
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
            const name = "Shayan Abdullah.";
            const nameSpan = heading.querySelector("span");

            if (nameSpan && home.heading && home.heading.endsWith(name)) {
                heading.firstChild.textContent = home.heading.slice(0, -name.length);
                nameSpan.textContent = name;
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
// LOAD INTERESTS
// ================================

async function loadInterests() {
    try {
        const data = await loadData("interests.yml");
        const container = document.getElementById("interests-container");

        if (!container || !data || !Array.isArray(data.items)) {
            return;
        }

        container.replaceChildren();

        data.items.forEach((interest) => {
            if (interest.visible === false) {
                return;
            }

            const card = document.createElement("article");
            card.className = "interest-card";

            // Cover image
            if (interest.cover) {
                card.style.backgroundImage = `url("${interest.cover}")`;
            }

            // Optional logo
            if (interest.show_logo && interest.logo) {
                const logo = document.createElement("img");

                logo.className = "interest-card-logo";
                logo.src = interest.logo;
                logo.alt = "";

                const allowedPositions = [
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right"
                ];

                const position = allowedPositions.includes(interest.logo_position)
                    ? interest.logo_position
                    : "top-right";

                logo.classList.add(`logo-${position}`);

                card.appendChild(logo);
            }

            // Text container
            const textContainer = document.createElement("div");
            textContainer.className = "interest-card-content";

            // Optional upper text
            if (interest.upper_text) {
                const upperText = document.createElement("p");

                upperText.className = "interest-card-upper";
                upperText.textContent = interest.upper_text;

                textContainer.appendChild(upperText);
            }

            // Main heading
            const title = document.createElement("h3");

            title.className = "interest-card-title";
            title.textContent = interest.title || "";

            textContainer.appendChild(title);
            card.appendChild(textContainer);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Interests loading error:", error);
    }
}


// ================================
// START WEBSITE CONTENT LOADING
// ================================

loadHome();
loadProfile();
loadInterests();
