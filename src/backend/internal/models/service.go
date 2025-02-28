package models

import "time"

type Service struct {
	ID            uint   `gorm:"primarykey"`
	ProviderID    uint   `gorm:"not null"`
	Title         string `gorm:"not null"`
	Description   string
	Category      string
	PriceAmount   float64 `gorm:"type:decimal(10,2)"`
	PriceCurrency string
	PriceUnit     string `gorm:"check:price_unit IN ('hour', 'job', 'day')"`
	City          string
	Latitude      float64 `gorm:"type:decimal(10,8)"`
	Longitude     float64 `gorm:"type:decimal(11,8)"`
	Images        []string
	IsActive      bool `gorm:"default:true"`
	RatingAverage float64
	RatingCount   int `gorm:"default:0"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
}
