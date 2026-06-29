# digital-bank-landing-page-vite

## 1. Visão Geral

**digital-bank-landing-page-vite** é uma landing page estática para o banco digital fictício *Digitalbank*. O projeto apresenta hero com mockups de celular, seção de benefícios, artigos em destaque e rodapé com navegação e redes sociais. Resolve o problema de demonstrar uma interface bancária moderna com animações de scroll avançadas, sem depender de backend ou framework SPA.

**Motivação:** projeto de portfólio e estudo de front-end criado por [Philippe Dias](https://www.diasphilippe.dev.br/). O foco principal é explorar o **GSAP** (GreenSock Animation Platform) em cenários reais — primeiros testes com `ScrollTrigger`, timelines com `scrub`, `pin` e `gsap.matchMedia()` para animações distintas por breakpoint. A landing page serve como laboratório prático para aprender animação baseada em scroll antes de aplicar padrões mais complexos.

**Status do projeto:** em desenvolvimento (`version: 0.0.0`, `private: true`).

**Destaques:**
- **GSAP 3.15.0** — animação do hero (zoom/rotação do celular vinculada ao scroll) e reveal progressivo de seções via `IntersectionObserver`
- **100% responsivo** — layout mobile-first com breakpoints em `48rem` (tablet) e `64rem` (desktop); menu hambúrguer no mobile e navegação horizontal no desktop; animações GSAP adaptadas por viewport (`matchMedia`)

---

## 2. Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| HTML5 | — | Estrutura semântica da landing page (`index.html`) |
| CSS3 | — | Estilos, variáveis CSS, grid/flexbox, media queries (`src/styles/`) |
| JavaScript (ES Modules) | — | Interatividade e animações (`src/scripts/`) |
| [Vite](https://vite.dev/) | `8.1.0` | Bundler e servidor de desenvolvimento |
| [GSAP](https://gsap.com/) | `3.15.0` | Animações de scroll (`ScrollTrigger`, timelines, `matchMedia`) |
| Public Sans | Variable Font | Tipografia principal (via `@font-face` em `fonts.css`) |

### Backend

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| — | — | Não aplicável — projeto 100% client-side |

### Banco de dados

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| — | — | Não aplicável |

### DevOps

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| — | — | Sem pipeline CI/CD, Docker ou configuração de deploy no repositório |

### Testes

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| — | — | Sem framework de testes configurado |

### Scripts npm

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Build de produção → dist/
npm run preview  # Preview do build de produção
```

---

## 3. Estrutura de Diretórios

```
digital-bank-landing-page-vite/
├── index.html                          # Ponto de entrada HTML; referencia estilos e scripts
├── package.json                        # Metadados, dependências e scripts npm
├── package-lock.json                   # Lockfile das versões instaladas
├── .gitignore                          # Arquivos ignorados pelo Git (node_modules, dist, etc.)
│
├── public/                             # Assets estáticos servidos pelo Vite sem processamento
│   ├── favicon-32x32.png               # Favicon PNG
│   ├── favicon.svg                     # Favicon SVG
│   └── images/                         # [DESCRIÇÃO — pasta presente, sem arquivos referenciados no HTML]
│
├── images/                             # Cópia legada de assets (não referenciada pelo index.html atual)
│   ├── bg-intro-desktop.svg
│   ├── bg-intro-mobile.svg
│   ├── favicon-32x32.png
│   ├── icon-*.svg                      # Ícones de benefícios, menu e redes sociais
│   ├── image-*.jpg                     # Imagens dos artigos
│   ├── logo-dark.svg / logo-light.svg
│   └── image-mockups.png
│
└── src/
    ├── assets/
    │   ├── fonts/
    │   │   ├── PublicSans-VariableFont_wght.ttf           # Fonte variável (peso 100–900)
    │   │   └── PublicSans-Italic-VariableFont_wght.ttf    # Variante itálica
    │   ├── icons/
    │   │   ├── icon-api.svg              # Ícone da seção Open API
    │   │   ├── icon-budgeting.svg        # Ícone Simple Budgeting
    │   │   ├── icon-close.svg            # Ícone de fechar menu
    │   │   ├── icon-facebook.svg         # Redes sociais (footer)
    │   │   ├── icon-hamburger.svg
    │   │   ├── icon-instagram.svg
    │   │   ├── icon-onboarding.svg       # Ícone Fast Onboarding
    │   │   ├── icon-online.svg           # Ícone Online Banking
    │   │   ├── icon-pinterest.svg
    │   │   ├── icon-twitter.svg
    │   │   ├── icon-youtube.svg
    │   │   ├── logo-dark.svg             # Logo para header (fundo claro)
    │   │   └── logo-light.svg            # Logo para footer (fundo escuro)
    │   └── images/
    │       ├── bg-intro-desktop.svg      # Background do hero (desktop)
    │       ├── bg-intro-mobile.svg       # Background do hero (mobile)
    │       ├── cellphone-*.png           # Mockups de celular usados na animação GSAP
    │       ├── image-*.jpg               # Thumbnails dos artigos
    │       ├── image-mockups.png
    │       └── logo.svg                  # Logo exibido no zoom do celular
    │
    ├── scripts/
    │   ├── scrollAnimations.js           # Animação principal do hero (GSAP + ScrollTrigger + matchMedia)
    │   ├── sectionReveal.js              # Reveal de seções ao scroll (IntersectionObserver + CSS)
    │   └── toggleMenu.js                 # Menu hambúrguer e overlay (mobile/tablet)
    │
    └── styles/
        ├── fonts.css                     # Declarações @font-face (Public Sans)
        └── style.css                     # Estilos globais, componentes, breakpoints e scroll-reveal
```
