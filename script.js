document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const contentSections = document.querySelectorAll(".content-section");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const getBioBtn = document.getElementById("get-bio-btn");
  const bioModal = document.getElementById("bio-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  // --- Gemini API Call for Artist Bio ---
  const getArtistBio = async (artistName) => {
    modalBody.innerHTML = '<div class="loading-spinner"></div>';
    modalTitle.textContent = `About ${artistName}`;
    bioModal.classList.add("visible");

    const prompt = `Write a short, engaging biography (around 100-150 words) for the music artist: ${artistName}. Focus on their musical style, key achievements, and impact on the music industry.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        modalBody.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>`;
      } else {
        modalBody.textContent =
          "Sorry, could not retrieve the biography at this time.";
      }
    } catch (error) {
      console.error("Error fetching artist bio:", error);
      modalBody.textContent =
        "An error occurred while fetching the biography. Please check your connection and try again.";
    }
  };

  getBioBtn.addEventListener("click", () => {
    const artistName = document.querySelector(
      ".profile-section__name"
    ).textContent;
    getArtistBio(artistName);
  });

  modalCloseBtn.addEventListener("click", () => {
    bioModal.classList.remove("visible");
  });
  bioModal.addEventListener("click", (e) => {
    if (e.target === bioModal) {
      bioModal.classList.remove("visible");
    }
  });

  // --- Theme Toggle Logic ---
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = body.dataset.theme === "light";
      if (isLight) {
        body.dataset.theme = "dark";
        themeToggle.innerHTML = "<i class='bx bxs-moon'></i>";
        localStorage.setItem("theme", "dark");
      } else {
        body.dataset.theme = "light";
        themeToggle.innerHTML = "<i class='bx bxs-sun'></i>";
        localStorage.setItem("theme", "light");
      }
    });

    // Check for saved theme in localStorage on page load
    const savedTheme = localStorage.getItem("theme") || "dark";
    body.dataset.theme = savedTheme;
    if (savedTheme === "light") {
      themeToggle.innerHTML = "<i class='bx bxs-sun'></i>";
    } else {
      themeToggle.innerHTML = "<i class='bx bxs-moon'></i>";
    }
  }

  // --- SPA Navigation Logic ---
  const switchTab = (targetId) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.target === targetId);
    });
    contentSections.forEach((section) => {
      if (section.id === targetId) {
        if (!section.classList.contains("active")) {
          section.classList.add("active");
          gsap.from(section, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      } else {
        section.classList.remove("active");
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.dataset.target;
      switchTab(targetId);
    });
  });

  // --- Initial Page Load Animations with GSAP ---
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".logo-anim", { opacity: 0, y: -50, duration: 0.8 })
    .from(
      ".sidebar__nav li",
      { opacity: 0, x: -30, stagger: 0.1, duration: 0.5 },
      "-=0.5"
    )
    .from(".header-anim", { opacity: 0, y: -30, duration: 0.7 })
    .from(".hero-anim", { opacity: 0, scale: 0.95, duration: 0.7 }, "-=0.5")
    .from(".list-anim", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
    .from(
      ".album-item",
      { opacity: 0, y: 20, stagger: 0.05, duration: 0.5 },
      "-=0.4"
    )
    .from(
      ".artist-item",
      { opacity: 0, y: 20, stagger: 0.05, duration: 0.5 },
      "-=0.4"
    )
    .from(".footer-anim", { opacity: 0, y: 50, duration: 0.8 }, "-=0.5");

  // --- Micro-interactions with Anime.js ---
  const buttons = document.querySelectorAll("button, .sidebar__nav a");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () =>
      anime({
        targets: button,
        scale: 1.05,
        duration: 300,
        easing: "easeOutSine",
      })
    );
    button.addEventListener("mouseleave", () =>
      anime({ targets: button, scale: 1, duration: 300, easing: "easeOutSine" })
    );
  });

  const songItems = document.querySelectorAll(".song-item");
  songItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      anime({
        targets: item,
        translateX: 5,
        backgroundColor: "var(--hover-bg)",
        duration: 200,
        easing: "easeOutSine",
      });
    });
    item.addEventListener("mouseleave", () => {
      anime({
        targets: item,
        translateX: 0,
        backgroundColor: "transparent",
        duration: 200,
        easing: "easeOutSine",
      });
    });
  });

  // Set initial active tab
  switchTab("home");
});
