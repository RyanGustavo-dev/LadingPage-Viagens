import { motion } from 'framer-motion'
import { site } from '../config/site'
import Icon from './Icon'

export default function Location() {
  return (
    <section id="localizacao" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-10 md:grid-cols-2 md:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">
            Onde estamos
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-deep md:text-4xl">
            Venha planejar sua viagem pessoalmente
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Estamos em Justinópolis, Ribeirão das Neves - MG. Toque no mapa para
            explorar a região ou abra a rota completa no Google Maps.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-5">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <p className="text-sm leading-relaxed text-slate-700">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-50 p-5">
            <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <p className="text-sm leading-relaxed text-slate-700">
              Segunda a sexta, 9h às 18h · Sábado, 9h às 13h
            </p>
          </div>

          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-blue-dark"
          >
            <Icon name="pin" className="h-4 w-4" />
            Abrir no Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="min-h-[320px] overflow-hidden rounded-3xl border border-slate-100 shadow-lg"
        >
          <iframe
            title="Localização da Marcinho Viagens no Google Maps"
            src={site.address.embedUrl}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
