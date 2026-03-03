import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-orange-50/50 p-6 md:p-12 flex items-center justify-center">
      <Card className="w-full max-w-xl border-orange-100">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Need help with your account or service request? Reach us at <span className="font-medium">support@mouthouq.ma</span>.
          </p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
