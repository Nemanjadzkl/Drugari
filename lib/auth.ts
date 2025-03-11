"use server"

import { cookies } from "next/headers"

// In a real app, this would use a proper authentication system
// with password hashing, JWT tokens, etc.

interface UserLoginData {
  name: string
  surname: string
  company: string
}

interface AdminLoginData {
  username: string
  password: string
}

export async function loginUser(data: UserLoginData) {
  // Validate user data
  if (!data.name || !data.surname || !data.company) {
    throw new Error("Sva polja su obavezna")
  }

  // In a real app, this would check the database and create a session
  // For now, we'll just set a cookie with the user info
  const user = {
    id: "user-" + Math.random().toString(36).substring(2, 9),
    name: data.name,
    surname: data.surname,
    company: data.company,
    isAdmin: false,
  }

  // Store user info in a cookie
  cookies().set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return user
}

export async function loginAdmin(data: AdminLoginData) {
  // In a real app, this would validate credentials against the database
  // For demo purposes, we'll use a hardcoded admin
  if (data.username !== "admin" || data.password !== "admin123") {
    throw new Error("Pogrešno korisničko ime ili lozinka")
  }

  const admin = {
    id: "admin-1",
    name: "Admin",
    surname: "Adminović",
    company: "Serpica i drugari",
    isAdmin: true,
  }

  // Store admin info in a cookie
  cookies().set("user", JSON.stringify(admin), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return admin
}

export async function logout() {
  cookies().delete("user")
}

export async function getSession() {
  const userCookie = cookies().get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  return session
}

export async function requireAdmin() {
  const session = await getSession()

  if (!session || !session.isAdmin) {
    throw new Error("Unauthorized")
  }

  return session
}

