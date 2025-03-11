"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuCategory, type MenuItem, PortionSize } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import Image from "next/image"
import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils"
import { PlusCircle, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [selectedSize, setSelectedSize] = useState<PortionSize | null>(item.smallPrice ? PortionSize.LARGE : null)
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues with Zustand
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    addToCart({
      menuItem: item,
      quantity: 1,
      size: selectedSize,
    })

    toast({
      title: "Dodato u korpu",
      description: `${item.name} je dodato u vašu korpu.`,
    })
  }

  const getCategoryLabel = (category: MenuCategory) => {
    switch (category) {
      case MenuCategory.GLAVNO_JELO:
        return "Glavno jelo"
      case MenuCategory.PRILOG:
        return "Prilog"
      case MenuCategory.SALATA:
        return "Salata"
      case MenuCategory.CORBA:
        return "Čorba"
    }
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Badge className="absolute top-2 right-2">{getCategoryLabel(item.category)}</Badge>
        {item.featured && (
          <Badge variant="secondary" className="absolute top-2 left-2 flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Popularno
          </Badge>
        )}
        {!item.available && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Nedostupno
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {item.smallPrice ? (
          <RadioGroup
            value={selectedSize || undefined}
            onValueChange={(value) => setSelectedSize(value as PortionSize)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PortionSize.SMALL} id={`${item.id}-small`} />
              <Label htmlFor={`${item.id}-small`}>Mala porcija ({formatPrice(item.smallPrice)})</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PortionSize.LARGE} id={`${item.id}-large`} />
              <Label htmlFor={`${item.id}-large`}>Velika porcija ({formatPrice(item.largePrice)})</Label>
            </div>
          </RadioGroup>
        ) : (
          <p className="font-medium">{formatPrice(item.largePrice)}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full" disabled={!item.available || !mounted}>
          {item.available ? (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Dodaj u korpu
            </>
          ) : (
            "Trenutno nedostupno"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

