"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { CalendarClock, Loader2, MapPin, RefreshCw, Search, User as UserIcon, XCircle } from "lucide-react"
import NavBar from "@/components/layout/NaveBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import { normalizeBooking, pickUserEmail, pickUserName } from "@/lib/backend-normalizers"
import type { AuthUser, BookingRecord } from "@/lib/backend-types"
import { toast } from "sonner"

interface UserProfileApiResponse extends AuthUser {
  PhoneNumber?: string
  City?: string
}

const statusStyles: Record<string, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-700",
  confirmed: "border-blue-300 bg-blue-50 text-blue-700",
  completed: "border-emerald-300 bg-emerald-50 text-emerald-700",
  cancelled: "border-rose-300 bg-rose-50 text-rose-700",
}

export default function CustomerDashboard() {
  const [profile, setProfile] = useState<UserProfileApiResponse | null>(null)
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingBookingId, setUpdatingBookingId] = useState("")

  const loadDashboard = async () => {
    setIsLoading(true)
    try {
      const [profileData, bookingsData] = await Promise.all([
        apiClient.get<UserProfileApiResponse>("/users/profile"),
        apiClient.get<BookingRecord[]>("/bookings"),
      ])
      setProfile(profileData)
      setBookings(Array.isArray(bookingsData) ? bookingsData : [])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load dashboard."
      toast.error("Failed to load dashboard", {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadDashboard()
  }, [])

  const bookingStats = useMemo(() => {
    const normalized = bookings.map(normalizeBooking)
    return {
      total: normalized.length,
      active: normalized.filter((booking) => booking.status === "pending" || booking.status === "confirmed").length,
      completed: normalized.filter((booking) => booking.status === "completed").length,
      cancelled: normalized.filter((booking) => booking.status === "cancelled").length,
    }
  }, [bookings])

  const handleCancelBooking = async (bookingId: string) => {
    if (!bookingId) return
    setUpdatingBookingId(bookingId)
    try {
      const updated = await apiClient<BookingRecord>(`/bookings/${bookingId}/cancel`, { method: "PATCH" })
      setBookings((prev) => prev.map((booking) => {
        const normalized = normalizeBooking(booking)
        if (normalized.id !== bookingId) return booking
        return updated
      }))
      toast.success("Booking cancelled")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to cancel booking."
      toast.error("Cancel failed", {
        description: message,
      })
    } finally {
      setUpdatingBookingId("")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff5eb_0%,#fff8f2_40%,#ffffff_100%)] p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Customer Workspace</p>
                <h1 className="mt-1 text-3xl font-semibold text-orange-950">Welcome, {pickUserName(profile)}</h1>
                <p className="mt-2 text-sm text-orange-700">
                  Manage upcoming visits, track completed work, and book trusted providers.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-orange-200 text-orange-700">
                  <Link href="/services">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Services
                  </Link>
                </Button>
                <Button onClick={() => void loadDashboard()} className="bg-orange-600 hover:bg-orange-700">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.total}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Active</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.active}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Completed</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.completed}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Cancelled</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.cancelled}</CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card className="border-orange-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-orange-950">My Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-orange-200 p-8 text-center text-sm text-orange-600">
                    No bookings yet. Book your first service to get started.
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const normalized = normalizeBooking(booking)
                    return (
                      <article
                        key={normalized.id}
                        className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium text-orange-950">
                              {normalized.service?.Title ?? "Service"}
                            </h3>
                            <p className="text-xs text-orange-700">
                              {normalized.service?.Description || "No description provided."}
                            </p>
                            <p className="text-xs text-orange-600">
                              <CalendarClock className="mr-1 inline h-3.5 w-3.5" />
                              {normalized.scheduledAt ? new Date(normalized.scheduledAt).toLocaleString() : "Not scheduled"}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={`border ${statusStyles[normalized.status] || statusStyles.pending}`}>
                              {normalized.status}
                            </Badge>
                            {(normalized.status === "pending" || normalized.status === "confirmed") && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-rose-200 text-rose-700 hover:bg-rose-50"
                                onClick={() => void handleCancelBooking(normalized.id)}
                                disabled={updatingBookingId === normalized.id}
                              >
                                <XCircle className="mr-1 h-3.5 w-3.5" />
                                {updatingBookingId === normalized.id ? "Cancelling..." : "Cancel"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })
                )}
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-950">Profile Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <UserIcon className="h-5 w-5 text-orange-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-950">{pickUserName(profile)}</p>
                    <p className="text-xs text-orange-700">{pickUserEmail(profile)}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-orange-100 p-3">
                  <p className="text-xs uppercase tracking-wide text-orange-500">City</p>
                  <p className="mt-1 text-sm text-orange-900">
                    <MapPin className="mr-1 inline h-3.5 w-3.5" />
                    {profile?.city ?? profile?.City ?? "Not provided"}
                  </p>
                </div>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                  <Link href="/services">Book a New Service</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  )
}
