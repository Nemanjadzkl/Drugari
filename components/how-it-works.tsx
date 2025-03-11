import { CalendarClock, ShoppingCart, Truck, Check } from "lucide-react"

export function HowItWorks() {
  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kako funkcioniše</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Naručivanje hrane za vašu firmu nikada nije bilo jednostavnije
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarClock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Registrujte se</h3>
            <p className="text-muted-foreground">Kreirajte nalog za vašu firmu i počnite da naručujete</p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Izaberite jela</h3>
            <p className="text-muted-foreground">Pregledajte naš meni i dodajte jela u korpu</p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Mi dostavljamo</h3>
            <p className="text-muted-foreground">Dostavljamo hranu direktno u vašu firmu</p>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Uživajte</h3>
            <p className="text-muted-foreground">Uživajte u svežoj i ukusnoj hrani sa vašim timom</p>
          </div>
        </div>
      </div>
    </div>
  )
}

