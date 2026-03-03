export type UserRole = "user" | "admin"
export type UserType = "customer" | "professional" | "company"

export interface AuthUser {
  id?: string
  ID?: string
  email?: string
  Email?: string
  role?: UserRole
  Role?: UserRole
  userType?: UserType
  UserType?: UserType
  firstName?: string
  FirstName?: string
  lastName?: string
  LastName?: string
  city?: string
  City?: string
  profileImage?: string
  ProfileImage?: string
}

export interface LoginResponse {
  message: string
  token: string
  user: AuthUser
}

export interface ServiceRecord {
  id?: string
  ID?: string
  ProviderID?: string
  Title?: string
  Description?: string
  Category?: string
  PriceAmount?: number
  PriceCurrency?: string
  PriceUnit?: "hour" | "job" | "day"
  City?: string
  Latitude?: number
  Longitude?: number
  Images?: string[]
  Tags?: string[]
  IsActive?: boolean
  IsVerified?: boolean
  TrustScore?: number
  ResponseTimeMins?: number
  RatingAverage?: number
  RatingCount?: number
  CreatedAt?: string
  UpdatedAt?: string
}

export interface ServicesListMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ServicesListResponse {
  data: ServiceRecord[]
  meta: ServicesListMeta
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

export interface BookingRecord {
  id?: string
  ID?: string
  ServiceID?: string
  CustomerID?: string
  Status?: BookingStatus
  ScheduledAt?: string
  Notes?: string
  Service?: ServiceRecord
  Customer?: AuthUser
  CreatedAt?: string
  UpdatedAt?: string
}

export interface ReviewRecord {
  id?: string
  ID?: string
  ServiceID?: string
  UserID?: string
  Rating?: number
  Comment?: string
  IsAiVerified?: boolean
  AiConfidenceScore?: number
  AiAnalysisFeedback?: string
  User?: AuthUser
  CreatedAt?: string
  UpdatedAt?: string
}

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected"

export interface ProviderVerificationRecord {
  id?: string
  ID?: string
  UserID?: string
  DocumentType?: "id_card" | "passport" | "license" | "business_registration" | "certificate"
  DocumentURLs?: string[]
  Status?: VerificationStatus
  Notes?: string
  ReviewNotes?: string
  ReviewedAt?: string
  User?: AuthUser
  CreatedAt?: string
  UpdatedAt?: string
}

export interface UploadResult {
  bucket: string
  objectKey: string
  url: string
}
