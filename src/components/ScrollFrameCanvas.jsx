import { useEffect, useRef } from 'react'
import { useMotionValueEvent } from 'framer-motion'

const FRAME_COUNT = 20
const framePath = (i) => `${import.meta.env.BASE_URL}animacao/frames/frame-${String(i).padStart(2, '0')}.jpg`

// Sequência de imagens cujo quadro exibido é controlado pelo progresso do
// scroll (scrollYProgress vindo do componente pai) — o "scrollytelling"
// que hoje em dia várias landing pages usam, só que numa seção mais curta.
export default function ScrollFrameCanvas({ progress, className }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentRef = useRef(0)
  const drawRef = useRef(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    drawRef.current = (index) => {
      const img = imagesRef.current[index]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawRef.current(currentRef.current)
    }

    let loaded = 0
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = () => {
        loaded++
        if (i === 1) resize()
        if (loaded === FRAME_COUNT) drawRef.current(currentRef.current)
      }
      imagesRef.current[i - 1] = img
    }

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useMotionValueEvent(progress, 'change', (latest) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest * (FRAME_COUNT - 1))))
    currentRef.current = index
    drawRef.current(index)
  })

  return <canvas ref={canvasRef} className={className} />
}
