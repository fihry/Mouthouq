package models

import (
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	ServiceID          uint    `gorm:"not null"`
	UserID             uint    `gorm:"not null"`
	Rating             float64 `gorm:"not null;check:rating >= 1 AND rating <= 5"`
	Comment            string  `gorm:"type:text"`
	IsAiVerified       bool    `gorm:"default:false"`
	AiConfidenceScore  float64 `gorm:"type:decimal(5,2)"`
	AiAnalysisFeedback string  `gorm:"type:text"`

	// Relations
	Service Service `gorm:"foreignKey:ServiceID"`
	User    User    `gorm:"foreignKey:UserID"`
}
