package models

import (
	"encoding/json"
	"fmt"
	"strings"
)

func parseEnumValue(data []byte) (string, error) {
	var value string
	if err := json.Unmarshal(data, &value); err != nil {
		return "", err
	}
	value = strings.TrimSpace(value)
	if value == "" {
		return "", fmt.Errorf("value is required")
	}
	return value, nil
}

func IsValidUserType(userType UserType) bool {
	switch userType {
	case TypeCustomer, TypeProfessional, TypeCompany:
		return true
	default:
		return false
	}
}

func IsValidUserRole(role UserRole) bool {
	switch role {
	case RoleUser, RoleAdmin:
		return true
	default:
		return false
	}
}

func IsValidSubscriptionPlan(plan SubscriptionPlan) bool {
	switch plan {
	case PlanNone, PlanBasic, PlanPremium:
		return true
	default:
		return false
	}
}

func IsValidVerificationStatus(status VerificationStatus) bool {
	switch status {
	case StatusUnverified, StatusPending, StatusVerified, StatusRejected:
		return true
	default:
		return false
	}
}

func IsValidBookingStatus(status BookingStatus) bool {
	switch status {
	case BookingPending, BookingConfirmed, BookingCompleted, BookingCancelled:
		return true
	default:
		return false
	}
}

func IsValidTransactionStatus(status TransactionStatus) bool {
	switch status {
	case TransactionPending, TransactionPaid, TransactionRefunded, TransactionFailed:
		return true
	default:
		return false
	}
}

func IsValidVerificationDocumentType(docType VerificationDocumentType) bool {
	switch docType {
	case DocumentTypeIDCard, DocumentTypePassport, DocumentTypeLicense, DocumentTypeBusinessRegistration, DocumentTypeCertificate:
		return true
	default:
		return false
	}
}

func IsValidPriceUnit(unit PriceUnit) bool {
	switch unit {
	case PriceUnitHour, PriceUnitJob, PriceUnitDay:
		return true
	default:
		return false
	}
}

func (t *UserType) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	userType := UserType(value)
	if !IsValidUserType(userType) {
		return fmt.Errorf("invalid user type")
	}
	*t = userType
	return nil
}

func (r *UserRole) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	role := UserRole(value)
	if !IsValidUserRole(role) {
		return fmt.Errorf("invalid user role")
	}
	*r = role
	return nil
}

func (p *SubscriptionPlan) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	plan := SubscriptionPlan(value)
	if !IsValidSubscriptionPlan(plan) {
		return fmt.Errorf("invalid subscription plan")
	}
	*p = plan
	return nil
}

func (s *VerificationStatus) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	status := VerificationStatus(value)
	if !IsValidVerificationStatus(status) {
		return fmt.Errorf("invalid verification status")
	}
	*s = status
	return nil
}

func (s *BookingStatus) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	status := BookingStatus(value)
	if !IsValidBookingStatus(status) {
		return fmt.Errorf("invalid booking status")
	}
	*s = status
	return nil
}

func (s *TransactionStatus) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	status := TransactionStatus(value)
	if !IsValidTransactionStatus(status) {
		return fmt.Errorf("invalid transaction status")
	}
	*s = status
	return nil
}

func (d *VerificationDocumentType) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	docType := VerificationDocumentType(value)
	if !IsValidVerificationDocumentType(docType) {
		return fmt.Errorf("invalid verification document type")
	}
	*d = docType
	return nil
}

func (u *PriceUnit) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	unit := PriceUnit(value)
	if !IsValidPriceUnit(unit) {
		return fmt.Errorf("invalid price unit")
	}
	*u = unit
	return nil
}

func (c *ServiceCategory) UnmarshalJSON(data []byte) error {
	value, err := parseEnumValue(data)
	if err != nil {
		return err
	}
	category := ServiceCategory(value)
	if !IsValidCategory(category) {
		return fmt.Errorf("invalid service category")
	}
	*c = category
	return nil
}
