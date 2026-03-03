"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Briefcase, Info, Loader2, CheckCircle, UploadCloud } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { UploadResult } from "@/lib/backend-types"
import { toast } from "sonner"

interface CreateServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export const CreateServiceModal = ({ isOpen, onClose, onSuccess }: CreateServiceModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priceAmount: "",
        priceUnit: "job",
        city: "Casablanca",
        tags: "",
        imageUrl: "",
    })
    const [uploadedImages, setUploadedImages] = useState<string[]>([])

    const supportedCategories = [
        "Plumbing",
        "Electrical",
        "Electrical Work",
        "Cleaning",
        "House Cleaning",
        "Painting",
        "Carpentry",
        "HVAC",
        "AC Repair",
        "Landscaping",
        "Moving",
        "Pest Control",
        "Appliance Repair",
        "Handyman",
    ]

    const handleUploadImage = async () => {
        if (!selectedImageFile) return

        const payload = new FormData()
        payload.append("purpose", "service-image")
        payload.append("file", selectedImageFile)

        setIsUploadingImage(true)
        try {
            const result = await apiClient<UploadResult>("/uploads", {
                method: "POST",
                body: payload,
            })
            setUploadedImages((prev) => [...prev, result.url])
            setSelectedImageFile(null)
            toast.success("Service image uploaded")
        } catch (error) {
            const message = error instanceof Error ? error.message : "Image upload failed."
            toast.error("Upload failed", {
                description: message,
            })
        } finally {
            setIsUploadingImage(false)
        }
    }

    const handleSubmit = async () => {
        const manualImage = formData.imageUrl.trim()
        const imageList = [...uploadedImages, ...(manualImage ? [manualImage] : [])]
        if (!imageList.length) {
            toast.error("Service image required", {
                description: "Upload an image or provide a valid image URL.",
            })
            return
        }

        setIsLoading(true)
        try {
            await apiClient.post("/services", {
                ...formData,
                priceAmount: parseFloat(formData.priceAmount),
                priceCurrency: "MAD",
                priceUnit: formData.priceUnit,
                images: imageList,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            })

            toast.success("Service Created!", {
                description: "Our AI is currently verifying your listing details.",
            })

            setStep(3) // Success step
            if (onSuccess) onSuccess()
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Please check your information."
            toast.error("Creation Failed", {
                description: message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Service Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Professional Deep Cleaning"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(v) => setFormData({ ...formData, category: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {supportedCategories.map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => setStep(2)} disabled={!formData.title || !formData.category}>
                                Next Step
                            </Button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="description">Detailed Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your service in detail. Good descriptions get 3x more bookings!"
                                className="min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <p className="text-xs text-orange-600 flex items-center">
                                <Info className="h-3 w-3 mr-1" />
                                AI verified badge is awarded to detailed descriptions.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Base Price (MAD)</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="0.00"
                                value={formData.priceAmount}
                                onChange={(e) => setFormData({ ...formData, priceAmount: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priceUnit">Price Unit</Label>
                            <Select
                                value={formData.priceUnit}
                                onValueChange={(value) => setFormData({ ...formData, priceUnit: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="job">Per Job</SelectItem>
                                    <SelectItem value="hour">Per Hour</SelectItem>
                                    <SelectItem value="day">Per Day</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input
                                id="tags"
                                placeholder="Emergency, Weekend, Certified"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2 rounded-lg border border-orange-100 p-3">
                            <Label htmlFor="serviceImage">Service Image Upload</Label>
                            <Input
                                id="serviceImage"
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={(event) => {
                                    const file = event.target.files?.[0]
                                    setSelectedImageFile(file ?? null)
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full border-orange-200 text-orange-700"
                                onClick={() => void handleUploadImage()}
                                disabled={!selectedImageFile || isUploadingImage}
                            >
                                <UploadCloud className="mr-2 h-4 w-4" />
                                {isUploadingImage ? "Uploading..." : "Upload Image"}
                            </Button>
                            {uploadedImages.length > 0 && (
                                <div className="space-y-1">
                                    {uploadedImages.map((url) => (
                                        <div key={url} className="flex items-center justify-between text-xs rounded bg-orange-50 p-2">
                                            <span className="truncate max-w-[220px] text-orange-700">{url}</span>
                                            <button
                                                type="button"
                                                className="text-rose-600"
                                                onClick={() => setUploadedImages((prev) => prev.filter((item) => item !== url))}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Label htmlFor="imageUrl">Or Image URL</Label>
                            <Input
                                id="imageUrl"
                                placeholder="https://example.com/service-image.jpg"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading || !formData.description || !formData.priceAmount}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                List Service
                            </Button>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Listing Submitted!</h3>
                            <p className="text-gray-500 max-w-[280px]">
                                Your service is now being analyzed by our Trust AI. It will appear on the marketplace shortly.
                            </p>
                        </div>
                        <Button className="w-full" onClick={onClose}>Done</Button>
                    </div>
                )
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                {step < 3 && (
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-orange-900">
                            <Briefcase className="h-5 w-5 mr-2 text-orange-600" />
                            List New Service
                        </DialogTitle>
                        <DialogDescription>
                            Step {step} of 2. Create a compelling listing for your customers.
                        </DialogDescription>
                    </DialogHeader>
                )}
                {renderStep()}
            </DialogContent>
        </Dialog>
    )
}
