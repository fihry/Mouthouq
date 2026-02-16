package services

import (
	"errors"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"github.com/google/uuid"
)

type ReviewService struct {
	repo        *repositories.ReviewRepository
	serviceRepo *repositories.ServiceRepository
	bookingRepo *repositories.BookingRepository
	ai          *AIService
}

func NewReviewService(repo *repositories.ReviewRepository, serviceRepo *repositories.ServiceRepository, bookingRepo *repositories.BookingRepository, ai *AIService) *ReviewService {
	return &ReviewService{
		repo:        repo,
		serviceRepo: serviceRepo,
		bookingRepo: bookingRepo,
		ai:          ai,
	}
}

func (s *ReviewService) Create(serviceID, userID uuid.UUID, rating float64, comment string) (*models.Review, error) {
	if _, err := s.serviceRepo.FindByID(serviceID); err != nil {
		return nil, errors.New("service not found")
	}

	exists, err := s.repo.ExistsByServiceAndUser(serviceID, userID)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("review already exists for this service")
	}

	hasCompleted, err := s.bookingRepo.HasCompletedBooking(userID, serviceID)
	if err != nil {
		return nil, err
	}
	if !hasCompleted {
		return nil, errors.New("review requires a completed booking")
	}

	isFake, confidence, feedback := s.ai.AnalyzeReview(comment)
	review := &models.Review{
		ServiceID:          serviceID,
		UserID:             userID,
		Rating:             rating,
		Comment:            comment,
		IsAiVerified:       !isFake,
		AiConfidenceScore:  confidence,
		AiAnalysisFeedback: feedback,
	}

	if err := s.repo.Create(review); err != nil {
		return nil, err
	}

	if err := s.serviceRepo.UpdateRating(serviceID); err != nil {
		return nil, err
	}

	return review, nil
}

func (s *ReviewService) ListByServiceID(serviceID uuid.UUID) ([]models.Review, error) {
	return s.repo.ListByServiceID(serviceID)
}
