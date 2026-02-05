import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { register as registerAPI } from '../services/apiService'
import { useAuthStore } from '../store/authStore'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password2) {
      setError(t('errors.passwordMismatch'))
      return
    }

    setLoading(true)

    try {
      const res = await registerAPI(formData)
      console.log('Registration response:', res.data)
      
      // Сохраняем токены
      if (res.data.tokens && res.data.user) {
        localStorage.setItem('access_token', res.data.tokens.access)
        localStorage.setItem('refresh_token', res.data.tokens.refresh)
        login(res.data.tokens, res.data.user)
        navigate('/dashboard')
      } else {
        setError(t('errors.authDataFetch'))
      }
    } catch (err) {
      console.error('Registration error:', err)
      const errors = err.response?.data
      if (errors) {
        const errorMessages = Object.values(errors).flat().join('. ')
        setError(errorMessages || t('errors.registrationFailed'))
      } else {
        setError(err.message || t('errors.registrationTryLater'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark border-2 border-gray-800 rounded-lg p-8">
          <h1 className="text-4xl font-black mb-4 text-center">
            {t('auth.register').toUpperCase()}
          </h1>
          
          <p className="text-center text-gray-400 mb-8">
            {t('auth.registerSubtitle')}
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('auth.username')}
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <Input
              label={t('auth.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('auth.firstName')}
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />

              <Input
                label={t('auth.lastName')}
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>

            <Input
              label={t('auth.password')}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              value={formData.password2}
              onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              {t('auth.signUp')}
            </Button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-primary hover:underline font-bold">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
