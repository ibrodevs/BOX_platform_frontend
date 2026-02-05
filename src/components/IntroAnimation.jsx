import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [counter, setCounter] = useState(0)
  const [showElements, setShowElements] = useState([])
  const containerRef = useRef(null)
  
  const elements = useMemo(() => [
    'matrix', 'particles', 'lasers', 'glow', 'impact',
    'brand', 'subtitle', 'loading', 'final'
  ], [])

  useEffect(() => {
    // ВРЕМЕННО: Закомментируем проверку localStorage для тестирования
    // const hasSeenIntro = localStorage.getItem('hasSeenIntro')
    
    // if (hasSeenIntro) {
    //   setIsVisible(false)
    //   onComplete()
    // } else {
      // Последовательное появление элементов
      const timeouts = []
      elements.forEach((element, index) => {
        const timeout = setTimeout(() => {
          setShowElements(prev => [...prev, element])
        }, index * 300)
        timeouts.push(timeout)
      })

      // Счетчик загрузки
      const counterInterval = setInterval(() => {
        setCounter(prev => {
          if (prev >= 100) {
            clearInterval(counterInterval)
            setTimeout(() => {
              setIsVisible(false)
              localStorage.setItem('hasSeenIntro', 'true')
              onComplete()
            }, 800)
            return 100
          }
          return prev + 1
        })
      }, 35)

      return () => {
        timeouts.forEach(t => clearTimeout(t))
        clearInterval(counterInterval)
      }
    // }
  }, [onComplete, elements])

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1,
          transition: { 
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        ref={containerRef}
        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      >
        {/* High-Tech Background Grid */}
        {showElements.includes('matrix') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(209, 0, 0, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(209, 0, 0, 0.1) 0%, transparent 50%),
                  linear-gradient(0deg, transparent 0%, rgba(255, 255, 255, 0.02) 1px, transparent 2px)
                `,
                backgroundSize: '200px 200px, 200px 200px, 100% 20px'
              }}
            />
          </motion.div>
        )}

        {/* Quantum Particles */}
        {showElements.includes('particles') && (
          <div className="absolute inset-0">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + 'vw',
                  y: Math.random() * 100 + 'vh',
                  opacity: 0
                }}
                animate={{
                  x: [null, Math.random() * 100 + 'vw'],
                  y: [null, Math.random() * 100 + 'vh'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                className="absolute w-[1px] h-[1px]"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(209, 0, 0, 1) 0%, 
                    rgba(209, 0, 0, 0.8) 30%, 
                    transparent 70%)`,
                  filter: 'blur(0.5px)',
                  boxShadow: '0 0 10px 2px rgba(209, 0, 0, 0.5)'
                }}
              />
            ))}
          </div>
        )}

        {/* Laser Grid Effect */}
        {showElements.includes('lasers') && (
          <div className="absolute inset-0">
            {/* Vertical Lasers */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`v-${i}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="absolute top-0 w-[0.5px] h-full"
                style={{
                  left: `${(i * 5)}%`,
                  background: 'linear-gradient(to bottom, transparent, #D10000, transparent)',
                  boxShadow: '0 0 10px 1px rgba(209, 0, 0, 0.7)'
                }}
              />
            ))}

            {/* Horizontal Lasers */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`h-${i}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="absolute left-0 h-[0.5px] w-full"
                style={{
                  top: `${(i * 7)}%`,
                  background: 'linear-gradient(to right, transparent, #D10000, transparent)',
                  boxShadow: '0 0 10px 1px rgba(209, 0, 0, 0.7)'
                }}
              />
            ))}
          </div>
        )}

        {/* Central Glow Effect */}
        {showElements.includes('glow') && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
              {/* Outer Ring */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-0 border border-red-500/30 rounded-full"
                style={{
                  boxShadow: '0 0 100px 20px rgba(209, 0, 0, 0.2) inset'
                }}
              />
              
              {/* Inner Ring */}
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [0.9, 1, 0.9]
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-[20%] border-2 border-red-600/50 rounded-full"
                style={{
                  boxShadow: '0 0 60px 10px rgba(209, 0, 0, 0.3) inset'
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Impact Animation */}
        {showElements.includes('impact') && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 3, 4],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 m-auto w-[200px] h-[200px] bg-red-600 rounded-full blur-3xl"
            />
            
            {/* Shockwave Rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2.5],
                  opacity: [0.6, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
                className="absolute inset-0 m-auto w-[300px] h-[300px] border-2 border-red-500/40 rounded-full"
              />
            ))}
          </>
        )}

        {/* Main Content */}
        <div className="relative z-30 h-full flex flex-col items-center justify-center px-4">
          {/* Gloves Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [0, -10, 0]
            }}
            transition={{ 
              scale: {
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              },
              rotate: {
                duration: 1.5,
                ease: [0.68, -0.6, 0.32, 1.6]
              },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative mb-12"
          >
            {/* Glow behind gloves */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-[-20px] bg-red-600/20 blur-3xl rounded-full"
            />
            
            <motion.div
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotateY: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="text-9xl md:text-[10rem]"
            >
              🥊
            </motion.div>
          </motion.div>

          {/* Brand Name with Advanced Effects */}
          {showElements.includes('brand') && (
            <div className="relative mb-8">
              {/* Background Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: 1
                }}
                transition={{
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.8,
                    ease: "backOut"
                  }
                }}
                className="absolute inset-[-50px] bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 blur-3xl"
              />

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0, 0.67, 0]
                }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    textShadow: [
                      '0 0 30px rgba(209, 0, 0, 0.3)',
                      '0 0 60px rgba(209, 0, 0, 0.6)',
                      '0 0 30px rgba(209, 0, 0, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative inline-block"
                  >
                    <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                      BIVOL
                    </span>
                    <motion.span
                      animate={{ 
                        width: ['0%', '100%', '0%'],
                        left: ['0%', '0%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute bottom-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    />
                  </motion.span>
                  
                  <motion.span
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="relative inline-block ml-4"
                  >
                    <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
                      BOXING
                    </span>
                    <motion.span
                      animate={{ 
                        width: ['0%', '100%', '0%'],
                        left: ['0%', '0%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8
                      }}
                      className="absolute bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  </motion.span>
                </motion.div>
              </motion.h1>
            </div>
          )}

          {/* Subtitle with Typing Effect */}
          {showElements.includes('subtitle') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-12 relative"
            >
              <motion.p
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ 
                  delay: 1.2, 
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1]
                }}
                className="text-xl md:text-2xl font-medium text-gray-400 overflow-hidden whitespace-nowrap tracking-widest uppercase relative"
              >
                <span className="relative z-10">ELITE TRAINING SYSTEM</span>
                <motion.span
                  animate={{ 
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute right-0 top-0 h-full w-[3px] bg-red-500"
                />
              </motion.p>
              
              {/* Decorative lines */}
              <div className="absolute -inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />
            </motion.div>
          )}

          {/* Advanced Loading System */}
          {showElements.includes('loading') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="w-full max-w-2xl px-4"
            >
              {/* Loading Bar Container */}
              <div className="relative mb-6">
                {/* Bar Background */}
                <div className="h-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-full overflow-hidden border border-gray-700/50">
                  {/* Animated Gradient Bar */}
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${counter}%` }}
                    transition={{ ease: "linear" }}
                    className="relative h-full"
                  >
                    {/* Main Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800" />
                    
                    {/* Scan Line */}
                    <motion.div
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                    />
                    
                    {/* Energy Pulse Effect */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(209, 0, 0, 0.3)',
                          '0 0 20px rgba(209, 0, 0, 0.6)',
                          '0 0 10px rgba(209, 0, 0, 0.3)'
                        ]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                      className="absolute inset-0"
                    />
                  </motion.div>
                </div>
                
                {/* Percentage Indicator */}
                <div className="absolute -top-8 right-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent"
                  >
                    {counter}%
                  </motion.div>
                </div>
                
                {/* Status Indicators */}
                <div className="flex justify-between mt-4 text-sm text-gray-500 tracking-widest">
                  <motion.span
                    animate={{ opacity: counter > 25 ? 1 : 0.3 }}
                    className="uppercase"
                  >
                    SYSTEM INIT
                  </motion.span>
                  <motion.span
                    animate={{ opacity: counter > 50 ? 1 : 0.3 }}
                    className="uppercase"
                  >
                    MODULES LOAD
                  </motion.span>
                  <motion.span
                    animate={{ opacity: counter > 75 ? 1 : 0.3 }}
                    className="uppercase"
                  >
                    READY
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Final Explosion Effect */}
        {showElements.includes('final') && counter === 100 && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 5, 6],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="absolute inset-0 m-auto bg-gradient-radial from-red-600/50 to-transparent blur-3xl"
            />
            
            {/* Multiple Shockwaves */}
            {[0, 0.2, 0.4].map((delay) => (
              <motion.div
                key={delay}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3],
                  opacity: [0.6, 0]
                }}
                transition={{
                  duration: 1,
                  delay: delay,
                  ease: "easeOut"
                }}
                className="absolute inset-0 m-auto border border-red-500/30 rounded-full"
                style={{
                  width: 'min(100vh, 100vw)',
                  height: 'min(100vh, 100vw)'
                }}
              />
            ))}
          </>
        )}

        {/* Ambient Audio Visualization (Purely Visual) */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1 px-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [
                  Math.random() * 20 + 5,
                  Math.random() * 40 + 10,
                  Math.random() * 20 + 5
                ]
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: i * 0.02,
                ease: "easeInOut"
              }}
              className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}