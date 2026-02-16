package services

import (
	"errors"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type VerificationService struct {
	repo     *repositories.VerificationRepository
	userRepo *repositories.UserRepository
}

func NewVerificationService(repo *repositories.VerificationRepository, userRepo *repositories.UserRepository) *VerificationService {
	return &VerificationService{
		repo:     repo,
		userRepo: userRepo,
	}
}

func (s *VerificationService) Submit(userID uuid.UUID, docType models.VerificationDocumentType, docURLs []string, notes string) (*models.ProviderVerification, error) {
	if !models.IsValidVerificationDocumentType(docType) {
		return nil, errors.New("invalid document type")
	}
	if len(docURLs) == 0 {
		return nil, errors.New("document URLs are required")
	}

	verification := &models.ProviderVerification{
		UserID:       userID,
		DocumentType: docType,
		DocumentURLs: pq.StringArray(docURLs),
		Status:       models.StatusPending,
		Notes:        notes,
		ReviewedBy:   nil,
		ReviewedAt:   nil,
		ReviewNotes:  "",
	}

	if err := s.repo.Upsert(verification); err != nil {
		return nil, err
	}

	if err := s.userRepo.UpdateFields(userID, map[string]interface{}{
		"verification_status": models.StatusPending,
		"is_verified":         false,
	}); err != nil {
		return nil, err
	}

	return s.repo.FindByUserID(userID)
}

func (s *VerificationService) GetByUserID(userID uuid.UUID) (*models.ProviderVerification, error) {
	return s.repo.FindByUserID(userID)
}

func (s *VerificationService) ListPending() ([]models.ProviderVerification, error) {
	return s.repo.ListPending()
}

func (s *VerificationService) Review(id uuid.UUID, status models.VerificationStatus, reviewerID uuid.UUID, notes string) (*models.ProviderVerification, error) {
	if status != models.StatusVerified && status != models.StatusRejected {
		return nil, errors.New("status must be verified or rejected")
	}

	verification, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	now := time.Now()
	verification.Status = status
	verification.ReviewedBy = &reviewerID
	verification.ReviewedAt = &now
	verification.ReviewNotes = notes

	if err := s.repo.Update(verification); err != nil {
		return nil, err
	}

	userUpdates := map[string]interface{}{
		"verification_status": status,
		"is_verified":         status == models.StatusVerified,
	}
	if err := s.userRepo.UpdateFields(verification.UserID, userUpdates); err != nil {
		return nil, err
	}

	return verification, nil
}
