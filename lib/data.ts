import { MenuCategory, type MenuItem, type Order, type Payment, type User } from "./types"

// This is a mock implementation that would be replaced with actual Prisma queries
// in a real application with a database

// Mock data for menu items
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Pileći file u sosu od pečuraka",
    description: "Sočni pileći file u kremastom sosu od pečuraka",
    category: MenuCategory.GLAVNO_JELO,
    smallPrice: 350,
    largePrice: 450,
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
  },
  {
    id: "2",
    name: "Ćufte u paradajz sosu",
    description: "Domaće ćufte u sosu od paradajza",
    category: MenuCategory.GLAVNO_JELO,
    smallPrice: 320,
    largePrice: 420,
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Krompir pire",
    description: "Kremasti krompir pire",
    category: MenuCategory.PRILOG,
    smallPrice: null,
    largePrice: 150,
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Srpska salata",
    description: "Paradajz, krastavac, luk, paprika",
    category: MenuCategory.SALATA,
    smallPrice: null,
    largePrice: 180,
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Pileća supa",
    description: "Domaća pileća supa sa rezancima",
    category: MenuCategory.CORBA,
    smallPrice: null,
    largePrice: 200,
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Function to get menu items by category
export async function getMenuItems(category?: MenuCategory): Promise<MenuItem[]> {
  // In a real app, this would be a Prisma query
  if (category) {
    return mockMenuItems.filter((item) => item.category === category)
  }
  return mockMenuItems
}

// Function to get a single menu item by ID
export async function getMenuItem(id: string): Promise<MenuItem | null> {
  // In a real app, this would be a Prisma query
  const item = mockMenuItems.find((item) => item.id === id)
  return item || null
}

// Function to get featured menu items
export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  // In a real app, this would be a Prisma query
  return mockMenuItems.filter((item) => item.featured === true)
}

// Mock users
const mockUsers: User[] = [
  {
    id: "1",
    name: "Marko",
    surname: "Marković",
    company: "Tech Solutions",
    isAdmin: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Admin",
    surname: "Adminović",
    company: "Serpica i drugari",
    isAdmin: true,
    createdAt: new Date(),
  },
]

// Function to get a user by ID
export async function getUser(id: string): Promise<User | null> {
  // In a real app, this would be a Prisma query
  const user = mockUsers.find((user) => user.id === id)
  return user || null
}

// Mock orders
const mockOrders: Order[] = []

// Function to get orders for a user
export async function getUserOrders(userId: string): Promise<Order[]> {
  // In a real app, this would be a Prisma query
  return mockOrders.filter((order) => order.userId === userId)
}

// Function to get all orders (for admin)
export async function getAllOrders(): Promise<Order[]> {
  // In a real app, this would be a Prisma query
  return mockOrders
}

// Mock payments
const mockPayments: Payment[] = []

// Function to get payments for a user
export async function getUserPayments(userId: string): Promise<Payment[]> {
  // In a real app, this would be a Prisma query
  return mockPayments.filter((payment) => payment.userId === userId)
}

// Function to get all payments (for admin)
export async function getAllPayments(): Promise<Payment[]> {
  // In a real app, this would be a Prisma query
  return mockPayments
}

