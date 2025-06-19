package models

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	ProviderID    uint   `gorm:"not null"`
	Title         string `gorm:"not null"`
	Description   string
	Category      string
	PriceAmount   float64 `gorm:"type:decimal(10,2)"`
	PriceCurrency string
	PriceUnit     string `gorm:"check:price_unit IN ('hour', 'job', 'day')"`
	City          string
	Latitude      float64  `gorm:"type:decimal(10,8)"`
	Longitude     float64  `gorm:"type:decimal(11,8)"`
	Images        []string `gorm:"type:string"`
	IsActive      bool     `gorm:"default:true"`
	RatingAverage float64
	RatingCount   int `gorm:"default:0"`
}
