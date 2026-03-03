import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-orange-50/50 p-6 md:p-12 flex items-center justify-center">
      <Card className="w-full max-w-3xl border-orange-100">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Full legal terms are not published yet. By using Mouthouq, you agree to use the platform lawfully and respect providers and customers.
          </p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
