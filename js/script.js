/* =========================================================
   MARCINHO VIAGENS — HERO SCROLLYTELLING
   GSAP + ScrollTrigger
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
const heroContent = document.getElementById('heroContent');
const heroSection = document.querySelector('.hero');

/* ---------------------------------------------------------
   1) HEADER GLASSMORPHISM AO ROLAR
   --------------------------------------------------------- */
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  onUpdate: (self) => {
    header.classList.toggle('is-scrolled', self.scroll() > 80);
  },
});

/* ---------------------------------------------------------
   2) MENU MOBILE
   --------------------------------------------------------- */
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-active', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

/* ---------------------------------------------------------
   3) SEQUÊNCIA DE IMAGENS ATRELADA AO SCROLL (SCRUBBING)
   O ônibus avança/retrocede conforme o usuário rola a página.
   Cada frame é um JPG pré-carregado e desenhado no canvas —
   mais estável entre navegadores do que dar seek em um <video>.
   --------------------------------------------------------- */
const FRAME_COUNT = 40;
const FRAME_PATH = (i) => `./animacao/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

const frames = [];
let framesLoaded = 0;
let currentFrame = 0;

function drawFrame(index) {
  const img = frames[index];
  if (!img || !img.complete || !img.naturalWidth) return;

  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;

  // Emula "object-fit: cover": escala a imagem para preencher o canvas
  // inteiro, cortando o excedente, sem distorcer a proporção.
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawFrame(currentFrame);
}

function initFrameScrub() {
  resizeCanvas();

  const proxy = { frame: 0 };
  gsap.to(proxy, {
    frame: FRAME_COUNT - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // suaviza a resposta ao scroll (efeito de "lag" sutil)
    },
    onUpdate: () => {
      currentFrame = Math.round(proxy.frame);
      drawFrame(currentFrame);
    },
  });

  window.addEventListener('resize', resizeCanvas);
}

for (let i = 1; i <= FRAME_COUNT; i++) {
  const img = new Image();
  img.src = FRAME_PATH(i);
  img.onload = () => {
    framesLoaded += 1;

    // Assim que o primeiro frame chega, já pinta a tela (evita canvas em branco).
    if (i === 1) resizeCanvas();

    if (framesLoaded === FRAME_COUNT) initFrameScrub();
  };
  frames[i - 1] = img;
}

/* ---------------------------------------------------------
   4) FADE-OUT + TRANSLATE DO TEXTO CONFORME O SCROLL DESCE
   O conteúdo começa totalmente visível e desaparece suavemente
   nos primeiros ~35% do scroll da hero.
   --------------------------------------------------------- */
gsap.timeline({
  scrollTrigger: {
    trigger: heroSection,
    start: 'top top',
    end: '+=35%',
    scrub: true,
  },
})
  .to(heroContent, {
    opacity: 0,
    y: -80,
    ease: 'power1.out',
  })
  .to(
    '.hero__scroll-hint',
    {
      opacity: 0,
      y: -20,
      ease: 'power1.out',
    },
    0 // toca junto com a animação anterior
  );
