import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSection = document.querySelector(".hero_section");
const heroBg = document.querySelector(".hero_bg");
const phonePosition = document.querySelector(".phone-zoom-position");
const phoneWrapper = document.querySelector("#cellphone-bottom-wrapper");
const phoneGradient = document.querySelector(".phone-zoom-gradient");
const phoneLogo = document.querySelector(".phone-zoom-logo");
const phoneParts = gsap.utils.toArray(
  "#cellphone-left, #cellphone-top, #cellphone-right",
);
const heroContent = document.querySelector(".hero-content");
const header = document.querySelector(".header");

if (
  heroSection &&
  heroBg &&
  phonePosition &&
  phoneWrapper &&
  phoneGradient &&
  phoneLogo
) {
  const mm = gsap.matchMedia();
  const getPhoneWidth = () => phoneWrapper.offsetWidth || 180;
  const getHeaderOffset = () => (header?.offsetHeight ?? 0) + 24;

  // Estado inicial compartilhado entre todos os breakpoints
  gsap.set(phoneWrapper, {
    transformOrigin: "30% 58%",
    force3D: true,
  });

  gsap.set(phoneGradient, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: "50% 50%",
  });

  gsap.set(phoneLogo, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    scale: 1,
  });

  mm.add(
    {
      isMobile: "(max-width: 47.99rem)",
      isTablet: "(min-width: 48rem) and (max-width: 63.99rem)",
      isDesktop: "(min-width: 64rem)",
    },
    (context) => {
      const { isTablet, isDesktop } = context.conditions;

      gsap.set(heroSection, { overflow: "hidden" });
      gsap.set(phonePosition, {
        animation: "none",
        clearProps: "rotation,width,height",
        xPercent: -50,
        x: 0,
        y: 0,
        scale: 1,
      });
      gsap.set(phoneWrapper, {
        rotate: 0,
        scale: 1,
        borderRadius: isDesktop ? 34 : 24,
      });
      gsap.set(phoneParts, {
        animation: "none",
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
      gsap.set(heroContent, { autoAlpha: 1, x: 0, y: 0 });

      // ---------------------------------------------------------------
      // DESKTOP — celular gira 90° e ocupa lateralmente a tela
      // ---------------------------------------------------------------
      if (isDesktop) {
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
          .to(phoneParts, {
            autoAlpha: 0,
            scale: 0.72,
            x: 120,
            duration: 0.18,
          })
          .to(heroContent, { autoAlpha: 0, x: -90, duration: 0.24 }, "<")
          .to(
            phoneWrapper,
            { rotate: 90, duration: 0.24, ease: "power2.inOut" },
            0.24,
          )
          .to(
            phoneLogo,
            {
              rotate: -90,

              x: () => -getPhoneWidth() * 0.04,
              y: -30, // ajuste fino

              scale: () => {
                const phoneScale = Math.max(
                  window.innerWidth / phoneWrapper.offsetWidth,
                  window.innerHeight / phoneWrapper.offsetHeight,
                );

                return phoneScale * 0.2;
              },

              duration: 0.68,
              ease: "power1.inOut",
            },
            0.46,
          )
          .to(
            phonePosition,
            {
              x: () => {
                const rect = phonePosition.getBoundingClientRect();
                return window.innerWidth / 2 - (rect.left + rect.width / 2);
              },

              y: () => {
                const rect = phoneWrapper.getBoundingClientRect();

                return getHeaderOffset() - rect.top;
              },

              scale: () => {
                const scaleX = window.innerWidth / phoneWrapper.offsetWidth;
                const scaleY = window.innerHeight / phoneWrapper.offsetHeight;

                return Math.max(scaleX, scaleY) * 1.05;
              },

              duration: 0.68,
              ease: "power1.inOut",
            },
            0.46,
          )
          .to(
            heroBg,
            { xPercent: -18, duration: 0.28, ease: "power1.in" },
            0.82,
          );

        return () => {
          timeline.kill();
          gsap.set(
            [
              heroSection,
              heroBg,
              phonePosition,
              phoneWrapper,
              phoneGradient,
              phoneLogo,
              heroContent,
              ...phoneParts,
            ],
            { clearProps: "all" },
          );
        };
      }

      // ---------------------------------------------------------------
      // MOBILE e TABLET — celular permanece vertical e só cresce
      // (tablet recebe tempos mais longos pra dar espaço de leitura)
      // ---------------------------------------------------------------
      const contentReadDuration = isTablet ? 0.42 : 0.24;
      const zoomStart = isTablet ? 0.5 : 0.28;
      const holdBeforeStart = isTablet ? 0.3 : 0;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: () => "+=" + heroSection.offsetHeight,
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
        .to(
          phoneParts,
          {
            autoAlpha: 0,
            scale: 0.76,
            y: -90,
            duration: 0.18,
          },
          holdBeforeStart,
        )
        .to(
          heroContent,
          { autoAlpha: 0, y: 80, duration: contentReadDuration },
          holdBeforeStart + 0.08,
        )
        .to(
          phonePosition,
          {
            y: () =>
              -(phonePosition.getBoundingClientRect().top - getHeaderOffset()),
            scale: () => Math.max(window.innerWidth / getPhoneWidth(), 1) * 7,
            duration: 0.72,
            ease: "power1.inOut",
          },
          zoomStart,
        )
        .to(phoneWrapper, { borderRadius: 0, duration: 0.72 }, zoomStart)
        .to(phoneGradient, { scale: 1.18, duration: 0.72 }, zoomStart)
        .to(
          phoneLogo,
          {
            x: () => -getPhoneWidth() * -1,
            scale: () => (window.innerWidth / phoneLogo.offsetWidth) * 1.5,
            duration: 0.72,
            ease: "power1.inOut",
          },
          zoomStart,
        )
        .to(
          heroBg,
          { yPercent: -22, duration: 0.28, ease: "power1.in" },
          holdBeforeStart + 1.18,
        );

      return () => {
        timeline.kill();
        gsap.set(
          [
            heroSection,
            heroBg,
            phonePosition,
            phoneWrapper,
            phoneGradient,
            phoneLogo,
            heroContent,
            ...phoneParts,
          ],
          { clearProps: "all" },
        );
      };
    },
  );
}
