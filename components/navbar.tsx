"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, User, LogOut } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import { useState, useEffect } from "react"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  user: {
    name: string
    isAdmin: boolean
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues with Zustand
  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount = mounted ? items.reduce((total, item) => total + item.quantity, 0) : 0

  const handleLogout = async () => {
    await logout()
    router.push("/")
    router.refresh()
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center font-semibold">
          Serpica i drugari
        </Link>

        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6">
          <Link
            href="/menu"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/menu") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Meni
          </Link>
          {user && (
            <Link
              href="/orders"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/orders") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Moje porudžbine
            </Link>
          )}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin panel
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <CartSheet />
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline-block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Moj nalog</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Moje porudžbine</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Odjavi se
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Prijavi se</Link>
            </Button>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Serpica i drugari
              </Link>
              <nav className="mt-6 flex flex-col space-y-4">
                <Link
                  href="/menu"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Meni
                </Link>
                {user && (
                  <Link
                    href="/orders"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Moje porudžbine
                  </Link>
                )}
                {user?.isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin panel
                  </Link>
                )}
                {!user && (
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Prijavi se
                  </Link>
                )}
                {user && (
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start px-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    Odjavi se
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

