import { useEffect, useState } from 'react'
import { site } from '../config/site'
import Icon from './Icon'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#destinos', label: 'Destinos' },
  { href: '#localizacao', label: 'Localização' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <span className={scrolled ? 'text-brand-blue' : 'text-white'}>Marcinho</span>
          <span className="text-brand-orange">Viagens</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors hover:text-brand-orange ${
                scrolled ? 'text-brand-blue-deep' : 'text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition-transform hover:-translate-y-0.5"
        >
          <Icon name="whatsapp" className="w-4 h-4" />
          Fale conosco
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-brand-blue' : 'text-white'}`}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} className="w-7 h-7" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-xl border-t border-slate-100">
          <nav className="container-page flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-brand-blue-deep font-semibold border-b border-slate-100 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
            >
              <Icon name="whatsapp" className="w-4 h-4" />
              Fale conosco no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
