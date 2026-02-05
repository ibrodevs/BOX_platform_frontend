import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Facebook, Instagram, Youtube, Twitter, MessageCircle, 
  Mail, Phone, MapPin, Shield, Award, Globe, Sparkles,
  ChevronRight, Heart, Send, Trophy, Crown
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: t('footer.social.instagram'), color: 'from-purple-600 to-pink-600' },
    { icon: Youtube, href: '#', label: t('footer.social.youtube'), color: 'from-red-600 to-red-700' },
    { icon: Facebook, href: '#', label: t('footer.social.facebook'), color: 'from-blue-600 to-blue-700' },
    { icon: Twitter, href: '#', label: t('footer.social.twitter'), color: 'from-sky-500 to-blue-500' },
    { icon: MessageCircle, href: '#', label: t('footer.social.telegram'), color: 'from-blue-400 to-blue-500' },
  ]

  const footerLinks = [
    {
      title: t('footer.links.school.title'),
      links: [
        { label: t('footer.links.school.items.about'), to: '/about' },
        { label: t('footer.links.school.items.mission'), to: '/mission' },
        { label: t('footer.links.school.items.coaches'), to: '/coaches' },
        { label: t('footer.links.school.items.testimonials'), to: '/testimonials' },
        { label: t('footer.links.school.items.careers'), to: '/careers' },
      ]
    },
    {
      title: t('footer.links.courses.title'),
      links: [
        { label: t('footer.links.courses.items.all'), to: '/courses' },
        { label: t('footer.links.courses.items.beginner'), to: '/courses/beginner' },
        { label: t('footer.links.courses.items.advanced'), to: '/courses/advanced' },
        { label: t('footer.links.courses.items.pro'), to: '/courses/pro' },
        { label: t('footer.links.courses.items.plans'), to: '/plans' },
      ]
    },
    {
      title: t('footer.links.support.title'),
      links: [
        { label: t('footer.links.support.items.help'), to: '/help' },
        { label: t('footer.links.support.items.faq'), to: '/faq' },
        { label: t('footer.links.support.items.contact'), to: '/contact' },
        { label: t('footer.links.support.items.status'), to: '/status' },
        { label: t('footer.links.support.items.community'), to: '/community' },
      ]
    },
    {
      title: t('footer.links.legal.title'),
      links: [
        { label: t('footer.links.legal.items.privacy'), to: '/privacy' },
        { label: t('footer.links.legal.items.terms'), to: '/terms' },
        { label: t('footer.links.legal.items.refund'), to: '/refund' },
        { label: t('footer.links.legal.items.cookies'), to: '/cookies' },
        { label: t('footer.links.legal.items.licenses'), to: '/licenses' },
      ]
    }
  ]

  const contactInfo = [
    { icon: Mail, text: t('footer.contact.email'), href: 'mailto:support@bivolboxing.com' },
    { icon: Phone, text: t('footer.contact.phone'), href: 'tel:+996XXXXXXXXX' },
    { icon: MapPin, text: t('footer.contact.location'), href: '#' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #666 1px, transparent 1px),
                             linear-gradient(to bottom, #666 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Brand & Social */}
          <div>
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center"
                >
                  <Trophy className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <div className="text-3xl font-black text-white">BIVOL SCHOOL</div>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-300">{t('footer.badges.certified')}</span>
                <Shield className="w-6 h-6 text-green-500" />
                <span className="text-gray-300">{t('footer.badges.securePayments')}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4">{t('footer.socialTitle')}</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`group relative p-3 rounded-xl bg-gradient-to-br ${social.color} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <social.icon className="w-5 h-5 text-white relative z-10" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-4">{t('footer.contactsTitle')}</h4>
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <contact.icon className="w-5 h-5" />
                  <span>{contact.text}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, colIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIndex * 0.1 }}
              >
                <h4 className="font-bold text-lg mb-4 text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (colIndex * 0.05) + (linkIndex * 0.05) }}
                    >
                      <Link
                        to={link.to}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* App Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-red-600 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{t('footer.app.title')}</h4>
                <p className="text-gray-400">{t('footer.app.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black hover:bg-gray-900 rounded-xl border border-gray-800 flex items-center gap-3 transition-colors"
              >
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">{t('footer.app.downloadOn')}</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black hover:bg-gray-900 rounded-xl border border-gray-800 flex items-center gap-3 transition-colors"
              >
                <div className="text-2xl">🤖</div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">{t('footer.app.getItOn')}</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              <p>{t('footer.copyright', { year: 2026 })}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <select className="bg-transparent text-gray-400 focus:outline-none">
                  <option>{t('languages.ru')}</option>
                  <option>{t('languages.en')}</option>
                  <option>{t('languages.es')}</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm">{t('footer.sslProtected')}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Stripe_Logo%2C_revised_2016.svg" 
                  alt="Stripe" 
                  className="h-6 opacity-50"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                  alt="Visa" 
                  className="h-6 opacity-50"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard" 
                  className="h-6 opacity-50"
                />
              </div>
            </div>
          </div>
          
          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-600 shadow-lg shadow-primary/30 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-white transform rotate-270 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}