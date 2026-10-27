(() => {
  // cursor spotlight
  const spot = document.getElementById("spotlight");
  window.addEventListener("pointermove", (e) => {
    spot.style.setProperty("--x", e.clientX + "px");
    spot.style.setProperty("--y", e.clientY + "px");
  }, { passive: true });

  // highlight the nav entry for the section in view
  const links = [...document.querySelectorAll(".nav a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === "#" + en.target.id));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".main section[id]").forEach((s) => spy.observe(s));
})();
