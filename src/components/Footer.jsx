import { site } from '../config/site'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer id="contato" className="bg-brand-blue-deep text-white">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="text-xl font-extrabold">
            Marcinho<span className="text-brand-orange">Viagens</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-sun">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Icon name="phone" className="h-4 w-4 text-brand-orange" />
              <a href={site.phones.mobileHref} className="inline-block py-1.5 hover:text-white">
                (31) 98788-1993
              </a>
              <span className="text-white/40">/</span>
              <a href={site.phones.landlineHref} className="inline-block py-1.5 hover:text-white">
                3632-4433
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="whatsapp" className="h-4 w-4 text-brand-orange" />
              <a href={site.whatsapp.href} target="_blank" rel="noreferrer" className="inline-block py-1.5 hover:text-white">
                Conversar no WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="instagram" className="h-4 w-4 text-brand-orange" />
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="inline-block py-1.5 hover:text-white">
                {site.instagram.handle}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-sun">Navegação</h3>
          <ul className="mt-4 space-y-1 text-sm text-white/80">
            <li><a href="#inicio" className="inline-block py-1.5 hover:text-white">Início</a></li>
            <li><a href="#promocoes" className="inline-block py-1.5 hover:text-white">Promoções</a></li>
            <li><a href="#sobre" className="inline-block py-1.5 hover:text-white">Sobre</a></li>
            <li><a href="#servicos" className="inline-block py-1.5 hover:text-white">Serviços</a></li>
            <li><a href="#destinos" className="inline-block py-1.5 hover:text-white">Destinos</a></li>
            <li><a href="#avaliacoes" className="inline-block py-1.5 hover:text-white">Avaliações</a></li>
            <li><a href="#localizacao" className="inline-block py-1.5 hover:text-white">Localização</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-center text-xs text-white/50">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
