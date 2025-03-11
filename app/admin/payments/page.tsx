import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDate, formatPrice } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { DatePicker } from "@/components/date-picker"

export default async function AdminPaymentsPage() {
  // In a real app, this would fetch payments from the database
  const payments = [
    {
      id: "1",
      userId: "1",
      userName: "Marko Marković",
      company: "Tech Solutions",
      amount: 2000,
      date: new Date(2023, 5, 15),
      note: "Uplata za maj",
    },
    {
      id: "2",
      userId: "2",
      userName: "Jovana Jovanović",
      company: "Design Studio",
      amount: 3500,
      date: new Date(2023, 5, 20),
      note: "Uplata za jun",
    },
    {
      id: "3",
      userId: "1",
      userName: "Marko Marković",
      company: "Tech Solutions",
      amount: 1500,
      date: new Date(2023, 6, 5),
      note: "Delimična uplata za jun",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Uplate</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="w-full md:w-auto">
            <Label htmlFor="search-payments" className="sr-only">
              Pretraži uplate
            </Label>
            <Input id="search-payments" placeholder="Pretraži po korisniku" className="w-full md:w-[250px]" />
          </div>
          <DatePicker />
          <Button asChild>
            <Link href="/admin/payments/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova uplata
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Istorija uplata</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Korisnik</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Iznos</TableHead>
                <TableHead>Napomena</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{payment.userName}</div>
                  </TableCell>
                  <TableCell>{payment.company}</TableCell>
                  <TableCell>{formatPrice(payment.amount)}</TableCell>
                  <TableCell>{payment.note || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

