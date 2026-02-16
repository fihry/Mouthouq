package models

import (
	"github.com/google/uuid"
)

type Service struct {
	UUIDModel
	ProviderID       uuid.UUID `gorm:"type:uuid;not null"`
	Title            string    `gorm:"not null"`
	Description      string
	Category         ServiceCategory
	PriceAmount      float64 `gorm:"type:decimal(10,2)"`
	PriceCurrency    string
	PriceUnit        PriceUnit `gorm:"check:price_unit IN ('hour', 'job', 'day')"`
	City             string
	Latitude         float64  `gorm:"type:decimal(10,8)"`
	Longitude        float64  `gorm:"type:decimal(11,8)"`
	Images           []string `gorm:"type:text[]"`
	Tags             []string `gorm:"type:text[]"`
	IsActive         bool     `gorm:"default:true"`
	IsVerified       bool     `gorm:"default:false"`
	TrustScore       float64  `gorm:"default:0"`
	ResponseTimeMins int      `gorm:"default:0"`
	RatingAverage    float64
	RatingCount      int `gorm:"default:0"`
}

type PriceUnit string

const (
	PriceUnitHour PriceUnit = "hour"
	PriceUnitJob  PriceUnit = "job"
	PriceUnitDay  PriceUnit = "day"
)

type ServiceCategory string

// SupportedCategories defines the list of allowed service categories
var SupportedCategories = []ServiceCategory{
	ServiceCategory("Plumbing"),
	ServiceCategory("Electrical"),
	ServiceCategory("Electrical Work"),
	ServiceCategory("Cleaning"),
	ServiceCategory("House Cleaning"),
	ServiceCategory("Painting"),
	ServiceCategory("Carpentry"),
	ServiceCategory("HVAC"),
	ServiceCategory("AC Repair"),
	ServiceCategory("Landscaping"),
	ServiceCategory("Moving"),
	ServiceCategory("Pest Control"),
	ServiceCategory("Appliance Repair"),
	ServiceCategory("Handyman"),
}

// IsValidCategory checks if a category is in the supported list
func IsValidCategory(category ServiceCategory) bool {
	for _, c := range SupportedCategories {
		if c == category {
			return true
		}
	}
	return false
}
