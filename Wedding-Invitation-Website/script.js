
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. SNOWFALL ANIMATION
  // =====================================

  const snow = document.getElementById("snowfall");

  if (snow) {
    const snowflakes = [
      "❄", "✦", "❅", "❄", "✧", "❅",
      "❄", "✦", "❅", "❄", "✧", "❅",
      "❄", "✦", "❅", "❄", "❅", "✧"
    ];

    snowflakes.forEach((glyph, i) => {
      const flake = document.createElement("span");

      flake.className = "snowflake";
      flake.textContent = glyph;

      flake.style.setProperty("--left", `${(i * 47 + 9) % 100}%`);
      flake.style.setProperty("--delay", `${-((i * 2.7) % 18)}s`);
      flake.style.setProperty("--duration", `${13 + (i % 7) * 2}s`);
      flake.style.setProperty("--drift", `${((i * 29) % 120) - 60}px`);
      flake.style.setProperty("--size", `${17 + (i % 5) * 3}px`);

      snow.appendChild(flake);
    });
  }

  // =====================================
  // 2. BACKGROUND MUSIC
  // =====================================

  const musicButton = document.getElementById("musicToggle");
  const audio = document.getElementById("weddingAudio");

  let musicOn = false;

  function toggleMusic(on) {
    if (!musicButton || !audio) return;

    musicOn = on;

    musicButton.setAttribute("aria-pressed", String(on));
    musicButton.classList.toggle("is-playing", on);

    const musicLabel = musicButton.querySelector(".music-label");

    if (musicLabel) {
      musicLabel.textContent = on
        ? "RIVER IN FLOW · ON"
        : "RIVER IN FLOW · OFF";
    }

    if (on) {
      audio.volume = 0.55;

      audio.play().catch(() => {
        musicOn = false;

        musicButton.setAttribute("aria-pressed", "false");
        musicButton.classList.remove("is-playing");

        if (musicLabel) {
          musicLabel.textContent = "RIVER IN FLOW · TAP TO PLAY";
        }
      });
    } else {
      audio.pause();
    }
  }

  if (musicButton && audio) {
    musicButton.addEventListener("click", () => {
      toggleMusic(!musicOn);
    });
  }

  window.toggleWeddingMusic = toggleMusic;


  // =====================================
  // 3. OPEN WEDDING INVITATION
  // =====================================

  const welcome = document.getElementById("welcome");
  const openButton = document.getElementById("openInvitation");

  if (welcome && openButton) {

    function openSite() {

      if (welcome.classList.contains("is-opening")) return;

      welcome.classList.add("is-opening");
      document.body.classList.add("has-opened");

      // Start music after user interaction
      toggleMusic(true);

      // Remove welcome overlay after opening animation
      setTimeout(() => {

        welcome.hidden = true;
        welcome.style.display = "none";
        welcome.style.pointerEvents = "none";

        document.body.classList.remove("has-welcome");

        const home = document.getElementById("home");

        if (home) {
          home.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

      }, 1100);
    }

    openButton.addEventListener("click", openSite);
  }


  // =====================================
  // 4. WEBSITE LINK INTERACTION
  // =====================================

  // Make sure hidden welcome screen cannot block links
  if (welcome && welcome.hidden) {
    welcome.style.display = "none";
  }

  // Google Maps link
  const mapLink = document.querySelector(".map-link");

  if (mapLink) {
    mapLink.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }


  // =====================================
  // 5. RSVP FORM
  // =====================================

  const rsvpForm = document.getElementById("rsvpForm");

  if (rsvpForm) {

    rsvpForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const guestName =
        rsvpForm.elements["guestName"].value.trim();

      const attendance =
        rsvpForm.elements["attendance"].value;

      const guestCount =
        rsvpForm.elements["guestCount"].value;

      const wish =
        rsvpForm.elements["wish"].value.trim();

      // Validate required fields
      if (!guestName || !attendance || !guestCount) {
        alert("Please complete your name, attendance and number of guests.");
        return;
      }

      const emailAddress = "htetthayapekyaw@gmail.com";

      const subject = encodeURIComponent(
        "Wedding RSVP — K & K"
      );

      const body = encodeURIComponent(
        [
          "Wedding RSVP",
          "",
          `Guest name: ${guestName}`,
          `Attendance: ${attendance}`,
          `Number of guests: ${guestCount}`,
          `Wishes for the couple: ${wish || "(none)"}`,
          "",
          "Thank you!"
        ].join("\n")
      );

      // Current method: open the guest's email application
      window.location.href =
        `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    });
  }


  // =====================================
  // 6. WEDDING COUNTDOWN
  // =====================================

  const countdownTarget =
    new Date("2026-12-05T11:00:00+09:00").getTime();

  const countdownFields = {
    days: document.getElementById("countDays"),
    hours: document.getElementById("countHours"),
    minutes: document.getElementById("countMinutes"),
    seconds: document.getElementById("countSeconds")
  };

  function updateCountdown() {

    const remaining = countdownTarget - Date.now();

    if (remaining <= 0) {

      Object.values(countdownFields).forEach((field) => {
        if (field) field.textContent = "00";
      });

      const heading =
        document.querySelector(".countdown-heading");

      if (heading) {
        heading.textContent =
          remaining < -86400000
            ? "CELEBRATING OUR FOREVER"
            : "TODAY IS THE DAY";
      }

      return;
    }

    const days = Math.floor(remaining / 86400000);

    const hours = Math.floor(
      (remaining % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (remaining % 3600000) / 60000
    );

    const seconds = Math.floor(
      (remaining % 60000) / 1000
    );

    if (countdownFields.days) {
      countdownFields.days.textContent =
        String(days).padStart(2, "0");
    }

    if (countdownFields.hours) {
      countdownFields.hours.textContent =
        String(hours).padStart(2, "0");
    }

    if (countdownFields.minutes) {
      countdownFields.minutes.textContent =
        String(minutes).padStart(2, "0");
    }

    if (countdownFields.seconds) {
      countdownFields.seconds.textContent =
        String(seconds).padStart(2, "0");
    }
  }

  updateCountdown();

  setInterval(updateCountdown, 1000);

});
