import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------
// Reveal genérico de seções ao entrar na viewport
// ---------------------------------------------------------------------

function createRevealObserver(elements, observerOptions, groupSelector) {
  if (!elements.length) return;

  elements.forEach((element) => {
    element.classList.add("scroll-reveal");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const group = groupSelector
        ? (entry.target.closest(groupSelector) ??
          entry.target.closest("section, footer") ??
          document.body)
        : (entry.target.closest("section, footer") ?? document.body);

      const groupItems = elements.filter((element) => {
        const elementGroup = groupSelector
          ? (element.closest(groupSelector) ??
            element.closest("section, footer") ??
            document.body)
          : (element.closest("section, footer") ?? document.body);
        return elementGroup === group;
      });
      const index = groupItems.indexOf(entry.target);

      entry.target.style.setProperty(
        "--reveal-delay",
        `${Math.max(index, 0) * 120}ms`,
      );
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  elements.forEach((element) => observer.observe(element));
}

const regularRevealGroups = [
  ".benefits-section .content-block",
  ".article-section > .heading",
  ".article-container",
];

createRevealObserver(gsap.utils.toArray(regularRevealGroups.join(", ")), {
  threshold: 0.22,
  rootMargin: "0px 0px -12% 0px",
});

const footerRevealGroups = [
  ".footer-content__left",
  ".footer-nav__item",
  ".footer-content__right",
];

createRevealObserver(
  gsap.utils.toArray(footerRevealGroups.join(", ")),
  {
    threshold: 0,
    rootMargin: "0px",
  },
  ".footer-content__left, .footer-nav__list, .footer-content__right",
);
