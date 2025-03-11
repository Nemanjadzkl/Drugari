"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { MenuCategory, type MenuItem } from "@/lib/types"
import { createMenuItem, updateMenuItem } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface MenuItemFormProps {
  menuItem?: MenuItem
}

export function MenuItemForm({ menuItem }: MenuItemFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: menuItem?.name || "",
    description: menuItem?.description || "",
    category: menuItem?.category || MenuCategory.GLAVNO_JELO,
    smallPrice: menuItem?.smallPrice?.toString() || "",
    largePrice: menuItem?.largePrice?.toString() || "",
    available: menuItem?.available ?? true,
    imageUrl: menuItem?.imageUrl || "/placeholder.svg?height=200&width=400",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        smallPrice: formData.smallPrice ? Number.parseFloat(formData.smallPrice) : null,
        largePrice: Number.parseFloat(formData.largePrice),
        available: formData.available,
        imageUrl: formData.imageUrl,
      }

      if (menuItem) {
        // Update existing menu item
        await updateMenuItem(menuItem.id, data)
        toast({
          title: "Uspešno ažurirano",
          description: "Stavka menija je uspešno ažurirana.",
        })
      } else {
        // Create new menu item
        await createMenuItem(data)
        toast({
          title: "Uspešno dodato",
          description: "Nova stavka menija je uspešno dodata.",
        })
      }

      router.push("/admin/menu")
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom čuvanja. Pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Naziv</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Kategorija</Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as MenuCategory })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MenuCategory.GLAVNO_JELO} id="glavno_jelo" />
                <Label htmlFor="glavno_jelo">Glavno jelo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MenuCategory.PRILOG} id="prilog" />
                <Label htmlFor="prilog">Prilog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MenuCategory.SALATA} id="salata" />
                <Label htmlFor="salata">Salata</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MenuCategory.CORBA} id="corba" />
                <Label htmlFor="corba">Čorba</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smallPrice">Cena male porcije (opciono)</Label>
              <Input
                id="smallPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.smallPrice}
                onChange={(e) => setFormData({ ...formData, smallPrice: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="largePrice">Cena velike/standardne porcije</Label>
              <Input
                id="largePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.largePrice}
                onChange={(e) => setFormData({ ...formData, largePrice: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL slike</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
            />
            <Label htmlFor="available">Dostupno</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/menu")}>
            Otkaži
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Čuvanje..." : menuItem ? "Sačuvaj izmene" : "Dodaj stavku"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

