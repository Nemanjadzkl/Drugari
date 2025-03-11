import { getMenuItems } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { MenuCategory } from "@/lib/types"
import { Pencil, Plus, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { deleteMenuItem } from "@/lib/actions"

export default async function AdminMenuPage() {
  const menuItems = await getMenuItems()

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upravljanje menijem</h2>
        <Button asChild>
          <Link href="/admin/menu/new">
            <Plus className="mr-2 h-4 w-4" />
            Dodaj novu stavku
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <div className="relative h-40 w-full">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=160&width=320"}
                alt={item.name}
                fill
                className="object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 right-2">{getCategoryLabel(item.category)}</Badge>
              {!item.available && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  Nedostupno
                </Badge>
              )}
            </div>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex justify-between">
                <div>
                  {item.smallPrice && (
                    <div className="text-sm">
                      Mala porcija: <span className="font-medium">{formatPrice(item.smallPrice)}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    {item.smallPrice ? "Velika porcija: " : "Cena: "}
                    <span className="font-medium">{formatPrice(item.largePrice)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/menu/${item.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Izmeni
                </Link>
              </Button>
              <form
                action={async () => {
                  "use server"
                  await deleteMenuItem(item.id)
                }}
              >
                <Button variant="destructive" size="sm" type="submit">
                  <Trash className="mr-2 h-4 w-4" />
                  Obriši
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

