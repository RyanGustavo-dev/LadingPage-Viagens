import { site } from '../config/site'
import Icon from './Icon'

export default function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="animate-pulse-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  )
}
