import { motion } from 'framer-motion'
import { site } from '../config/site'
import Icon from './Icon'

const gradients = {
  hotel: 'from-brand-blue to-brand-blue-deep',
  globe: 'from-sky-500 to-blue-700',
  calendar: 'from-orange-400 to-brand-orange-dark',
}

export default function Highlights() {
  return (
    <section id="promocoes" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="mb-2 h-1 w-10 rounded-full bg-brand-orange" />
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-brand-blue-deep md:text-3xl">
          Destaques e Promoções
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm ring-1 ring-slate-100"
            >
              <div className="relative h-44 w-full">
                {h.image ? (
                  <img src={h.image} alt={h.title} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[h.icon]}`}
                  >
                    <Icon name={h.icon} className="h-14 w-14 text-white/90" strokeWidth={1.5} />
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {h.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-blue-deep">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.description}</p>
                <a
                  href={h.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
                >
                  Confira
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
