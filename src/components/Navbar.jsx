import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useCart } from '../hooks/useCart'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { 
  Menu, X, User, LogOut, Home, Trophy, BookOpen, ShoppingBag, 
  Shield, Crown, Sparkles, ChevronDown, ShoppingCart, Search
} from 'lucide-react'
import MobileMenu from './layout/MobileMenu'
import Cart from './Cart'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { getTotalItems } = useCart()
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
    { path: '/', label: 'Главная', icon: Home },
    { path: '/about', label: 'О бойце', icon: Trophy },
    { path: '/courses', label: 'Курсы', icon: BookOpen },
    { path: '/merch', label: 'Мерч', icon: ShoppingBag },
    ...(isAuthenticated ? [
      { path: '/dashboard', label: 'Кабинет', icon: User },
      { path: '/dashboard/my-courses', label: 'Мои курсы', icon: Shield }
    ] : [])
  ]

  const userMenuItems = [
    { label: 'Профиль', path: '/dashboard/profile', icon: User },
    { label: 'Личный кабинет', path: '/dashboard', icon: Shield },
    { label: 'Мои заказы', path: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Покупки', action: () => setCartOpen(true), icon: ShoppingCart },
    { label: 'Выйти', action: logout, icon: LogOut }
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-primary/10' 
            : 'bg-transparent'
        }`}
      >
        {/* Animated Glow Line */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
        />

        <div>
          <div className="flex justify-between items-center h-20">
            {/* Logo with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                  />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center">
                    <span className="text-white font-black text-lg">B</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                    BIVOL
                  </span>
                  <span className="text-xs font-semibold text-primary tracking-widest">BOXING ACADEMY</span>
                </div>
              </Link>
              
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
                          ? 'text-white bg-gradient-to-r from-primary/20 to-transparent'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full bg-gradient-to-r from-primary to-red-600"
                        />
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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
                className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </motion.button>

              {/* Shopping Cart - только для авторизованных */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCartOpen(true)}
                  className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors relative group flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-gradient-to-r from-primary to-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold"
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
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      {user?.isPremium && (
                        <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-white">
                        {user?.username || 'Пользователь'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user?.isPremium ? 'PREMIUM' : 'STANDARD'}
                      </span>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
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
                        className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
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
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
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
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
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
                          <div className="border-t border-gray-800 p-4 bg-gradient-to-r from-primary/10 to-transparent">
                            <Link
                              to="/premium"
                              className="flex items-center justify-between group"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <Crown className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-white">Upgrade to Premium</span>
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
                      className="px-6 py-2 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300 group"
                    >
                      <span className="font-medium">Вход</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      to="/register"
                      className="group px-6 py-2 rounded-xl bg-gradient-to-r from-primary to-red-600 font-medium text-white flex items-center gap-2 overflow-hidden"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Начать путь</span>
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      />
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
                      placeholder="Поиск курсов, уроков, статей..."
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