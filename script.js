if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Optional: always start at top on reload
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

document.getElementById("year").textContent = new Date().getFullYear();

const targets = [
  ...document.querySelectorAll(".glass"),
  ...document.querySelectorAll(".section h2"),
  ...document.querySelectorAll(".hero-left"),
  ...document.querySelectorAll(".hero-right")
];

targets.forEach((el, i) => {
  el.classList.add("reveal");
  el.dataset.delay = String((i % 4) + 1);
});

function forceShowVisible(){
  const vh = window.innerHeight || document.documentElement.clientHeight;
  targets.forEach(el => {
    const r = el.getBoundingClientRect();
    // if element is within viewport (with a small buffer), show it
    if (r.top < vh * 0.92 && r.bottom > 0) {
      el.classList.add("show");
    }
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

targets.forEach(el => io.observe(el));

// Critical: handle refresh-while-scrolled + bfcache restores
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    forceShowVisible();
  });
});

window.addEventListener("pageshow", () => {
  // pageshow also fires on back/forward cache restores
  requestAnimationFrame(() => {
    forceShowVisible();
  });
});

window.addEventListener("resize", forceShowVisible);

