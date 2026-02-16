package models

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	ProviderID       uint   `gorm:"not null"`
	Title            string `gorm:"not null"`
	Description      string
	Category         string
	PriceAmount      float64 `gorm:"type:decimal(10,2)"`
	PriceCurrency    string
	PriceUnit        string `gorm:"check:price_unit IN ('hour', 'job', 'day')"`
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

// SupportedCategories defines the list of allowed service categories
var SupportedCategories = []string{
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
}

// IsValidCategory checks if a category is in the supported list
func IsValidCategory(category string) bool {
	for _, c := range SupportedCategories {
		if c == category {
			return true
		}
	}
	return false
}
