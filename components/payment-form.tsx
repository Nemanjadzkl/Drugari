"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPayment } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface PaymentFormProps {
  userId?: string
}

export function PaymentForm({ userId }: PaymentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, this would fetch users from the database
  const users = [
    { id: "1", name: "Marko Marković", company: "Tech Solutions" },
    { id: "2", name: "Jovana Jovanović", company: "Design Studio" },
    { id: "3", name: "Nikola Nikolić", company: "Marketing Pro" },
  ]

  const [formData, setFormData] = useState({
    userId: userId || "",
    amount: "",
    note: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        userId: formData.userId,
        amount: Number.parseFloat(formData.amount),
        note: formData.note || undefined,
      }

      await createPayment(data)
      toast({
        title: "Uspešno dodato",
        description: "Uplata je uspešno evidentirana.",
      })

      router.push("/admin/payments")
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
            <Label htmlFor="userId">Korisnik</Label>
            <Select
              value={formData.userId}
              onValueChange={(value) => setFormData({ ...formData, userId: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Izaberite korisnika" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.company})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Iznos</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Napomena (opciono)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/payments")}>
            Otkaži
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Čuvanje..." : "Evidentiraj uplatu"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

