import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marko Petrović",
      company: "Tech Solutions",
      avatar: "/avatars/avatar-1.jpg",
      content:
        "Serpica i drugari su postali nezamenljiv deo naše svakodnevice. Hrana je uvek sveža, ukusna i stiže tačno na vreme. Naš tim je oduševljen!",
    },
    {
      id: 2,
      name: "Jovana Nikolić",
      company: "Design Studio",
      avatar: "/avatars/avatar-2.jpg",
      content:
        "Odlična usluga i još bolja hrana! Posebno volimo raznovrsnost menija i mogućnost izbora veličine porcije. Preporučujem svim firmama.",
    },
    {
      id: 3,
      name: "Nikola Jovanović",
      company: "Marketing Pro",
      avatar: "/avatars/avatar-3.jpg",
      content:
        "Već godinu dana koristimo usluge Serpice i drugara i nikada nismo bili razočarani. Profesionalna usluga, kvalitetna hrana i odličan odnos cene i kvaliteta.",
    },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Šta kažu naši klijenti</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Pogledajte iskustva firmi koje koriste naše usluge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic">{testimonial.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 border-t pt-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

