package services

import (
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"github.com/google/uuid"
)

type ServiceService struct {
	repo *repositories.ServiceRepository
	ai   *AIService
}

func NewServiceService(repo *repositories.ServiceRepository, ai *AIService) *ServiceService {
	return &ServiceService{repo: repo, ai: ai}
}

func (s *ServiceService) Create(service *models.Service) error {
	// AI Analysis
	score, isVerified, tags := s.ai.AnalyzeService(service.Title, service.Description)
	service.TrustScore = score
	service.IsVerified = isVerified
	service.Tags = tags

	return s.repo.Create(service)
}

func (s *ServiceService) List() ([]models.Service, error) {
	return s.repo.List()
}

func (s *ServiceService) ListPending() ([]models.Service, error) {
	return s.repo.ListPending()
}

func (s *ServiceService) Get(id uuid.UUID) (*models.Service, error) {
	return s.repo.FindByID(id)
}

func (s *ServiceService) Update(service *models.Service) error {
	return s.repo.Update(service)
}

func (s *ServiceService) UpdateFields(id uuid.UUID, updates map[string]interface{}) error {
	return s.repo.UpdateFields(id, updates)
}

func (s *ServiceService) Delete(id uuid.UUID) error {
	return s.repo.Delete(id)
}
