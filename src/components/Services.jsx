import { motion } from 'framer-motion'
import { site } from '../config/site'
import Icon from './Icon'

export default function Services() {
  return (
    <section id="servicos" className="bg-slate-50 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            O que fazemos
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-deep md:text-4xl">
            Tudo para sua viagem, em um só lugar
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-orange group-hover:text-white">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-blue-deep">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
