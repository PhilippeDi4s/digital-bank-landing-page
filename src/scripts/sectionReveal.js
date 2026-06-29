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

      // Por padrão, o "grupo" de delay é a section/footer inteira.
      // Se um groupSelector for passado, o delay é calculado dentro
      // do grupo mais próximo que casar com ele — isso evita que um
      // bloco independente (ex: footer-content__right) acumule o
      // delay de TODOS os itens que vieram antes dele no DOM.
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

// Seções "normais" — sempre têm conteúdo abaixo, então a margem
// negativa de baixo (-12%) funciona bem, dando tempo do elemento
// subir suavemente antes de revelar.
const regularRevealGroups = [
  ".benefits-section .content-block",
  ".article-section > .heading",
  ".article-container",
];

createRevealObserver(gsap.utils.toArray(regularRevealGroups.join(", ")), {
  threshold: 0.22,
  rootMargin: "0px 0px -12% 0px",
});

// Footer — é a ÚLTIMA seção da página, não existe scroll restante
// abaixo dela. Por isso usa threshold/rootMargin bem mais permissivos,
// sem a margem negativa (que cortaria os itens mais perto do fim real
// do documento, impedindo-os de jamais atingir o ratio mínimo).
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
