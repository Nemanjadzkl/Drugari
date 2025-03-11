"use client"

import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { PortionSize } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import { createOrder } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

export function CartSheet() {
  const router = useRouter()
  const { toast } = useToast()
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues with Zustand
  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItems = mounted ? items : []
  const total = mounted ? getTotal() : 0

  const handleCheckout = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would create an order in the database
      await createOrder({
        items: cartItems,
        note,
        total,
      })

      clearCart()
      toast({
        title: "Porudžbina uspešno poslata",
        description: "Vaša porudžbina je uspešno primljena.",
      })
      router.push("/orders")
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom slanja porudžbine. Pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSizeLabel = (size: PortionSize | null) => {
    if (!size) return ""
    return size === PortionSize.SMALL ? "Mala porcija" : "Velika porcija"
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle>Korpa</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium">Vaša korpa je prazna</p>
            <p className="text-sm text-muted-foreground">Dodajte nešto iz menija da biste naručili</p>
          </div>
          <Button onClick={() => router.push("/menu")}>Pogledaj meni</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>Korpa</SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 py-4">
          {cartItems.map((item) => {
            const itemPrice =
              item.size === PortionSize.SMALL && item.menuItem.smallPrice
                ? item.menuItem.smallPrice
                : item.menuItem.largePrice

            return (
              <div key={`${item.menuItem.id}-${item.size}`} className="flex items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={item.menuItem.imageUrl || "/placeholder.svg?height=64&width=64"}
                    alt={item.menuItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{item.menuItem.name}</h4>
                      {item.size && <p className="text-xs text-muted-foreground">{getSizeLabel(item.size)}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(itemPrice * item.quantity)}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x {formatPrice(itemPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.menuItem.id, item.size, item.quantity - 1)
                        } else {
                          removeFromCart(item.menuItem.id, item.size)
                        }
                      }}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Smanji količinu</span>
                    </Button>
                    <span className="w-4 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.menuItem.id, item.size, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Povećaj količinu</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-7 w-7"
                      onClick={() => removeFromCart(item.menuItem.id, item.size)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Ukloni</span>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
      <div className="space-y-4 pt-4">
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Ukupno</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium">
            Napomena za porudžbinu
          </label>
          <Textarea
            id="note"
            placeholder="Posebni zahtevi, alergije, itd."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        <Button className="w-full" onClick={handleCheckout} disabled={isSubmitting}>
          {isSubmitting ? "Slanje porudžbine..." : "Naruči"}
        </Button>
      </div>
    </div>
  )
}

