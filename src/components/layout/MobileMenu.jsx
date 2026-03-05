import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTranslation } from 'react-i18next'
import {
  X,
  Home,
  Trophy,
  BookOpen,
  ShoppingBag,
  BarChart3,
  GraduationCap,
  User,
  LogOut
} from 'lucide-react'

export default function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation()
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
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-l border-slate-700/50 shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            <div className="min-h-full flex flex-col p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* User Info */}
              {isAuthenticated && (
                <div className="mb-6 pb-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {(user?.username || user?.email || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{t('mobileMenu.greeting')}</p>
                      <p className="font-bold text-base text-white">{user?.username || user?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                <Link
                  to="/"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Home className="w-5 h-5" />
                  {t('nav.home')}
                </Link>
                <Link
                  to="/about"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Trophy className="w-5 h-5" />
                  {t('nav.about')}
                </Link>
                <Link
                  to="/courses"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <BookOpen className="w-5 h-5" />
                  {t('nav.courses')}
                </Link>
                <Link
                  to="/merch"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('nav.shop')}
                </Link>
                
                {isAuthenticated && (
                  <>
                    <div className="pt-2 mt-2 border-t border-slate-700/50">
                      <Link
                        to="/dashboard"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                      >
                        <BarChart3 className="w-5 h-5" />
                        {t('nav.dashboard')}
                      </Link>
                      <Link
                        to="/dashboard/my-courses"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                      >
                        <GraduationCap className="w-5 h-5" />
                        {t('nav.myCourses')}
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 active:scale-95"
                      >
                        <User className="w-5 h-5" />
                        {t('nav.profile')}
                      </Link>
                    </div>
                  </>
                )}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3.5 bg-slate-700/50 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    {t('nav.logout')}
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="block w-full text-center px-6 py-3.5 bg-slate-700/50 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={onClose}
                      className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg shadow-red-900/50 transition-all duration-200 active:scale-95"
                    >
                      {t('mobileMenu.register')}
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
