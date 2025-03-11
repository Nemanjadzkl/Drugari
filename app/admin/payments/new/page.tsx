import { PaymentForm } from "@/components/payment-form"

export default function NewPaymentPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nova uplata</h2>
      <PaymentForm userId={searchParams.userId} />
    </div>
  )
}

