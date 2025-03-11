import { Navbar } from "@/components/navbar"
import { getSession } from "@/lib/auth"
import { MenuCategory } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuCategoryList } from "@/components/menu-category-list"

export default async function MenuPage() {
  const session = await getSession()

  return (
    <>
      <Navbar user={session} />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Naš meni</h1>

        <Tabs defaultValue="GLAVNO_JELO" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="GLAVNO_JELO">Glavna jela</TabsTrigger>
            <TabsTrigger value="PRILOG">Prilozi</TabsTrigger>
            <TabsTrigger value="SALATA">Salate</TabsTrigger>
            <TabsTrigger value="CORBA">Čorbe</TabsTrigger>
          </TabsList>

          <TabsContent value="GLAVNO_JELO">
            <MenuCategoryList category={MenuCategory.GLAVNO_JELO} />
          </TabsContent>

          <TabsContent value="PRILOG">
            <MenuCategoryList category={MenuCategory.PRILOG} />
          </TabsContent>

          <TabsContent value="SALATA">
            <MenuCategoryList category={MenuCategory.SALATA} />
          </TabsContent>

          <TabsContent value="CORBA">
            <MenuCategoryList category={MenuCategory.CORBA} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

