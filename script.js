document.getElementById("year").textContent = new Date().getFullYear();

// Add reveal animation to key elements
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

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

targets.forEach(el => io.observe(el));
