import { getAllOrders } from "@/lib/data"
import { formatDateTime, formatPrice } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { markOrderAsPaid } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <Label htmlFor="filter" className="sr-only">
              Pretraga
            </Label>
            <Input id="filter" placeholder="Pretraži po korisniku ili ID-u" className="w-full md:w-[250px]" />
          </div>
          <div className="w-full md:w-auto">
            <DatePicker />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Izvezi CSV</Button>
          <Button variant="outline">Štampaj</Button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nema porudžbina.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Porudžbina #{order.id.substring(0, 8)}</CardTitle>
                    <CardDescription>
                      {formatDateTime(order.createdAt)} - {order.user.name} {order.user.surname} ({order.user.company})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={order.paid ? "default" : "outline"}>{order.paid ? "Plaćeno" : "Neplaćeno"}</Badge>
                    {!order.paid && (
                      <form
                        action={async () => {
                          "use server"
                          await markOrderAsPaid(order.id)
                        }}
                      >
                        <Button type="submit" size="sm">
                          Označi kao plaćeno
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.menuItem.name}</span>
                          {item.size && (
                            <span className="text-sm text-muted-foreground ml-2">
                              ({item.size === "SMALL" ? "Mala porcija" : "Velika porcija"})
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                        </div>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Ukupno</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>

                  {order.note && (
                    <div className="pt-2">
                      <p className="text-sm font-medium">Napomena:</p>
                      <p className="text-sm text-muted-foreground">{order.note}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

