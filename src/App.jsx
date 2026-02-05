import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import IntroAnimation from './components/IntroAnimation'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Lesson from './pages/Lesson'
import Login from './pages/Login'
import Register from './pages/Register'
import MyCourses from './pages/MyCourses'
import Merch from './pages/Merch'
import Dashboard from './pages/Dashboard'
import CoursePlayer from './pages/CoursePlayer'
import Profile from './pages/Profile'
import Payments from './pages/Payments'
import Orders from './pages/Orders'
import NotFound from './pages/NotFound'
import AIChat from './components/AIChat'
import { useAuthStore } from './store/authStore'

function App() {
  const [showContent, setShowContent] = useState(false)
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <IntroAnimation onComplete={() => setShowContent(true)} />
      <div className={`min-h-screen bg-black flex flex-col ${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - требуют авторизации */}
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/courses/:slug" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
            <Route path="/merch" element={<ProtectedRoute><Merch /></ProtectedRoute>} />
            
            {/* Dashboard Routes - требуют авторизации */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
            <Route path="/dashboard/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
            <Route path="/dashboard/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {isAuthenticated && <AIChat />}
      </div>
    </Router>
  )
}

export default App
