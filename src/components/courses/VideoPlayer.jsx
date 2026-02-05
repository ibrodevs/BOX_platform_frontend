import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function VideoPlayer({ videoUrl, timestamps, onTimeUpdate, onComplete, initialTime = 0, videoFormat = '16:9' }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialTime)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [showTimestamps, setShowTimestamps] = useState(false)
  const controlsTimeout = useRef(null)

  // Определяем класс для aspect ratio в зависимости от формата
  const getAspectRatioClass = () => {
    switch(videoFormat) {
      case '9:16':
        return 'aspect-[9/16] max-w-md mx-auto' // Вертикальное видео
      case '1:1':
        return 'aspect-square'
      case '16:9':
      default:
        return 'aspect-video'
    }
  }

  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime
    }
  }, [initialTime])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)
      onTimeUpdate?.(time)

      // Проверка завершения
      if (time >= duration - 1) {
        onComplete?.()
      }
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = pos * duration
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const jumpToTimestamp = (time) => {
    const [mins, secs] = time.split(':').map(Number)
    const totalSeconds = mins * 60 + secs
    if (videoRef.current) {
      videoRef.current.currentTime = totalSeconds
      setCurrentTime(totalSeconds)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  return (
    <div 
      className={`relative bg-black ${getAspectRatioClass()} group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onClick={togglePlay}
      />

      {/* Таймкоды сбоку */}
      {timestamps && timestamps.length > 0 && (
        <AnimatePresence>
          {showTimestamps && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-16 w-80 bg-black/90 backdrop-blur overflow-y-auto"
            >
              <div className="p-4">
                <h3 className="text-white font-semibold mb-4">{t('videoPlayer.timestamps')}</h3>
                {timestamps.map((ts, index) => (
                  <button
                    key={index}
                    onClick={() => jumpToTimestamp(ts.time)}
                    className="w-full text-left p-3 rounded hover:bg-white/10 transition mb-2"
                  >
                    <span className="text-red-500 font-mono text-sm">{ts.time}</span>
                    <p className="text-white text-sm mt-1">{ts.label}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Контролы */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
          >
            {/* Прогресс бар */}
            <div
              className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer overflow-hidden"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-red-600 relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
              </div>
            </div>

            {/* Кнопки управления */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-500 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                {/* Громкость */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-white hover:text-red-500 transition">
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>

                {/* Время */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Скорость */}
                <select
                  value={playbackRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value)
                    setPlaybackRate(rate)
                    if (videoRef.current) {
                      videoRef.current.playbackRate = rate
                    }
                  }}
                  className="bg-white/10 text-white text-sm px-2 py-1 rounded"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>

                {/* Таймкоды */}
                {timestamps && timestamps.length > 0 && (
                  <button
                    onClick={() => setShowTimestamps(!showTimestamps)}
                    className={`text-white hover:text-red-500 transition ${showTimestamps ? 'text-red-500' : ''}`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}

                {/* Полный экран */}
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-red-500 transition"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
