package models

import (
	"time"

	"gorm.io/gorm"
)

type BookingStatus string

const (
	BookingPending   BookingStatus = "pending"
	BookingConfirmed BookingStatus = "confirmed"
	BookingCompleted BookingStatus = "completed"
	BookingCancelled BookingStatus = "cancelled"
)

type Booking struct {
	gorm.Model
	ServiceID   uint          `gorm:"not null"`
	CustomerID  uint          `gorm:"not null"`
	Status      BookingStatus `gorm:"type:string;default:'pending'"`
	ScheduledAt time.Time     `gorm:"not null"`
	Notes       string        `gorm:"type:text"`

	// Relations
	Service  Service `gorm:"foreignKey:ServiceID"`
	Customer User    `gorm:"foreignKey:CustomerID"`
}

type TransactionStatus string

const (
	TransactionPending  TransactionStatus = "pending"
	TransactionPaid     TransactionStatus = "paid"
	TransactionRefunded TransactionStatus = "refunded"
	TransactionFailed   TransactionStatus = "failed"
)

type Transaction struct {
	gorm.Model
	BookingID        uint              `gorm:"not null"`
	Amount           float64           `gorm:"type:decimal(10,2);not null"`
	CommissionAmount float64           `gorm:"type:decimal(10,2);not null"`
	Currency         string            `gorm:"default:'MAD'"`
	Status           TransactionStatus `gorm:"type:string;default:'pending'"`
	PaymentMethod    string
	TransactionRef   string `gorm:"unique"`

	// Relations
	Booking Booking `gorm:"foreignKey:BookingID"`
}
