import api from './api'

// Auth
export const register = (userData) => api.post('/auth/register/', userData)
export const login = (credentials) => api.post('/auth/login/', credentials)
export const getProfile = () => api.get('/auth/profile/')

// Courses
export const getCourses = () => api.get('/courses/')
export const getCourse = (slug) => api.get(`/courses/${slug}/`)
export const getCourseProgress = (slug) => api.get(`/courses/${slug}/my_progress/`)

// Lessons
export const getLesson = (id) => api.get(`/courses/lessons/${id}/`)
export const updateLessonProgress = (id, data) => api.post(`/courses/lessons/${id}/progress/`, data)

// Payments
export const createOrder = (courseId) => api.post('/payments/orders/create/', { course_id: courseId })
export const completePayment = (orderId) => api.post(`/payments/orders/${orderId}/complete/`)
export const getMyCourses = () => api.get('/payments/my-courses/')
export const getMyOrders = () => api.get('/payments/orders/')

// AI Coach
export const sendAIMessage = (message) => api.post('/ai-coach/send/', { message })
export const getChatHistory = () => api.get('/ai-coach/history/')
export const clearChatHistory = () => api.delete('/ai-coach/clear/')
