import type React from "react"
import { Navbar } from "@/components/navbar"
import { requireAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check if user is admin, redirect if not
  try {
    const session = await requireAdmin()

    return (
      <>
        <Navbar user={session} />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Admin panel</h1>

          <Tabs defaultValue="orders" className="w-full mb-8">
            <TabsList>
              <TabsTrigger value="orders" asChild>
                <Link href="/admin">Porudžbine</Link>
              </TabsTrigger>
              <TabsTrigger value="menu" asChild>
                <Link href="/admin/menu">Meni</Link>
              </TabsTrigger>
              <TabsTrigger value="users" asChild>
                <Link href="/admin/users">Korisnici</Link>
              </TabsTrigger>
              <TabsTrigger value="payments" asChild>
                <Link href="/admin/payments">Uplate</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {children}
        </div>
      </>
    )
  } catch (error) {
    redirect("/login")
  }
}

