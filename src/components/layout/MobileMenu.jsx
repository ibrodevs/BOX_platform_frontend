import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function MobileMenu({ isOpen, onClose }) {
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-dark border-l border-gray-800 z-50 md:hidden"
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* User Info */}
              {isAuthenticated && (
                <div className="mb-8 pb-6 border-b border-gray-800">
                  <p className="text-sm text-gray-400">Привет,</p>
                  <p className="font-bold text-lg">{user?.username || user?.email}</p>
                </div>
              )}

              {/* Navigation */}
              <nav className="space-y-4">
                <Link
                  to="/"
                  onClick={onClose}
                  className="block py-3 text-lg hover:text-primary transition-colors"
                >
                  Главная
                </Link>
                <Link
                  to="/about"
                  onClick={onClose}
                  className="block py-3 text-lg hover:text-primary transition-colors"
                >
                  О тренере
                </Link>
                <Link
                  to="/courses"
                  onClick={onClose}
                  className="block py-3 text-lg hover:text-primary transition-colors"
                >
                  Курсы
                </Link>
                <Link
                  to="/merch"
                  onClick={onClose}
                  className="block py-3 text-lg hover:text-primary transition-colors"
                >
                  Магазин
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={onClose}
                      className="block py-3 text-lg hover:text-primary transition-colors"
                    >
                      Личный кабинет
                    </Link>
                    <Link
                      to="/dashboard/my-courses"
                      onClick={onClose}
                      className="block py-3 text-lg hover:text-primary transition-colors"
                    >
                      Мои курсы
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={onClose}
                      className="block py-3 text-lg hover:text-primary transition-colors"
                    >
                      Профиль
                    </Link>
                  </>
                )}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full btn-secondary"
                  >
                    Выход
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="block w-full text-center btn-secondary"
                    >
                      Вход
                    </Link>
                    <Link
                      to="/register"
                      onClick={onClose}
                      className="block w-full text-center btn-primary"
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
