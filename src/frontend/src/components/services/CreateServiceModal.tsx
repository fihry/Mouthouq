"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
import { Briefcase, Info, Loader2, CheckCircle } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

interface CreateServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export const CreateServiceModal = ({ isOpen, onClose, onSuccess }: CreateServiceModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priceAmount: "",
        city: "Casablanca",
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await apiClient.post("/services", {
                ...formData,
                priceAmount: parseFloat(formData.priceAmount),
                priceCurrency: "MAD",
                priceUnit: "job",
            })

            toast.success("Service Created!", {
                description: "Our AI is currently verifying your listing details.",
            })

            setStep(3) // Success step
            if (onSuccess) onSuccess()
        } catch (error: any) {
            toast.error("Creation Failed", {
                description: error.message || "Please check your information.",
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
                                    <SelectItem value="House Cleaning">House Cleaning</SelectItem>
                                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                                    <SelectItem value="Electrical Work">Electrical Work</SelectItem>
                                    <SelectItem value="AC Repair">AC Repair</SelectItem>
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
