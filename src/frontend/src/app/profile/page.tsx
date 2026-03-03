"use client"

import { useEffect, useState } from "react"
import { Loader2, Save } from "lucide-react"
import NavBar from "@/components/layout/NaveBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api-client"
import type { AuthUser } from "@/lib/backend-types"
import { updateStoredUser } from "@/lib/session"
import { toast } from "sonner"

interface UserProfileApiResponse extends AuthUser {
  Username?: string
  PhoneNumber?: string
  Address?: string
  City?: string
  ProfileImage?: string
}

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  city: string
  address: string
  profileImage: string
}

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    profileImage: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const data = await apiClient.get<UserProfileApiResponse>("/users/profile")
      setForm({
        firstName: data.firstName ?? data.FirstName ?? "",
        lastName: data.lastName ?? data.LastName ?? "",
        email: data.email ?? data.Email ?? "",
        phoneNumber: data.PhoneNumber ?? "",
        city: data.city ?? data.City ?? "",
        address: data.Address ?? "",
        profileImage: data.profileImage ?? data.ProfileImage ?? "",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load profile."
      toast.error("Profile load failed", {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProfile()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updated = await apiClient.put<UserProfileApiResponse, Partial<ProfileForm>>("/users/profile", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        profileImage: form.profileImage.trim(),
      })

      const nextFirstName = updated.firstName ?? updated.FirstName ?? form.firstName
      const nextLastName = updated.lastName ?? updated.LastName ?? form.lastName
      const nextEmail = updated.email ?? updated.Email ?? form.email
      updateStoredUser({ firstName: nextFirstName, lastName: nextLastName, email: nextEmail })

      toast.success("Profile updated")
      await loadProfile()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile."
      toast.error("Update failed", {
        description: message,
      })
    } finally {
      setIsSaving(false)
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff3e6_0%,#fff8f2_50%,#ffffff_100%)] p-6 md:p-10">
        <div className="mx-auto max-w-3xl">
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-950">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={(event) => setForm((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    value={form.profileImage}
                    onChange={(event) => setForm((prev) => ({ ...prev, profileImage: event.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={form.address}
                  onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                  className="min-h-[90px]"
                />
              </div>

              <Button onClick={() => void handleSave()} disabled={isSaving} className="bg-orange-600 hover:bg-orange-700">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
