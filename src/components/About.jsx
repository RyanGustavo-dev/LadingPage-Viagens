import { motion } from 'framer-motion'
import { site } from '../config/site'

const stats = [
  { value: '2013', label: 'Ano de fundação' },
  { value: '+10', label: 'Anos de estrada' },
  { value: '100%', label: 'Atendimento personalizado' },
]

export default function About() {
  return (
    <section id="sobre" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Quem somos
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-deep md:text-4xl">
            Uma agência feita para cuidar da sua viagem
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            A <strong className="text-brand-blue">{site.name}</strong> foi criada em{' '}
            {site.founded}, e está situada em Ribeirão das Neves (Justinópolis), Minas
            Gerais. Somos uma agência de turismo completa, atuando com pacotes de
            viagens, passagens aéreas e rodoviárias, com vários destinos no Brasil e no
            mundo.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Nosso atendimento é personalizado, ágil e atencioso, garantindo que cada
            viagem seja planejada com cuidado e dedicação. Estamos sempre prontos para
            ouvir, orientar e oferecer as melhores soluções, tornando sua experiência
            prática, segura e inesquecível.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-2 sm:gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-3 text-center text-white shadow-lg sm:p-6"
            >
              <div className="text-xl font-extrabold text-brand-sun sm:text-2xl md:text-3xl">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] font-medium leading-tight break-words hyphens-auto text-white/80 sm:text-xs md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
