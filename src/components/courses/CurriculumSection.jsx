import React from 'react'
import { CheckCircle, Lock, Play, Clock } from 'lucide-react'

export default function CurriculumSection({ lessons, isPurchased, onLessonClick }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6">Программа курса</h3>
      <div className="space-y-3">
        {lessons?.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              isPurchased 
                ? 'border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer' 
                : 'border-gray-200 opacity-75'
            }`}
            onClick={() => isPurchased && onLessonClick(lesson)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {lesson.completed ? <CheckCircle size={16} /> : <Play size={16} />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{lesson.duration || '10 мин'}</span>
                    </span>
                    {lesson.video_file && <span>Видео</span>}
                  </div>
                </div>
              </div>
              {!isPurchased && (
                <Lock className="text-gray-400" size={16} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}