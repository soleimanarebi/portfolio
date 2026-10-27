(() => {
  // figure lightbox
  const lb = document.getElementById("lightbox");
  if (lb) {
    document.querySelectorAll(".fig img").forEach((img) => {
      img.addEventListener("click", () => {
        lb.querySelector("img").src = img.src;
        lb.querySelector("img").alt = img.alt;
        lb.hidden = false;
      });
    });
    lb.addEventListener("click", () => { lb.hidden = true; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });
  }

  // grow result bars when they scroll into view
  const fills = document.querySelectorAll(".fill[data-w]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.w + "%";
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  fills.forEach((f) => io.observe(f));
})();
