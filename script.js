
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

// Load profile content from Decap CMS
async function loadProfile() {
    try {
        const response = await fetch("./_data/profile.yml");

        if (!response.ok) {
            throw new Error("Could not load profile.yml");
        }

        const yamlText = await response.text();
        const profile = jsyaml.load(yamlText);

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

loadProfile();
