package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type VerificationDocumentType string

const (
	DocumentTypeIDCard               VerificationDocumentType = "id_card"
	DocumentTypePassport             VerificationDocumentType = "passport"
	DocumentTypeLicense              VerificationDocumentType = "license"
	DocumentTypeBusinessRegistration VerificationDocumentType = "business_registration"
	DocumentTypeCertificate          VerificationDocumentType = "certificate"
)

type ProviderVerification struct {
	UUIDModel
	UserID       uuid.UUID                `gorm:"type:uuid;not null;uniqueIndex"`
	DocumentType VerificationDocumentType `gorm:"type:string;not null"`
	DocumentURLs pq.StringArray           `gorm:"type:text[]"`
	Status       VerificationStatus       `gorm:"type:string;default:'pending'"`
	Notes        string                   `gorm:"type:text"`
	ReviewedBy   *uuid.UUID               `gorm:"type:uuid"`
	ReviewedAt   *time.Time
	ReviewNotes  string `gorm:"type:text"`
	User         User   `gorm:"foreignKey:UserID"`
}
