import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useCart } from '../hooks/useCart'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { 
  Menu, X, User, LogOut, Home, Trophy, BookOpen, ShoppingBag, 
  Shield, Crown, Sparkles, ChevronDown, ShoppingCart, Search
} from 'lucide-react'
import MobileMenu from './layout/MobileMenu'
import Cart from './Cart'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { getTotalItems } = useCart()
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/about', label: t('nav.about'), icon: Trophy },
    { path: '/courses', label: t('nav.courses'), icon: BookOpen },
    { path: '/merch', label: t('nav.shop'), icon: ShoppingBag },
    ...(isAuthenticated ? [
      { path: '/dashboard', label: t('nav.dashboard'), icon: User },
      // { path: '/dashboard/my-courses', label: t('nav.myCourses'), icon: Shield }
    ] : [])
  ]

  const userMenuItems = [
    { label: t('nav.profile'), path: '/dashboard/profile', icon: User },
    { label: t('nav.dashboard'), path: '/dashboard', icon: Shield },
    { label: t('nav.orders'), path: '/dashboard/orders', icon: ShoppingBag },
    { label: t('nav.cart'), action: () => setCartOpen(true), icon: ShoppingCart },
    { label: t('nav.logout'), action: logout, icon: LogOut }
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' 
            : 'bg-white/70 backdrop-blur-md'
        }`}
      >
        <div className="container-custom px-4">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-black text-base sm:text-lg">B</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    BIVOL
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-600 tracking-widest">SCHOOL</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation with Hover Effects */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group ${
                        isActive
                          ? 'text-slate-900 bg-slate-100'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-slate-900' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Search className="w-5 h-5 text-slate-600" />
              </motion.button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Shopping Cart - только для авторизованных */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCartOpen(true)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors relative group flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-primary rounded-full text-xs flex items-center justify-center text-white font-bold"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </motion.button>
              )}

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      {user?.isPremium && (
                        <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-slate-900">
                        {user?.username || t('user.username')}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user?.isPremium ? t('user.premium') : t('user.standard')}
                      </span>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                        style={{ backdropFilter: 'blur(20px)' }}
                      >
                        <div className="p-2">
                          {userMenuItems.map((item, index) => (
                            item.action ? (
                              <motion.button
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                  item.action()
                                  setDropdownOpen(false)
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 group"
                              >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </motion.button>
                            ) : (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={item.path}
                                  onClick={() => setDropdownOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 group"
                                >
                                  <item.icon className="w-4 h-4" />
                                  <span>{item.label}</span>
                                </Link>
                              </motion.div>
                            )
                          ))}
                        </div>
                        
                        {/* Premium Upgrade Banner */}
                        {!user?.isPremium && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <Link
                              to="/premium"
                              className="flex items-center justify-between group"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <Crown className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-gray-900">{t('nav.premiumUpgrade')}</span>
                              </div>
                              <Sparkles className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all duration-300 group"
                    >
                      <span className="font-medium">{t('nav.login')}</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      to="/register"
                      className="group px-6 py-2 rounded-xl bg-gray-900 font-medium text-white flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{t('nav.register')}</span>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('nav.search')}
                      className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      autoFocus
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Cart Drawer - только для авторизованных */}
      {isAuthenticated && (
        <Cart 
          isOpen={cartOpen} 
          onClose={() => setCartOpen(false)} 
        />
      )}

      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </>
  )
}