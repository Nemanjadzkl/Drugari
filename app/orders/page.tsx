import { Navbar } from "@/components/navbar"
import { requireAuth } from "@/lib/auth"
import { getUserOrders } from "@/lib/data"
import { formatDate, formatPrice } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function OrdersPage() {
  const session = await requireAuth()
  const orders = await getUserOrders(session.id)

  return (
    <>
      <Navbar user={session} />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Moje porudžbine</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Još uvek nemate porudžbina.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Porudžbina #{order.id.substring(0, 8)}</CardTitle>
                      <CardDescription>{formatDate(order.createdAt)}</CardDescription>
                    </div>
                    <Badge variant={order.paid ? "default" : "outline"}>{order.paid ? "Plaćeno" : "Neplaćeno"}</Badge>
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
      </main>
    </>
  )
}

