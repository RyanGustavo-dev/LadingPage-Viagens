import { motion } from 'framer-motion'

// Sol animado com óculos escuros — assinatura visual da marca, inspirado no logo.
export default function SunMascot({ className = 'w-16 h-16' }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.15 }}
    >
      <g className="animate-float-slow" style={{ transformOrigin: '50% 50%' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="47"
            y="2"
            width="6"
            height="16"
            rx="3"
            fill="#ffb703"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="27" fill="#ffc93c" />
        <path
          d="M27 55c4 8 12 13 23 13s19-5 23-13"
          stroke="#f2670a"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="26" y="43" width="20" height="12" rx="6" fill="#0b3d91" />
        <rect x="54" y="43" width="20" height="12" rx="6" fill="#0b3d91" />
        <rect x="46" y="46" width="8" height="4" rx="2" fill="#0b3d91" />
      </g>
    </motion.svg>
  )
}
