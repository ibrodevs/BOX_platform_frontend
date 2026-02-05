export default function Loader({ size = 'md', fullScreen = false }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} border-4 border-gray-700 border-t-primary rounded-full animate-spin`}></div>
      <p className="text-gray-400">Загрузка...</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        {loader}
      </div>
    )
  }

  return loader
}
