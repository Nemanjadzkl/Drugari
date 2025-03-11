"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loginUser, loginAdmin } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // User login form state
  const [userForm, setUserForm] = useState({
    name: "",
    surname: "",
    company: "",
  })

  // Admin login form state
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  })

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would validate and authenticate the user
      await loginUser(userForm)
      toast({
        title: "Uspešna prijava",
        description: `Dobrodošli, ${userForm.name}!`,
      })
      router.push("/menu")
    } catch (error) {
      toast({
        title: "Greška pri prijavi",
        description: "Došlo je do greške prilikom prijave. Pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would validate and authenticate the admin
      await loginAdmin(adminForm)
      toast({
        title: "Uspešna prijava",
        description: "Dobrodošli u admin panel!",
      })
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Greška pri prijavi",
        description: "Pogrešno korisničko ime ili lozinka.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="user">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">Korisnik</TabsTrigger>
            <TabsTrigger value="admin">Administrator</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form onSubmit={handleUserLogin}>
              <CardHeader>
                <CardTitle>Korisnička prijava</CardTitle>
                <CardDescription>Unesite svoje podatke da biste naručili hranu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ime</Label>
                  <Input
                    id="name"
                    placeholder="Unesite vaše ime"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Prezime</Label>
                  <Input
                    id="surname"
                    placeholder="Unesite vaše prezime"
                    value={userForm.surname}
                    onChange={(e) => setUserForm({ ...userForm, surname: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Firma</Label>
                  <Input
                    id="company"
                    placeholder="Unesite naziv vaše firme"
                    value={userForm.company}
                    onChange={(e) => setUserForm({ ...userForm, company: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Prijavljivanje..." : "Prijavi se"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin}>
              <CardHeader>
                <CardTitle>Admin prijava</CardTitle>
                <CardDescription>Prijavite se kao administrator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Korisničko ime</Label>
                  <Input
                    id="admin-username"
                    placeholder="Unesite korisničko ime"
                    value={adminForm.username}
                    onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Lozinka</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Unesite lozinku"
                    value={adminForm.password}
                    onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Prijavljivanje..." : "Prijavi se"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

