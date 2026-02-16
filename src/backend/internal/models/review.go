package models

import (
	"github.com/google/uuid"
)

type Review struct {
	UUIDModel
	ServiceID          uuid.UUID `gorm:"type:uuid;not null"`
	UserID             uuid.UUID `gorm:"type:uuid;not null"`
	Rating             float64   `gorm:"not null;check:rating >= 1 AND rating <= 5"`
	Comment            string    `gorm:"type:text"`
	IsAiVerified       bool      `gorm:"default:false"`
	AiConfidenceScore  float64   `gorm:"type:decimal(5,2)"`
	AiAnalysisFeedback string    `gorm:"type:text"`

	// Relations
	Service Service `gorm:"foreignKey:ServiceID"`
	User    User    `gorm:"foreignKey:UserID"`
}
