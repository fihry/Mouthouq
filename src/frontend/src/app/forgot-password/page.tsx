import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-orange-50/50 p-6 md:p-12 flex items-center justify-center">
      <Card className="w-full max-w-md border-orange-100">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900">Password Reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Password reset flow is not implemented yet. Please contact support to recover your account.
          </p>
          <div className="flex gap-3">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-orange-200">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
