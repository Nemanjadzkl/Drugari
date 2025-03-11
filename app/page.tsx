import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FeaturedItems } from "@/components/featured-items"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { getSession } from "@/lib/auth"

export default async function Home() {
  const session = await getSession()

  return (
    <>
      <Navbar user={session} />
      <main className="min-h-screen">
        <HeroSection />

        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Naša popularna jela</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pogledajte našu selekciju najpopularnijih jela koja pripremamo sveža svakog dana i dostavljamo direktno u
              vašu firmu.
            </p>
          </div>

          <FeaturedItems />

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/menu">Pogledaj ceo meni</Link>
            </Button>
          </div>
        </div>

        <HowItWorks />

        <Testimonials />

        <div className="container mx-auto py-16 px-4">
          <Card className="bg-primary/5 border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Spremni da naručite?</CardTitle>
              <CardDescription className="text-lg">
                Prijavite se da biste mogli da naručite hranu iz našeg menija
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="max-w-2xl mx-auto">
                Naša hrana se priprema sveža svakog dana i dostavlja direktno u vašu firmu. Jednostavno se prijavite,
                izaberite jela koja želite i mi ćemo se pobrinuti za ostalo.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/login">Prijavi se</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

