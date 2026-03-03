"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { BadgeCheck, CheckCircle2, FileUp, Loader2, Plus, RefreshCw, ShieldAlert, ShieldCheck, UserRound, XCircle } from "lucide-react"
import NavBar from "@/components/layout/NaveBar"
import { CreateServiceModal } from "@/components/services/CreateServiceModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api-client"
import { normalizeBooking, normalizeService, pickId, pickUserName } from "@/lib/backend-normalizers"
import type { AuthUser, BookingRecord, ProviderVerificationRecord, ServiceRecord, ServicesListResponse, UploadResult } from "@/lib/backend-types"
import { toast } from "sonner"

interface UserProfileApiResponse extends AuthUser {
  VerificationStatus?: "unverified" | "pending" | "verified" | "rejected"
}

const statusStyles: Record<string, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-700",
  confirmed: "border-blue-300 bg-blue-50 text-blue-700",
  completed: "border-emerald-300 bg-emerald-50 text-emerald-700",
  cancelled: "border-rose-300 bg-rose-50 text-rose-700",
}

const verificationStyles: Record<string, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-700",
  verified: "border-emerald-300 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-300 bg-rose-50 text-rose-700",
  unverified: "border-slate-300 bg-slate-50 text-slate-700",
}

export default function ProfessionalDashboard() {
  const [profile, setProfile] = useState<UserProfileApiResponse | null>(null)
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [providerServices, setProviderServices] = useState<ServiceRecord[]>([])
  const [verification, setVerification] = useState<ProviderVerificationRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookingActionKey, setBookingActionKey] = useState("")
  const [serviceActionKey, setServiceActionKey] = useState("")
  const [serviceDrafts, setServiceDrafts] = useState<Record<string, { title: string; priceAmount: string; city: string }>>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [documentType, setDocumentType] = useState("id_card")
  const [verificationNotes, setVerificationNotes] = useState("")
  const [documentUrls, setDocumentUrls] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [isSubmittingVerification, setIsSubmittingVerification] = useState(false)

  const loadDashboard = async () => {
    setIsLoading(true)
    try {
      const [profileData, bookingsData] = await Promise.all([
        apiClient.get<UserProfileApiResponse>("/users/profile"),
        apiClient.get<BookingRecord[]>("/bookings"),
      ])

      setProfile(profileData)
      setBookings(Array.isArray(bookingsData) ? bookingsData : [])

      const providerId = pickId(profileData)
      if (providerId) {
        const servicesData = await apiClient.get<ServicesListResponse>("/services", {
          params: { providerId, page: 1, limit: 100, sort: "newest" },
        })
        const services = Array.isArray(servicesData.data) ? servicesData.data : []
        setProviderServices(services)
        setServiceDrafts(
          services.reduce<Record<string, { title: string; priceAmount: string; city: string }>>((acc, service) => {
            const normalized = normalizeService(service)
            acc[normalized.id] = {
              title: normalized.title,
              priceAmount: String(normalized.priceAmount),
              city: normalized.city,
            }
            return acc
          }, {})
        )
      } else {
        setProviderServices([])
      }

      try {
        const verificationData = await apiClient.get<ProviderVerificationRecord>("/providers/verification")
        setVerification(verificationData)
        setDocumentType(verificationData.DocumentType ?? "id_card")
        setVerificationNotes(verificationData.Notes ?? "")
        setDocumentUrls(Array.isArray(verificationData.DocumentURLs) ? verificationData.DocumentURLs : [])
      } catch {
        setVerification(null)
      }
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
      pending: normalized.filter((booking) => booking.status === "pending").length,
      confirmed: normalized.filter((booking) => booking.status === "confirmed").length,
      completed: normalized.filter((booking) => booking.status === "completed").length,
    }
  }, [bookings])

  const verificationState = verification?.Status ?? profile?.VerificationStatus ?? "unverified"

  const handleBookingAction = async (
    bookingId: string,
    action: "confirm" | "complete" | "cancel"
  ) => {
    if (!bookingId) return
    const key = `${action}:${bookingId}`
    setBookingActionKey(key)

    try {
      const updated = await apiClient<BookingRecord>(`/bookings/${bookingId}/${action}`, { method: "PATCH" })
      setBookings((prev) => prev.map((booking) => {
        const normalized = normalizeBooking(booking)
        if (normalized.id !== bookingId) return booking
        return updated
      }))
      toast.success(`Booking ${action}ed`)
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to ${action} booking.`
      toast.error(`Unable to ${action}`, {
        description: message,
      })
    } finally {
      setBookingActionKey("")
    }
  }

  const handleUploadDocument = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("purpose", "provider-doc")
    formData.append("file", selectedFile)

    setIsUploadingFile(true)
    try {
      const result = await apiClient<UploadResult>("/uploads", {
        method: "POST",
        body: formData,
      })

      setDocumentUrls((prev) => [...prev, result.url])
      setSelectedFile(null)
      toast.success("Document uploaded")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload document."
      toast.error("Upload failed", {
        description: message,
      })
    } finally {
      setIsUploadingFile(false)
    }
  }

  const handleSaveService = async (serviceId: string) => {
    const draft = serviceDrafts[serviceId]
    if (!draft) return

    setServiceActionKey(`save:${serviceId}`)
    try {
      const updated = await apiClient.put<ServiceRecord>(`/services/${serviceId}`, {
        title: draft.title.trim(),
        city: draft.city.trim(),
        priceAmount: Number.parseFloat(draft.priceAmount),
      })

      setProviderServices((prev) => prev.map((service) => (pickId(service) === serviceId ? updated : service)))
      toast.success("Service updated")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update service."
      toast.error("Update failed", {
        description: message,
      })
    } finally {
      setServiceActionKey("")
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    setServiceActionKey(`delete:${serviceId}`)
    try {
      await apiClient.delete(`/services/${serviceId}`)
      setProviderServices((prev) => prev.filter((service) => pickId(service) !== serviceId))
      setServiceDrafts((prev) => {
        const copy = { ...prev }
        delete copy[serviceId]
        return copy
      })
      toast.success("Service deleted")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete service."
      toast.error("Delete failed", {
        description: message,
      })
    } finally {
      setServiceActionKey("")
    }
  }

  const handleSubmitVerification = async () => {
    if (!documentUrls.length) {
      toast.error("Verification documents required")
      return
    }

    setIsSubmittingVerification(true)
    try {
      const result = await apiClient.post<ProviderVerificationRecord>("/providers/verification", {
        documentType,
        documentUrls,
        notes: verificationNotes.trim(),
      })
      setVerification(result)
      toast.success("Verification submitted", {
        description: "Your request is now pending admin review.",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit verification."
      toast.error("Verification failed", {
        description: message,
      })
    } finally {
      setIsSubmittingVerification(false)
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff3e6_0%,#fff7ef_45%,#ffffff_100%)] p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-3xl border border-orange-100 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Provider Workspace</p>
                <h1 className="mt-1 text-3xl font-semibold text-orange-950">Welcome, {pickUserName(profile)}</h1>
                <p className="mt-2 text-sm text-orange-700">
                  Manage requests, complete jobs, and maintain your verification status.
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Service
                </Button>
                <Button variant="outline" className="border-orange-200 text-orange-700" onClick={() => void loadDashboard()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Total Requests</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.total}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Pending</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.pending}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Confirmed</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.confirmed}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-700">Completed</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{bookingStats.completed}</CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-950">Customer Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-orange-200 p-8 text-center text-sm text-orange-600">
                    No requests yet. Create services and wait for customer bookings.
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
                            <h3 className="font-medium text-orange-950">{normalized.service?.Title ?? "Service"}</h3>
                            <p className="text-xs text-orange-700 flex items-center gap-1">
                              <UserRound className="h-3.5 w-3.5" />
                              {pickUserName(normalized.customer)}
                            </p>
                            <p className="text-xs text-orange-600">
                              {normalized.scheduledAt ? new Date(normalized.scheduledAt).toLocaleString() : "Not scheduled"}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={`border ${statusStyles[normalized.status] || statusStyles.pending}`}>
                              {normalized.status}
                            </Badge>

                            {normalized.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => void handleBookingAction(normalized.id, "confirm")}
                                disabled={bookingActionKey === `confirm:${normalized.id}`}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                                Confirm
                              </Button>
                            )}

                            {normalized.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => void handleBookingAction(normalized.id, "complete")}
                                disabled={bookingActionKey === `complete:${normalized.id}`}
                                className="bg-emerald-600 hover:bg-emerald-700"
                              >
                                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                Complete
                              </Button>
                            )}

                            {(normalized.status === "pending" || normalized.status === "confirmed") && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-rose-200 text-rose-700 hover:bg-rose-50"
                                onClick={() => void handleBookingAction(normalized.id, "cancel")}
                                disabled={bookingActionKey === `cancel:${normalized.id}`}
                              >
                                <XCircle className="mr-1 h-3.5 w-3.5" />
                                Cancel
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
                <CardTitle className="text-xl text-orange-950">Provider Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
                  <p className="text-xs uppercase tracking-wide text-orange-500">Current status</p>
                  <Badge className={`mt-2 border ${verificationStyles[verificationState] || verificationStyles.unverified}`}>
                    {verificationState}
                  </Badge>
                  {verification?.ReviewNotes && (
                    <p className="mt-2 text-xs text-orange-700">{verification.ReviewNotes}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id_card">ID Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="license">License</SelectItem>
                      <SelectItem value="business_registration">Business Registration</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={verificationNotes}
                    onChange={(event) => setVerificationNotes(event.target.value)}
                    placeholder="Add supporting details for the admin review team."
                    className="min-h-[90px]"
                  />
                </div>

                <div className="space-y-2 rounded-xl border border-dashed border-orange-200 p-3">
                  <Label htmlFor="verification-file">Upload Document</Label>
                  <Input
                    id="verification-file"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      setSelectedFile(file ?? null)
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-orange-200 text-orange-700"
                    onClick={() => void handleUploadDocument()}
                    disabled={!selectedFile || isUploadingFile}
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    {isUploadingFile ? "Uploading..." : "Upload File"}
                  </Button>

                  {documentUrls.length > 0 && (
                    <div className="space-y-2">
                      {documentUrls.map((url) => (
                        <div key={url} className="flex items-center justify-between rounded-lg bg-white p-2 text-xs">
                          <a className="max-w-[200px] truncate text-orange-700 underline" href={url} target="_blank" rel="noreferrer">
                            {url}
                          </a>
                          <button
                            type="button"
                            className="text-rose-600"
                            onClick={() => setDocumentUrls((prev) => prev.filter((item) => item !== url))}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => void handleSubmitVerification()}
                  disabled={isSubmittingVerification || documentUrls.length === 0}
                >
                  {isSubmittingVerification ? "Submitting..." : "Submit Verification"}
                </Button>

                <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
                  <p className="flex items-start gap-2">
                    {verificationState === "verified" ? (
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    Verification unlocks higher trust visibility and better ranking for your services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-2xl border border-orange-100 bg-white p-5">
            <p className="text-sm text-orange-700">
              Need customer-side preview?{" "}
              <Link href="/services" className="font-medium text-orange-900 underline">
                Open marketplace
              </Link>
            </p>
          </section>

          <section>
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-950">My Live Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {providerServices.length === 0 ? (
                  <p className="text-sm text-orange-600">
                    No active verified services found yet. Once approved by admin, they appear here.
                  </p>
                ) : (
                  providerServices.map((service) => {
                    const normalized = normalizeService(service)
                    const draft = serviceDrafts[normalized.id] ?? {
                      title: normalized.title,
                      priceAmount: String(normalized.priceAmount),
                      city: normalized.city,
                    }
                    return (
                      <article key={normalized.id} className="rounded-xl border border-orange-100 p-4">
                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                              value={draft.title}
                              onChange={(event) => {
                                const value = event.target.value
                                setServiceDrafts((prev) => ({ ...prev, [normalized.id]: { ...draft, title: value } }))
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Price (MAD)</Label>
                            <Input
                              type="number"
                              value={draft.priceAmount}
                              onChange={(event) => {
                                const value = event.target.value
                                setServiceDrafts((prev) => ({ ...prev, [normalized.id]: { ...draft, priceAmount: value } }))
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>City</Label>
                            <Input
                              value={draft.city}
                              onChange={(event) => {
                                const value = event.target.value
                                setServiceDrafts((prev) => ({ ...prev, [normalized.id]: { ...draft, city: value } }))
                              }}
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => void handleSaveService(normalized.id)}
                            disabled={serviceActionKey === `save:${normalized.id}`}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-rose-200 text-rose-700 hover:bg-rose-50"
                            onClick={() => void handleDeleteService(normalized.id)}
                            disabled={serviceActionKey === `delete:${normalized.id}`}
                          >
                            Delete
                          </Button>
                        </div>
                      </article>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => void loadDashboard()}
      />
    </>
  )
}
