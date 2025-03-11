import { getFeaturedMenuItems } from "@/lib/data"
import { MenuItemCard } from "@/components/menu-item-card"

export async function FeaturedItems() {
  // Get featured menu items
  const featuredItems = await getFeaturedMenuItems()

  if (featuredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Trenutno nema istaknutih jela.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

