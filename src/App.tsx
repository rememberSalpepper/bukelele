'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function BukeleleLanding() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [price, setPrice] = useState(0.00001234)
  const [memePhrase, setMemePhrase] = useState("Making El Salvador More BASED Than Wakanda FR FR 🇸🇻")
  const [isRaining, setIsRaining] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  const audioBuffer = useRef<AudioBuffer | null>(null)
  const audioSource = useRef<AudioBufferSourceNode | null>(null)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleRain = () => {
    setIsRaining(!isRaining)
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const togglePlay = async () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const response = await fetch('/bukelele-anthem.mp3')
      const arrayBuffer = await response.arrayBuffer()
      audioBuffer.current = await audioContext.current.decodeAudioData(arrayBuffer)
    }

    if (isPlaying) {
      audioSource.current?.stop()
      setIsPlaying(false)
    } else {
      audioSource.current = audioContext.current.createBufferSource()
      audioSource.current.buffer = audioBuffer.current
      audioSource.current.connect(audioContext.current.destination)
      audioSource.current.start()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prevPrice => prevPrice * (Math.random() > 0.5 ? 1.01 : 0.99))
    }, 2000)

    const memeInterval = setInterval(() => {
      const phrases = [
        "Making El Salvador More BASED Than Wakanda FR FR 🇸🇻",
        "We Built Different, We Built STUPID 💅",
        "WAGMI HASTA QUE NOS QUEDEMOS SIN INTERNET! 🚀🌐",
        "In $BUKE we trust, en pupusas we FEAST, with MEMES we PREVAIL 🙏🫓😂",
        "Your portfolio is now officially BUSSIN' FR FR NO CAP ON GOD 💯🔥",
        "HODL O TE NUKEO 🔥💎",
        "Vibes must be ASTRONOMICALLY HIGH 🌌✨",
        "No FUD allowed o te cae LA CHANCLA 🩴💥",
        "Pump It, Cerote! 📈🎉",
        "To The Moon and Beyond, Viejon! 🌕🚀"
      ]
      setMemePhrase(phrases[Math.floor(Math.random() * phrases.length)])
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(memeInterval)
    }
  }, [])

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    })
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-300 dark:from-gray-900 dark:via-yellow-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-gray-100 transition-all duration-500 overflow-hidden">
        {isRaining && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ y: -20, x: Math.random() * window.innerWidth }}
                animate={{ y: '100vh' }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, repeatType: 'loop' }}
              >
                {['💰', '🫓', '🇸🇻', '🌋'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
        </div>
        )}
        
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="text-4xl font-bold text-yellow-700 dark:text-yellow-300 drop-shadow-md"
          >
            🇸🇻 $BUKELELE 🚀
          </motion.div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-3xl shadow-lg"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleRain}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-3xl shadow-lg"
            >
              {isRaining ? '🌞' : '🌧️'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-3xl shadow-lg"
            >
              {isPlaying ? '🔇' : '🎵'}
            </motion.button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-20 relative">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-9xl mb-4 inline-block"
            >
              🌋
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400"
            >
              $BUKELELE COIN
            </motion.h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={memePhrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl mb-8 text-yellow-800 dark:text-yellow-200 font-bold"
              >
                {memePhrase}
              </motion.p>
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,0)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full text-xl shadow-lg transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => {
                launchConfetti()
                triggerShake()
              }}
            >
              Buy $BUKE Now, Viejon! 💰🚀
            </motion.button>
            {['🌋', '💎', '🚀', '💰', '🏢', '🇸🇻', '🤑', '🎉', '🫓', '🩴'].map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute text-4xl"
                initial={{ opacity: 0.3, scale: 0.5 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                  x: `${Math.sin(index) * 50}%`,
                  y: `${Math.cos(index) * 50}%`,
                  rotate: [0, 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + index,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </section>

          <motion.section 
            className="mb-20"
            animate={isShaking ? {
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 }
            } : {}}
          >
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400">$BUKE Power Levels, Maje!<span className="emoji">🚀💥</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'El Rookie (FRESH MEAT)', desc: 'Can spot un rug pull desde 3 blocks away, vos 🕵️‍♂️', emoji: '👶', color: 'bg-gradient-to-br from-green-400 to-blue-300 dark:from-green-900 dark:to-blue-800' },
                { title: 'El Pro (CHAD ENERGY)', desc: 'Special Move: "Buy High, Buy HIGHER PAPIII" 🤑', emoji: '💎', color: 'bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-900 dark:to-pink-800' },
                { title: 'EL DICTADOR (FINAL BOSS)', desc: 'Ultimate Power: Nukea FUD con chancla precision, cerote 🛡️', emoji: '👑', color: 'bg-gradient-to-br from-red-400 to-yellow-300 dark:from-red-900 dark:to-yellow-800' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`${item.color} p-6 rounded-lg shadow-lg text-center text-white`}
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {item.emoji}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400">Tokenomics BUT MAKE IT GUCCI, Vos <span className="emoji">📊🧮</span></h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              {[
                { label: "Pa'l liquidity (no cap fr fr)", value: 42, color: 'bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-blue-700 dark:to-cyan-800', emoji: '💦' },
                { label: 'Se burnea cuando el GOAT tweetea, maje', value: 0.1, color: 'bg-gradient-to-r from-red-400 to-orange-500 dark:from-red-700 dark:to-orange-800', emoji: '🔥' },
                { label: "Pa'l PUPUSA PARTY y los homies", value: 57.9, color: 'bg-gradient-to-r from-green-400 to-yellow-500 dark:from-green-700 dark:to-yellow-800', emoji: '🫓' },
              ].map((item, index) => (
                <div key={item.label} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{item.label} {item.emoji}</span>
                    <span>{item.value}%</span>
                  </div>
                  <motion.div
                    className={`${item.color} rounded-full h-4`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400">$BUKE Stats, Cerote <span className="emoji">📈🤑</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Bukelevers', value: '69,420', color: 'bg-gradient-to-br from-pink-400 to-rose-300 dark:from-pink-900 dark:to-rose-800', emoji: '🦍' },
                { label: 'Market Cap', value: '$4.20M', color: 'bg-gradient-to-br from-purple-400 to-indigo-300 dark:from-purple-900 dark:to-indigo-800', emoji: '💎' },
                { label: 'Holders', value: '42,069', color: 'bg-gradient-to-br from-indigo-400 to-blue-300 dark:from-indigo-900 dark:to-blue-800', emoji: '💪' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`${item.color} p-6 rounded-lg shadow-lg text-center text-white`}
                >
                  <motion.div 
                    className="text-4xl font-bold mb-2"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {item.value} {item.emoji}
                  </motion.div>
                  <div>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400">Live $BUKE Price, Viejon<span className="emoji"> 🚀💹</span></h2>
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-br from-orange-400 to-amber-300 dark:from-orange-900 dark:to-amber-800 p-6 rounded-lg shadow-lg text-center text-white"
            >
              <motion.p 
                className="text-6xl font-extrabold"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ${price.toFixed(8)} 🌋
              </motion.p>
              <p className="text-sm mt-2">
                Price updates every 2 seconds (not real data, cerote! 😜)
              </p>
            </motion.div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-300 dark:to-red-400">ANTI-BEAR TECHNOLOGY™️, Maje <span className="emoji">🛡️</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'FUD Shield', desc: 'Powered by PURE HOPIUM, vos 💊✨', emoji: '🛡️' },
                { title: 'Paper Hands Detector', desc: 'Smells WEAKNESS desde lejos, cerote 🕵️‍♀️👋', emoji: '🧻' },
                { title: 'Bear Trap', desc: 'Activated by REGGAETON, maje 🎶🐻', emoji: '🪤' },
                { title: 'Pump Catalyst', desc: 'Powered by PUPUSA ENERGY, viejon 🫓⚡', emoji: '📈' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-yellow-400 to-orange-300 dark:from-yellow-900 dark:to-orange-800 p-6 rounded-lg shadow-lg text-center text-white"
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {item.emoji}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-yellow-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-4">© 2024 Bukelele Coin. All rights reserved. Not financial advice. DYOR, cerote! 🧠💡</p>
            <div className="flex justify-center space-x-6">
              {['🐦', '💬', '📱', '🌋', '🚀', '🫓', '🩴'].map((emoji, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-2xl hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}