import { motion } from 'framer-motion'
import { site } from '../config/site'
import { asset } from '../utils/asset'
import Icon from './Icon'

const gradients = {
  wave: 'from-sky-500 to-blue-700',
  droplet: 'from-orange-400 to-brand-orange-dark',
  church: 'from-brand-blue to-brand-blue-deep',
}

export default function Destinations() {
  return (
    <section id="destinos" className="bg-slate-50 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Para onde vamos?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-deep md:text-4xl">
            Destinos em destaque
          </h2>
          <p className="mt-4 text-slate-600">
            Alguns dos roteiros mais procurados pelos nossos clientes. Toque para consultar
            valores e datas direto no WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {d.image ? (
                  <img
                    src={asset(d.image)}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[d.icon]}`}
                  >
                    <Icon name={d.icon} className="h-16 w-16 text-white/90" strokeWidth={1.5} />
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-blue-deep backdrop-blur-sm">
                  {d.state}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-blue-deep">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.tagline}</p>

                <a
                  href={d.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366]/10 px-5 py-3 text-sm font-bold text-[#1c9e50] transition-colors hover:bg-[#25D366] hover:text-white"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Saber o valor no WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
