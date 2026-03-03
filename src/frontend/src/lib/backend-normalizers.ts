import type { AuthUser, BookingRecord, ReviewRecord, ServiceRecord } from "@/lib/backend-types"

export function pickId(value: { id?: string; ID?: string } | null | undefined): string {
  return value?.id ?? value?.ID ?? ""
}

export function pickUserName(user: AuthUser | null | undefined): string {
  const firstName = user?.firstName ?? user?.FirstName ?? ""
  const lastName = user?.lastName ?? user?.LastName ?? ""
  const fullName = `${firstName} ${lastName}`.trim()
  if (fullName) return fullName
  return user?.email ?? user?.Email ?? "User"
}

export function pickUserEmail(user: AuthUser | null | undefined): string {
  return user?.email ?? user?.Email ?? ""
}

export function normalizeService(service: ServiceRecord) {
  return {
    id: pickId(service),
    title: service.Title ?? "Service",
    description: service.Description ?? "",
    category: service.Category ?? "General",
    priceAmount: typeof service.PriceAmount === "number" ? service.PriceAmount : 0,
    priceCurrency: service.PriceCurrency ?? "MAD",
    priceUnit: service.PriceUnit ?? "job",
    city: service.City ?? "Casablanca",
    images: Array.isArray(service.Images) ? service.Images : [],
    tags: Array.isArray(service.Tags) ? service.Tags : [],
    isActive: Boolean(service.IsActive),
    isVerified: Boolean(service.IsVerified),
    ratingAverage: typeof service.RatingAverage === "number" ? service.RatingAverage : 0,
    ratingCount: typeof service.RatingCount === "number" ? service.RatingCount : 0,
    responseTimeMins: typeof service.ResponseTimeMins === "number" ? service.ResponseTimeMins : 60,
    providerId: service.ProviderID ?? "",
    createdAt: service.CreatedAt ?? "",
  }
}

export function normalizeBooking(booking: BookingRecord) {
  return {
    id: pickId(booking),
    status: booking.Status ?? "pending",
    serviceId: booking.ServiceID ?? "",
    customerId: booking.CustomerID ?? "",
    scheduledAt: booking.ScheduledAt ?? "",
    notes: booking.Notes ?? "",
    service: booking.Service,
    customer: booking.Customer,
  }
}

export function normalizeReview(review: ReviewRecord) {
  return {
    id: pickId(review),
    rating: typeof review.Rating === "number" ? review.Rating : 0,
    comment: review.Comment ?? "",
    isAiVerified: Boolean(review.IsAiVerified),
    aiConfidenceScore: typeof review.AiConfidenceScore === "number" ? review.AiConfidenceScore : 0,
    aiAnalysisFeedback: review.AiAnalysisFeedback ?? "",
    user: review.User,
    createdAt: review.CreatedAt ?? "",
    serviceId: review.ServiceID ?? "",
  }
}
