document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("mascotGreeting");
  const greetings = [
    "Hello! Ready to begin?",
    "こんにちは! 一緒に学ぼう!",
    "你好! 一起学习吧!"
  ];

  let greetingIndex = 0;

  if (greetingElement && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      greetingElement.classList.add("is-changing");

      window.setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        greetingElement.textContent = greetings[greetingIndex];
        greetingElement.classList.remove("is-changing");
      }, 180);
    }, 3200);
  }

  const revealElements = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -40px"
  });

  revealElements.forEach(element => observer.observe(element));
});
