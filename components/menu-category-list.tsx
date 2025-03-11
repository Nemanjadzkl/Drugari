import type { MenuCategory } from "@/lib/types"
import { getMenuItems } from "@/lib/data"
import { MenuItemCard } from "@/components/menu-item-card"

interface MenuCategoryListProps {
  category: MenuCategory
}

export async function MenuCategoryList({ category }: MenuCategoryListProps) {
  const menuItems = await getMenuItems(category)

  if (menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Trenutno nema dostupnih stavki u ovoj kategoriji.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

