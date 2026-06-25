import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSection = document.querySelector(".hero_section");
const heroBg = document.querySelector(".hero_bg");
const phonePosition = document.querySelector(".phone-zoom-position");
const phoneWrapper = document.querySelector("#cellphone-bottom-wrapper");
const phoneGradient = document.querySelector(".phone-zoom-gradient");
const phoneParts = gsap.utils.toArray(
  "#cellphone-left, #cellphone-top, #cellphone-right",
);
const heroContent = document.querySelector(".hero-content");
const header = document.querySelector(".header");

if (heroSection && heroBg && phonePosition && phoneWrapper && phoneGradient) {
  const mm = gsap.matchMedia();
  const getPhoneWidth = () => phoneWrapper.offsetWidth || 180;
  const getHeaderOffset = () => (header?.offsetHeight ?? 0) + 24;

  gsap.set(phoneWrapper, {
    transformOrigin: "30% 58%",
    force3D: true,
  });

  gsap.set(phoneGradient, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: "50% 50%",
  });

  mm.add("(max-width: 63.99rem)", () => {
    gsap.set(heroSection, { overflow: "hidden" });
    gsap.set(phonePosition, {
      animation: "none",
      clearProps: "rotation,width,height",
      xPercent: -50,
      x: 0,
      y: 0,
      scale: 1,
    });
    gsap.set(phoneWrapper, { rotate: 0, scale: 1, borderRadius: 24 });
    gsap.set(phoneParts, { animation: "none", autoAlpha: 1, scale: 1, y: 0 });
    gsap.set(heroContent, { autoAlpha: 1, y: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=70%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => heroSection.classList.add("is-phone-zooming"),
        onEnterBack: () => heroSection.classList.add("is-phone-zooming"),
        onLeave: () => heroSection.classList.remove("is-phone-zooming"),
        onLeaveBack: () => heroSection.classList.remove("is-phone-zooming"),
      },
    });

    timeline
      .to(phoneParts, { autoAlpha: 0, scale: 0.76, y: -90, duration: 0.18 })
      .to(heroContent, { autoAlpha: 0, y: 80, duration: 0.24 }, 0.08)
      .to(
        phonePosition,
        {
          y: () =>
            -(phonePosition.getBoundingClientRect().top - getHeaderOffset()),
          scale: () => Math.max(window.innerWidth / getPhoneWidth(), 1) * 7,
          duration: 0.72,
          ease: "power1.inOut",
        },
        0.28,
      )
      .to(phoneWrapper, { borderRadius: 0, duration: 0.72 }, 0.28)
      .to(phoneGradient, { scale: 1.18, duration: 0.72 }, 0.28)
      .to(heroBg, { yPercent: -22, duration: 0.28, ease: "power1.in" }, 0.78);

    return () => {
      timeline.kill();
      gsap.set(
        [
          heroSection,
          heroBg,
          phonePosition,
          phoneWrapper,
          phoneGradient,
          heroContent,
          ...phoneParts,
        ],
        {
          clearProps: "all",
        },
      );
    };
  });

  mm.add("(min-width: 64rem)", () => {
    gsap.set(heroSection, { overflow: "hidden" });
    gsap.set(phonePosition, {
      animation: "none",
      xPercent: -50,
      x: 0,
      y: 0,
      scale: 1,
    });
    gsap.set(phoneWrapper, { rotate: 0, scale: 1, borderRadius: 34 });
    gsap.set(phoneParts, {
      animation: "none",
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
    });
    gsap.set(heroContent, { autoAlpha: 1, x: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=145%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => heroSection.classList.add("is-phone-zooming"),
        onEnterBack: () => heroSection.classList.add("is-phone-zooming"),
        onLeave: () => heroSection.classList.remove("is-phone-zooming"),
        onLeaveBack: () => heroSection.classList.remove("is-phone-zooming"),
      },
    });

    timeline
      .to(phoneParts, { autoAlpha: 0, scale: 0.72, x: 120, duration: 0.18 })
      .to(heroContent, { autoAlpha: 0, x: -90, duration: 0.24 }, "<")
      .to(
        phoneWrapper,
        { rotate: 90, duration: 0.24, ease: "power2.inOut" },
        0.24,
      )
      .to(
        phonePosition,
        {
          x: () => -window.innerWidth * 0.2,
          y: () => getHeaderOffset() + window.innerHeight * 0.12,
          scale: () => Math.max(window.innerWidth / getPhoneWidth(), 1) * 5.8,
          duration: 0.68,
          ease: "power1.inOut",
        },
        0.46,
      )
      .to(phoneWrapper, { borderRadius: 0, duration: 0.68 }, 0.46)
      .to(phoneGradient, { scale: 1.22, duration: 0.68 }, 0.46)
      .to(heroBg, { xPercent: -18, duration: 0.28, ease: "power1.in" }, 0.82);

    return () => {
      timeline.kill();
      gsap.set(
        [
          heroSection,
          heroBg,
          phonePosition,
          phoneWrapper,
          phoneGradient,
          heroContent,
          ...phoneParts,
        ],
        {
          clearProps: "all",
        },
      );
    };
  });
}

const revealGroups = [
  ".benefits-section .content-block",
  ".article-section > .heading",
  ".article-container",
  ".footer-content__left",
  ".footer-nav__item",
  ".footer-content__right",
];

const revealElements = gsap.utils.toArray(revealGroups.join(", "));

if (revealElements.length) {
  revealElements.forEach((element) => {
    element.classList.add("scroll-reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section =
          entry.target.closest("section, footer") ?? document.body;
        const sectionItems = revealElements.filter((element) => {
          return (
            (element.closest("section, footer") ?? document.body) === section
          );
        });
        const index = sectionItems.indexOf(entry.target);

        entry.target.style.setProperty(
          "--reveal-delay",
          `${Math.max(index, 0) * 120}ms`,
        );
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -12% 0px",
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
