import { getMenuItem } from "@/lib/data"
import { MenuItemForm } from "@/components/menu-item-form"
import { notFound } from "next/navigation"

interface MenuItemEditPageProps {
  params: {
    id: string
  }
}

export default async function MenuItemEditPage({ params }: MenuItemEditPageProps) {
  const menuItem = await getMenuItem(params.id)

  if (!menuItem) {
    notFound()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Izmeni stavku menija</h2>
      <MenuItemForm menuItem={menuItem} />
    </div>
  )
}

