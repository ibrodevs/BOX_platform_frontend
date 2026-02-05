import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // API call to update profile would go here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay
      setMessage({ type: 'success', text: t('profile.updateSuccess') })
    } catch (error) {
      setMessage({ type: 'error', text: t('profile.updateError') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20"
    >
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-black mb-8">{t('profile.title')}</h1>

        {/* Profile Picture */}
        <div className="card mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-red-700 rounded-full flex items-center justify-center text-3xl font-black">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{user?.username}</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="card">
          <h3 className="text-xl font-bold mb-6">{t('profile.personalData')}</h3>
          
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={t('auth.firstName')}
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <Input
                label={t('auth.lastName')}
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <Input
              label={t('auth.username')}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              label={t('auth.email')}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Button type="submit" loading={loading} className="w-full">
              {t('profile.saveChanges')}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="card mt-8">
          <h3 className="text-xl font-bold mb-6">{t('profile.changePassword')}</h3>
          <form className="space-y-6">
            <Input
              label={t('profile.currentPassword')}
              type="password"
              placeholder={t('profile.currentPasswordPlaceholder')}
            />
            <Input
              label={t('profile.newPassword')}
              type="password"
              placeholder={t('profile.newPasswordPlaceholder')}
            />
            <Input
              label={t('profile.confirmPassword')}
              type="password"
              placeholder={t('profile.confirmPasswordPlaceholder')}
            />
            <Button variant="outline" className="w-full">
              {t('profile.updatePassword')}
            </Button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="card mt-8 border-red-600">
          <h3 className="text-xl font-bold mb-4 text-red-500">{t('profile.dangerZone')}</h3>
          <p className="text-gray-400 mb-4">
            {t('profile.deleteWarning')}
          </p>
          <Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white">
            {t('profile.deleteAccount')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
