package services

import (
	"errors"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
)

type SubscriptionService struct {
	userRepo *repositories.UserRepository
}

func NewSubscriptionService(userRepo *repositories.UserRepository) *SubscriptionService {
	return &SubscriptionService{
		userRepo: userRepo,
	}
}

// SubscribeUser upgrades a user to a specific subscription plan.
func (s *SubscriptionService) SubscribeUser(userID uint, plan models.SubscriptionPlan, durationDays int) error {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return err
	}

	if user.UserType != models.TypeProfessional && user.UserType != models.TypeCompany {
		return errors.New("only professional or company accounts can have subscriptions")
	}

	expiry := time.Now().AddDate(0, 0, durationDays)
	user.SubscriptionPlan = plan
	user.SubscriptionExpiry = &expiry

	return s.userRepo.Update(user)
}

// IsSubscriptionActive checks if the professional has an active, non-expired subscription.
func (s *SubscriptionService) IsSubscriptionActive(user *models.User) bool {
	if user.SubscriptionPlan == models.PlanNone {
		return false
	}

	if user.SubscriptionExpiry == nil {
		return false
	}

	return user.SubscriptionExpiry.After(time.Now())
}

// CancelSubscription reverts a user to the 'none' plan.
func (s *SubscriptionService) CancelSubscription(userID uint) error {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return err
	}

	user.SubscriptionPlan = models.PlanNone
	user.SubscriptionExpiry = nil

	return s.userRepo.Update(user)
}
