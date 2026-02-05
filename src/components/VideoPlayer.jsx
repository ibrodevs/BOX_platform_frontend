import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function VideoPlayer({ videoUrl, title, onProgress, onComplete }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (onProgress) {
        onProgress(video.currentTime, video.duration)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onProgress, onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    video.currentTime = percentage * duration
  }

  const handleVolumeChange = (e) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.parentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const skip = (seconds) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const changePlaybackRate = (rate) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Проверяем является ли видео внешним (YouTube, Vimeo и т.д.)
  const isExternalVideo = videoUrl && (
    videoUrl.includes('youtube.com') ||
    videoUrl.includes('youtu.be') ||
    videoUrl.includes('vimeo.com') ||
    videoUrl.includes('rutube.ru')
  )

  if (isExternalVideo) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    )
  }

  return (
    <div 
      className="relative w-full h-full bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      >
        {t('videoPlayer.notSupported')}
      </video>

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"
      />

      {/* Play/Pause Button (Center) */}
      {!isPlaying && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center bg-primary/80 hover:bg-primary rounded-full transition-colors pointer-events-auto"
        >
          <Play className="w-10 h-10 text-white ml-1" />
        </motion.button>
      )}

      {/* Bottom Controls */}
      <motion.div
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        className="absolute bottom-0 left-0 right-0 p-4 space-y-2 pointer-events-auto"
      >
        {/* Progress Bar */}
        <div
          className="w-full h-2 bg-gray-700/50 rounded-full cursor-pointer group/progress"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary to-red-600 rounded-full relative group-hover/progress:h-3 transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="hover:text-primary transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button onClick={() => skip(-10)} className="hover:text-primary transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button onClick={() => skip(10)} className="hover:text-primary transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="hover:text-primary transition-colors">
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
                className="w-0 group-hover/volume:w-20 transition-all opacity-0 group-hover/volume:opacity-100"
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <div className="relative group/settings">
              <button className="hover:text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg p-2 opacity-0 group-hover/settings:opacity-100 transition-opacity pointer-events-none group-hover/settings:pointer-events-auto">
                <div className="text-xs space-y-1 whitespace-nowrap">
                  <div className="text-gray-400 mb-1">{t('videoPlayer.speed')}</div>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-800 ${
                        playbackRate === rate ? 'text-primary' : ''
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
