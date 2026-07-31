import { useEffect, useState } from 'react'

// Observa uma media query e re-renderiza quando ela muda.
//
// Usado para ajustar as animações ligadas ao scroll no celular: um "swipe" no
// touch percorre bem menos tela do que a roda do mouse no desktop, então as
// mesmas distâncias de scroll que ficam boas no PC dão a sensação de "precisa
// rolar duas vezes" no celular.
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
