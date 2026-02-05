// Утилита для управления купленными курсами в localStorage

const PURCHASED_COURSES_KEY = 'purchasedCourses'

export const purchaseUtils = {
  // Получить список купленных курсов
  getPurchasedCourses() {
    try {
      const purchased = localStorage.getItem(PURCHASED_COURSES_KEY)
      return purchased ? JSON.parse(purchased) : []
    } catch (error) {
      console.error('Error reading purchased courses:', error)
      return []
    }
  },

  // Проверить, куплен ли курс
  isPurchased(courseId) {
    const purchased = this.getPurchasedCourses()
    return purchased.includes(courseId)
  },

  // Купить курс (добавить в список)
  purchaseCourse(courseId) {
    try {
      const purchased = this.getPurchasedCourses()
      if (!purchased.includes(courseId)) {
        purchased.push(courseId)
        localStorage.setItem(PURCHASED_COURSES_KEY, JSON.stringify(purchased))
      }
      return true
    } catch (error) {
      console.error('Error purchasing course:', error)
      return false
    }
  },

  // Удалить покупку (для тестирования)
  removePurchase(courseId) {
    try {
      const purchased = this.getPurchasedCourses()
      const filtered = purchased.filter(id => id !== courseId)
      localStorage.setItem(PURCHASED_COURSES_KEY, JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error removing purchase:', error)
      return false
    }
  },

  // Очистить все покупки (для тестирования)
  clearAllPurchases() {
    try {
      localStorage.removeItem(PURCHASED_COURSES_KEY)
      return true
    } catch (error) {
      console.error('Error clearing purchases:', error)
      return false
    }
  },

  // Получить количество купленных курсов
  getPurchasedCount() {
    return this.getPurchasedCourses().length
  }
}
