package models

import (
	"time"
)

type UserRole string
type UserType string
type SubscriptionPlan string
type VerificationStatus string

const (
	RoleUser  UserRole = "user"
	RoleAdmin UserRole = "admin"

	TypeCustomer     UserType = "customer"
	TypeProfessional UserType = "professional"
	TypeCompany      UserType = "company"

	PlanNone    SubscriptionPlan = "none"
	PlanBasic   SubscriptionPlan = "basic"
	PlanPremium SubscriptionPlan = "premium"

	StatusUnverified VerificationStatus = "unverified"
	StatusPending    VerificationStatus = "pending"
	StatusVerified   VerificationStatus = "verified"
	StatusRejected   VerificationStatus = "rejected"
)

type User struct {
	UUIDModel
	Username           string `gorm:"unique;not null"`
	FirstName          string
	LastName           string
	Email              string `gorm:"unique;not null"`
	Password           string `gorm:"not null"`
	PhoneNumber        string
	City               string
	Address            string
	Latitude           float64            `gorm:"type:decimal(10,8)"`
	Longitude          float64            `gorm:"type:decimal(11,8)"`
	Role               UserRole           `gorm:"type:string;default:'user'"`
	UserType           UserType           `gorm:"type:string;default:'customer'"`
	SubscriptionPlan   SubscriptionPlan   `gorm:"type:string;default:'none'"`
	SubscriptionExpiry *time.Time         `gorm:"type:timestamp"`
	VerificationStatus VerificationStatus `gorm:"type:string;default:'unverified'"`
	CreatedAt          time.Time
	UpdatedAt          time.Time
	IsVerified         bool `gorm:"default:false"`
	ProfileImage       string
}
