package models

import (
	"time"
)

type User struct {
	ID           uint   `gorm:"primarykey"`
	Username     string `gorm:"unique;not null"`
	Email        string `gorm:"unique;not null"`
	Password     string `gorm:"not null"`
	PhoneNumber  string
	City         string
	Address      string
	Latitude     float64 `gorm:"type:decimal(10,8)"`
	Longitude    float64 `gorm:"type:decimal(11,8)"`
	Role         string `gorm:"check:role IN ('user', 'admin')"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	IsVerified   bool `gorm:"default:false"`
	ProfileImage string
}
