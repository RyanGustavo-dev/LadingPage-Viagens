import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../config/site'
import { asset } from '../utils/asset'
import useMediaQuery from '../hooks/useMediaQuery'
import Icon from './Icon'
import SunMascot from './SunMascot'
import ScrollFrameCanvas from './ScrollFrameCanvas'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Quadro usado como imagem fixa quando a animação de scroll está desligada.
const STILL_FRAME = 'animacao/frames/frame-01.jpg'

// Véus escuros por cima da foto, para o texto branco ter contraste.
function Overlays() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#051d47]/95 via-[#051d47]/70 to-[#051d47]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#051d47]/70 via-transparent to-transparent" />
    </>
  )
}

// Texto da Hero. `style` só é usado na versão desktop, onde o conteúdo some
// conforme o scroll avança.
function HeroCopy({ style, className }) {
  return (
    <motion.div
      style={style}
      variants={container}
      initial="hidden"
      animate="show"
      className={`container-page relative z-10 flex max-w-2xl flex-col justify-center ${className}`}
    >
      <motion.span
        variants={item}
        className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-sun backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-widest"
      >
        Desde 2013 em Ribeirão das Neves
      </motion.span>

      <motion.h1
        variants={item}
        className="text-[clamp(1.75rem,8vw,2.25rem)] font-extrabold leading-[1.1] text-white sm:text-5xl sm:leading-[1.08] md:text-6xl"
      >
        Sua próxima viagem começa <span className="text-brand-sun">aqui</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-3 max-w-lg text-[15px] leading-normal text-white/85 sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg"
      >
        Pacotes de viagem, passagens aéreas e rodoviárias para o Brasil e o mundo, com
        atendimento personalizado, ágil e atencioso do início ao fim da sua jornada.
      </motion.p>

      <motion.div variants={item} className="mt-5 flex flex-wrap gap-3 sm:mt-8">
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition-transform hover:-translate-y-0.5 hover:bg-brand-orange-dark sm:px-6 sm:py-3.5 sm:text-base"
        >
          <Icon name="whatsapp" className="w-5 h-5" />
          Planejar minha viagem
        </a>
        <a
          href="#servicos"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-base"
        >
          Ver serviços
          <Icon name="arrowRight" className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.ul variants={item} className="mt-5 flex flex-wrap gap-1.5 sm:mt-10 sm:gap-3">
        {['Pacotes Nacionais e Internacionais', 'Aéreo e Rodoviário', 'Atendimento Personalizado'].map((t) => (
          <li
            key={t}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
          >
            {t}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

// Versão do celular: uma tela, uma foto parada, nada preso ao scroll.
//
// A seção usa `min-h` (e não `h`) para crescer se o texto não couber — assim
// nada é cortado em telas baixas. Como o ScrollFrameCanvas não é montado aqui,
// os 20 quadros da animação nem chegam a ser baixados no celular.
function HeroStatic() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-brand-blue-deep"
    >
      <img
        src={asset(STILL_FRAME)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <Overlays />

      <SunMascot className="absolute right-4 top-16 w-12 h-12 drop-shadow-xl sm:right-6 sm:top-24 sm:w-16 sm:h-16" />

      <HeroCopy className="w-full pt-24 pb-12" />
    </section>
  )
}

// O "scrollytelling": a seção é mais alta que a tela, o painel fica preso no
// topo e o quadro do ônibus avança conforme a rolagem.
//
// `compact` é a versão do celular — a animação pela metade:
//  - o trecho de scroll "gasto" pela seção cai de ~90vh para ~50svh;
//  - só metade dos quadros é usada (step 2), então baixa metade das imagens;
//  - o texto continua legível na maior parte da seção e some só no fim, já que
//    um "swipe" percorre bem menos tela que a roda do mouse.
function HeroScrollytelling({ compact }) {
  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // IMPORTANTE: as faixas terminam em `1` repetindo o último valor. Sem esse
  // ponto final explícito o navegador completa a animação sozinho, interpolando
  // de volta ao valor original — a opacidade fazia 1 -> 0 -> 1 e o texto
  // reaparecia no meio da seção.
  const fadeInput = compact ? [0, 0.5, 0.9, 1] : [0, 0.35, 1]
  const fadeOpacity = compact ? [1, 1, 0, 0] : [1, 0, 0]
  const fadeShift = compact ? [0, 0, -32, -32] : [0, -60, -60]
  const hintInput = compact ? [0, 0.3, 1] : [0, 0.15, 1]

  const contentOpacity = useTransform(scrollYProgress, fadeInput, fadeOpacity)
  const contentY = useTransform(scrollYProgress, fadeInput, fadeShift)
  const hintOpacity = useTransform(scrollYProgress, hintInput, [1, 0, 0])

  // Trilho em `svh` (altura da tela COM a barra do navegador): esse valor não
  // muda quando a barra do Chrome/Safari mobile se recolhe, então a posição do
  // scroll não pula no meio da animação. O painel preso usa `dvh` para sempre
  // preencher a tela — com `svh` sobrava uma faixa clara embaixo.
  const trackHeight = compact ? 'h-[150svh]' : 'h-[190vh]'

  return (
    <section id="inicio" ref={wrapperRef} className={`relative w-full ${trackHeight}`}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-brand-blue-deep">
        <ScrollFrameCanvas
          progress={scrollYProgress}
          step={compact ? 2 : 1}
          className="absolute inset-0 h-full w-full"
        />
        <Overlays />

        <SunMascot className="absolute right-4 top-16 w-12 h-12 drop-shadow-xl sm:right-6 sm:top-24 sm:w-16 sm:h-16 md:right-16 md:top-28 md:w-24 md:h-24" />

        <HeroCopy
          style={{ opacity: contentOpacity, y: contentY }}
          className="h-full pt-20 pb-8 sm:pt-24 sm:pb-16"
        />

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/70 sm:bottom-8 sm:flex"
        >
          <span>Role para ver a viagem começar</span>
          <div className="relative h-9 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-full w-full origin-top animate-scroll-hint bg-brand-sun" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Telas de celular OU qualquer aparelho tocado com o dedo (celular e tablet:
// sem hover e com ponteiro "grosso"). Notebook com tela sensível ao toque não
// entra aqui, porque o ponteiro principal continua sendo o mouse/trackpad.
const TOUCH_QUERY = '(max-width: 767px), (hover: none) and (pointer: coarse)'

export default function Hero() {
  // Aparelho tocado com o dedo roda a animação pela metade; mouse roda inteira.
  // Quem pede menos movimento no sistema não roda animação nenhuma.
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <HeroStatic />
  return <HeroScrollytelling compact={isTouch} />
}
