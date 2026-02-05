import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import VideoPlayer from './VideoPlayer'

export default function CoursePlayer({ lesson, course, onClose }) {
  if (!lesson) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{lesson.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          {lesson.video_file && (
            <div className="mb-4">
              <VideoPlayer 
                videoUrl={lesson.video_file} 
                videoFormat={lesson.video_format || '16:9'}
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p>{lesson.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}