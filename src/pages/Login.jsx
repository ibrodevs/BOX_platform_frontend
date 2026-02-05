import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { login as loginAPI, getProfile } from '../services/apiService'
import { useAuthStore } from '../store/authStore'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await loginAPI(formData)
      const tokens = res.data
      
      // Получаем профиль пользователя
      localStorage.setItem('access_token', tokens.access)
      const profileRes = await getProfile()
      
      login(tokens, profileRes.data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || t('errors.invalidCredentials'))
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
            {t('auth.login').toUpperCase()}
          </h1>
          
          <p className="text-center text-gray-400 mb-8">
            {t('auth.loginSubtitle')}
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
              label={t('auth.password')}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              {t('auth.signIn')}
            </Button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline font-bold">
              {t('auth.signUp')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
