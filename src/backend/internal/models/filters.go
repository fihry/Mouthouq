package models

import "github.com/google/uuid"

type ServiceFilters struct {
	Query      string
	Category   ServiceCategory
	City       string
	MinPrice   *float64
	MaxPrice   *float64
	PriceUnit  PriceUnit
	ProviderID *uuid.UUID
	IsActive   *bool
	IsVerified *bool
}
