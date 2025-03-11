import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { UtensilsCrossed, Clock, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 z-10">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium mb-6">
            Ketering za poslovne korisnike
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Serpica i drugari</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-muted-foreground">Ukusna hrana za vaš tim</h2>
          <p className="text-lg mb-8 max-w-md">
            Sveža, ukusna i raznovrsna hrana dostavljena direktno u vašu firmu. Naručite danas i uživajte u našim
            specijalitetima!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/menu">Pogledaj meni</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/login">Prijavi se</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              <span>Sveže pripremljeno</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Tačna isporuka</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Besplatna dostava</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="relative h-[300px] md:h-[500px] w-full">
            <div className="absolute top-0 right-0 h-64 w-64 md:h-80 md:w-80 bg-primary/10 rounded-full -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 h-40 w-40 md:h-60 md:w-60 bg-primary/10 rounded-full -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
            <Image
              src="/hero-food.jpg"
              alt="Ketering hrana"
              fill
              className="object-cover rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

