import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminUsersPage() {
  // In a real app, this would fetch users with their balance from the database
  const users = [
    {
      id: "1",
      name: "Marko",
      surname: "Marković",
      company: "Tech Solutions",
      balance: -1500,
      ordersCount: 5,
    },
    {
      id: "2",
      name: "Jovana",
      surname: "Jovanović",
      company: "Design Studio",
      balance: 2000,
      ordersCount: 12,
    },
    {
      id: "3",
      name: "Nikola",
      surname: "Nikolić",
      company: "Marketing Pro",
      balance: -500,
      ordersCount: 3,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Korisnici</h2>
        <div className="w-full max-w-sm">
          <Label htmlFor="search-users" className="sr-only">
            Pretraži korisnike
          </Label>
          <Input id="search-users" placeholder="Pretraži po imenu, prezimenu ili firmi" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pregled korisnika i dugovanja</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Korisnik</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Broj porudžbina</TableHead>
                <TableHead>Stanje</TableHead>
                <TableHead>Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">
                      {user.name} {user.surname}
                    </div>
                  </TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{user.ordersCount}</TableCell>
                  <TableCell>
                    <span className={user.balance < 0 ? "text-red-500" : "text-green-500"}>
                      {formatPrice(user.balance)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/users/${user.id}`}>Detalji</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/admin/payments/new?userId=${user.id}`}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Uplata
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

