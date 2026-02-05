import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Добавить товар в корзину
      addItem: (item, quantity = 1, selectedSize = null, selectedColor = null) => {
        const existingItem = get().items.find(
          i => i.id === item.id && 
               i.selectedSize === selectedSize && 
               i.selectedColor === selectedColor
        )
        
        if (existingItem) {
          set({
            items: get().items.map(i =>
              i.id === item.id && 
              i.selectedSize === selectedSize && 
              i.selectedColor === selectedColor
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          })
        } else {
          set({
            items: [...get().items, { 
              ...item, 
              quantity, 
              selectedSize, 
              selectedColor,
              addedAt: Date.now()
            }]
          })
        }
      },
      
      // Удалить товар из корзины
      removeItem: (id, selectedSize, selectedColor) => {
        set({
          items: get().items.filter(
            item => !(item.id === id && 
                     item.selectedSize === selectedSize && 
                     item.selectedColor === selectedColor)
          )
        })
      },
      
      // Обновить количество
      updateQuantity: (id, quantity, selectedSize, selectedColor) => {
        if (quantity <= 0) {
          get().removeItem(id, selectedSize, selectedColor)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      // Очистить корзину
      clearCart: () => set({ items: [] }),
      
      // Получить общее количество товаров
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      // Получить общую стоимость
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      // Проверить, есть ли товар в корзине
      isInCart: (id, selectedSize = null, selectedColor = null) => {
        return get().items.some(
          item => item.id === id && 
                 item.selectedSize === selectedSize && 
                 item.selectedColor === selectedColor
        )
      }
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
)
