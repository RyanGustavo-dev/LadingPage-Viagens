import { useEffect, useRef } from 'react'
import { useMotionValueEvent } from 'framer-motion'

const FRAME_COUNT = 20
const framePath = (i) => `${import.meta.env.BASE_URL}animacao/frames/frame-${String(i).padStart(2, '0')}.jpg`

// Monta a lista de quadros usados. `step` maior pula quadros — no celular
// rodamos a animação com metade deles (menos dados no 4G e menos trabalho por
// frame). O último quadro entra sempre, para a animação terminar na mesma
// imagem em qualquer aparelho.
function buildFrames(step) {
  const list = []
  for (let i = 1; i <= FRAME_COUNT; i += step) list.push(i)
  if (list[list.length - 1] !== FRAME_COUNT) list.push(FRAME_COUNT)
  return list
}

// Sequência de imagens cujo quadro exibido é controlado pelo progresso do
// scroll (scrollYProgress vindo do componente pai) — o "scrollytelling"
// que hoje em dia várias landing pages usam, só que numa seção mais curta.
export default function ScrollFrameCanvas({ progress, className, step = 1 }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentRef = useRef(0)
  const drawRef = useRef(() => {})
  const countRef = useRef(1)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const frames = buildFrames(step)
    countRef.current = frames.length
    currentRef.current = 0
    imagesRef.current = []

    drawRef.current = (index) => {
      const img = imagesRef.current[index]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      if (!cw || !ch) return
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function resize() {
      // Celulares com tela grande chegam a dpr 3/4; acima de 2 o ganho visual é
      // imperceptível e o custo de redesenhar a cada quadro cresce muito.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      if (!cw || !ch) return
      canvas.width = cw * dpr
      canvas.height = ch * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawRef.current(currentRef.current)
    }

    let loaded = 0
    frames.forEach((frame, slot) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(frame)
      img.onload = () => {
        loaded++
        if (slot === 0) resize()
        if (loaded === frames.length) drawRef.current(currentRef.current)
      }
      imagesRef.current[slot] = img
    })

    // No celular a barra de endereço aparece/some durante a rolagem e dispara
    // uma rajada de `resize`. Redimensionar o canvas limpa o buffer, então
    // agrupamos tudo num único frame para não piscar nem travar o scroll.
    let resizeRaf = 0
    function onResize() {
      if (resizeRaf) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        resize()
      })
    }

    resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
    }
  }, [step])

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  // O evento de scroll dispara muito mais vezes do que a quantidade de quadros:
  // só redesenhamos quando o quadro muda de verdade e sempre dentro de um
  // requestAnimationFrame, para o desenho não competir com a rolagem no touch.
  useMotionValueEvent(progress, 'change', (latest) => {
    const last = countRef.current - 1
    const index = Math.min(last, Math.max(0, Math.round(latest * last)))
    if (index === currentRef.current) return
    currentRef.current = index
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      drawRef.current(currentRef.current)
    })
  })

  return <canvas ref={canvasRef} className={className} />
}
