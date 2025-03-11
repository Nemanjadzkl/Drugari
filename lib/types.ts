export enum MenuCategory {
  GLAVNO_JELO = "GLAVNO_JELO",
  PRILOG = "PRILOG",
  SALATA = "SALATA",
  CORBA = "CORBA",
}

export enum PortionSize {
  SMALL = "SMALL",
  LARGE = "LARGE",
}

export type MenuItem = {
  id: string
  name: string
  description: string
  category: MenuCategory
  smallPrice: number | null
  largePrice: number
  available: boolean
  imageUrl: string
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

export type User = {
  id: string
  name: string
  surname: string
  company: string
  isAdmin: boolean
  createdAt: Date
}

export type Order = {
  id: string
  userId: string
  note: string | null
  total: number
  paid: boolean
  createdAt: Date
  updatedAt: Date
  user: User
  items: OrderItem[]
}

export type OrderItem = {
  id: string
  orderId: string
  menuItemId: string
  size: PortionSize | null
  quantity: number
  price: number
  menuItem: MenuItem
}

export type Payment = {
  id: string
  userId: string
  amount: number
  date: Date
  note: string | null
  user: User
}

export type CartItem = {
  menuItem: MenuItem
  quantity: number
  size: PortionSize | null
}

