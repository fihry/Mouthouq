"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CheckCircle2, Loader2, RefreshCw, ShieldAlert, UserCog, XCircle } from "lucide-react"
import NavBar from "@/components/layout/NaveBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api-client"
import { normalizeService, pickId, pickUserName } from "@/lib/backend-normalizers"
import type { AuthUser, ProviderVerificationRecord, ServiceRecord } from "@/lib/backend-types"
import { getStoredUser, isAdmin } from "@/lib/session"
import { toast } from "sonner"

interface AdminUserRecord extends AuthUser {
  ID?: string
  Username?: string
  VerificationStatus?: string
  IsVerified?: boolean
  SubscriptionPlan?: string
  CreatedAt?: string
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<AdminUserRecord[]>([])
  const [pendingServices, setPendingServices] = useState<ServiceRecord[]>([])
  const [pendingVerifications, setPendingVerifications] = useState<ProviderVerificationRecord[]>([])
  const [reviewNotesById, setReviewNotesById] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [actionKey, setActionKey] = useState("")

  const viewer = getStoredUser()
  const canAccess = isAdmin(viewer)

  const loadData = useCallback(async () => {
    if (!canAccess) return
    setIsLoading(true)
    try {
      const [usersData, servicesData, verificationsData] = await Promise.all([
        apiClient.get<AdminUserRecord[]>("/admin/users"),
        apiClient.get<ServiceRecord[]>("/admin/services/pending"),
        apiClient.get<ProviderVerificationRecord[]>("/admin/providers/verification/pending"),
      ])
      setUsers(Array.isArray(usersData) ? usersData : [])
      setPendingServices(Array.isArray(servicesData) ? servicesData : [])
      setPendingVerifications(Array.isArray(verificationsData) ? verificationsData : [])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load admin data."
      toast.error("Admin load failed", {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }, [canAccess])

  useEffect(() => {
    void loadData()
  }, [loadData])

  const stats = useMemo(() => {
    return {
      users: users.length,
      services: pendingServices.length,
      verifications: pendingVerifications.length,
    }
  }, [users, pendingServices, pendingVerifications])

  const handleUpdateRole = async (userId: string, role: "user" | "admin") => {
    const key = `role:${userId}`
    setActionKey(key)
    try {
      const updatedUser = await apiClient<AdminUserRecord>(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      })
      setUsers((prev) => prev.map((user) => (pickId(user) === userId ? updatedUser : user)))
      toast.success("Role updated")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update user role."
      toast.error("Role update failed", {
        description: message,
      })
    } finally {
      setActionKey("")
    }
  }

  const handleVerifyService = async (serviceId: string, approve: boolean) => {
    const key = `service:${serviceId}:${approve ? "approve" : "reject"}`
    setActionKey(key)
    try {
      await apiClient<ServiceRecord>(`/admin/services/${serviceId}/verify`, {
        method: "PATCH",
        body: JSON.stringify({
          isVerified: approve,
          isActive: approve,
        }),
      })
      setPendingServices((prev) => prev.filter((service) => pickId(service) !== serviceId))
      toast.success(approve ? "Service approved" : "Service rejected")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update service."
      toast.error("Service moderation failed", {
        description: message,
      })
    } finally {
      setActionKey("")
    }
  }

  const handleReviewVerification = async (
    verificationId: string,
    status: "verified" | "rejected"
  ) => {
    const key = `verification:${verificationId}:${status}`
    setActionKey(key)
    try {
      await apiClient<ProviderVerificationRecord>(`/admin/providers/verification/${verificationId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
          reviewNotes: reviewNotesById[verificationId] ?? "",
        }),
      })
      setPendingVerifications((prev) => prev.filter((item) => pickId(item) !== verificationId))
      toast.success(`Verification ${status}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to review verification."
      toast.error("Verification review failed", {
        description: message,
      })
    } finally {
      setActionKey("")
    }
  }

  if (!canAccess) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
          <Card className="w-full max-w-lg border-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-900">Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-orange-700">
              <p>This page is available only to users with the admin role.</p>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/">Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff2e5_0%,#fff8f2_50%,#ffffff_100%)] p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-3xl border border-orange-100 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Admin Workspace</p>
                <h1 className="mt-1 text-3xl font-semibold text-orange-950">Platform Moderation</h1>
                <p className="mt-2 text-sm text-orange-700">Review users, services, and provider verification requests.</p>
              </div>
              <Button onClick={() => void loadData()} variant="outline" className="border-orange-200 text-orange-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            <Card className="border-orange-100">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-orange-700">Users</CardTitle></CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{stats.users}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-orange-700">Pending Services</CardTitle></CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{stats.services}</CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-orange-700">Pending Verifications</CardTitle></CardHeader>
              <CardContent className="text-3xl font-semibold text-orange-950">{stats.verifications}</CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-950 flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-orange-600" />
                  User Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.length === 0 ? (
                  <p className="text-sm text-orange-600">No users found.</p>
                ) : (
                  users.map((user) => {
                    const userId = pickId(user)
                    const currentRole = user.role ?? user.Role ?? "user"
                    return (
                      <article key={userId} className="rounded-xl border border-orange-100 p-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-medium text-orange-950">{pickUserName(user)}</p>
                            <p className="text-xs text-orange-700">{user.email ?? user.Email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={currentRole}
                              onValueChange={(value: "user" | "admin") => void handleUpdateRole(userId, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">user</SelectItem>
                                <SelectItem value="admin">admin</SelectItem>
                              </SelectContent>
                            </Select>
                            {actionKey === `role:${userId}` && <Loader2 className="h-4 w-4 animate-spin text-orange-500" />}
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
                <CardTitle className="text-xl text-orange-950">Pending Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingServices.length === 0 ? (
                  <p className="text-sm text-orange-600">No pending services.</p>
                ) : (
                  pendingServices.map((service) => {
                    const normalized = normalizeService(service)
                    return (
                      <article key={normalized.id} className="rounded-xl border border-orange-100 p-3">
                        <div className="space-y-2">
                          <p className="font-medium text-orange-950">{normalized.title}</p>
                          <p className="text-xs text-orange-700">{normalized.category} • {normalized.city}</p>
                          <p className="text-xs text-orange-700">{normalized.priceAmount} {normalized.priceCurrency} / {normalized.priceUnit}</p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => void handleVerifyService(normalized.id, true)}
                            disabled={actionKey === `service:${normalized.id}:approve`}
                          >
                            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-rose-200 text-rose-700 hover:bg-rose-50"
                            onClick={() => void handleVerifyService(normalized.id, false)}
                            disabled={actionKey === `service:${normalized.id}:reject`}
                          >
                            <XCircle className="mr-1 h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </div>
                      </article>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-950 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-orange-600" />
                  Provider Verification Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingVerifications.length === 0 ? (
                  <p className="text-sm text-orange-600">No pending verification requests.</p>
                ) : (
                  pendingVerifications.map((verification) => {
                    const verificationId = pickId(verification)
                    return (
                      <article key={verificationId} className="rounded-xl border border-orange-100 p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-1">
                            <p className="font-medium text-orange-950">{pickUserName(verification.User)}</p>
                            <p className="text-xs text-orange-700">Document: {verification.DocumentType}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {(verification.DocumentURLs ?? []).map((url) => (
                                <a
                                  key={url}
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-full border border-orange-200 px-2 py-1 text-[11px] text-orange-700"
                                >
                                  View document
                                </a>
                              ))}
                            </div>
                          </div>
                          <Badge className="border border-amber-300 bg-amber-50 text-amber-700">pending</Badge>
                        </div>

                        <div className="mt-3 space-y-2">
                          <Label htmlFor={`note-${verificationId}`}>Review Notes</Label>
                          <Textarea
                            id={`note-${verificationId}`}
                            value={reviewNotesById[verificationId] ?? ""}
                            onChange={(event) => {
                              const value = event.target.value
                              setReviewNotesById((prev) => ({ ...prev, [verificationId]: value }))
                            }}
                            placeholder="Optional note for the provider."
                            className="min-h-[80px]"
                          />
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => void handleReviewVerification(verificationId, "verified")}
                            disabled={actionKey === `verification:${verificationId}:verified`}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-rose-200 text-rose-700 hover:bg-rose-50"
                            onClick={() => void handleReviewVerification(verificationId, "rejected")}
                            disabled={actionKey === `verification:${verificationId}:rejected`}
                          >
                            Reject
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
    </>
  )
}
