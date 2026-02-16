package services

import (
	"errors"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
)

type ReviewService struct {
	repo        *repositories.ReviewRepository
	serviceRepo *repositories.ServiceRepository
	ai          *AIService
}

func NewReviewService(repo *repositories.ReviewRepository, serviceRepo *repositories.ServiceRepository, ai *AIService) *ReviewService {
	return &ReviewService{
		repo:        repo,
		serviceRepo: serviceRepo,
		ai:          ai,
	}
}

func (s *ReviewService) Create(serviceID, userID uint, rating float64, comment string) (*models.Review, error) {
	if _, err := s.serviceRepo.FindByID(serviceID); err != nil {
		return nil, errors.New("service not found")
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

func (s *ReviewService) ListByServiceID(serviceID uint) ([]models.Review, error) {
	return s.repo.ListByServiceID(serviceID)
}
