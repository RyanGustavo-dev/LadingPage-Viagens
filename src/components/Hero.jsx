import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '../config/site'
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

export default function Hero() {
  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // O conteúdo desaparece suavemente nos primeiros ~35% do scroll da seção,
  // enquanto o quadro do ônibus (ScrollFrameCanvas) avança com o progresso inteiro.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -60])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section id="inicio" ref={wrapperRef} className="relative h-[190vh] w-full">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-brand-blue-deep">
        <ScrollFrameCanvas progress={scrollYProgress} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051d47]/95 via-[#051d47]/70 to-[#051d47]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051d47]/70 via-transparent to-transparent" />

        <SunMascot className="absolute right-4 top-16 w-12 h-12 drop-shadow-xl sm:right-6 sm:top-24 sm:w-16 sm:h-16 md:right-16 md:top-28 md:w-24 md:h-24" />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          variants={container}
          initial="hidden"
          animate="show"
          className="container-page relative z-10 flex h-full max-w-2xl flex-col justify-center pt-24 pb-16"
        >
          <motion.span
            variants={item}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-sun backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-widest"
          >
            Desde 2013 em Ribeirão das Neves
          </motion.span>

          <motion.h1 variants={item} className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl">
            Sua próxima viagem começa <span className="text-brand-sun">aqui</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:mt-6 md:text-lg">
            Pacotes de viagem, passagens aéreas e rodoviárias para o Brasil e o mundo, com
            atendimento personalizado, ágil e atencioso do início ao fim da sua jornada.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/30 transition-transform hover:-translate-y-0.5 hover:bg-brand-orange-dark"
            >
              <Icon name="whatsapp" className="w-5 h-5" />
              Planejar minha viagem
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver serviços
              <Icon name="arrowRight" className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
            {['Pacotes Nacionais e Internacionais', 'Aéreo e Rodoviário', 'Atendimento Personalizado'].map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
              >
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/70 sm:flex"
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
