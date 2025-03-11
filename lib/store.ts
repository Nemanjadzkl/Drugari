import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type CartItem, PortionSize } from "@/lib/types"

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (menuItemId: string, size: PortionSize | null) => void
  updateQuantity: (menuItemId: string, size: PortionSize | null, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (cartItem) => {
        const { menuItem, quantity, size } = cartItem
        const items = get().items
        const existingItemIndex = items.findIndex((item) => item.menuItem.id === menuItem.id && item.size === size)

        if (existingItemIndex !== -1) {
          // Item already exists, update quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // Add new item
          set({ items: [...items, cartItem] })
        }
      },

      removeFromCart: (menuItemId, size) => {
        const items = get().items
        const updatedItems = items.filter((item) => !(item.menuItem.id === menuItemId && item.size === size))
        set({ items: updatedItems })
      },

      updateQuantity: (menuItemId, size, quantity) => {
        const items = get().items
        const updatedItems = items.map((item) => {
          if (item.menuItem.id === menuItemId && item.size === size) {
            return { ...item, quantity }
          }
          return item
        })
        set({ items: updatedItems })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price =
            item.size === PortionSize.SMALL && item.menuItem.smallPrice
              ? item.menuItem.smallPrice
              : item.menuItem.largePrice
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

