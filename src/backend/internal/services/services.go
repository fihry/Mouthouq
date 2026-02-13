package services

import (
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
)

type ServiceService struct {
	repo *repositories.ServiceRepository
}

func NewServiceService(repo *repositories.ServiceRepository) *ServiceService {
	return &ServiceService{repo: repo}
}

func (s *ServiceService) Create(service *models.Service) error {
	return s.repo.Create(service)
}

func (s *ServiceService) List() ([]models.Service, error) {
	return s.repo.List()
}

func (s *ServiceService) Get(id uint) (*models.Service, error) {
	return s.repo.FindByID(id)
}

func (s *ServiceService) Update(service *models.Service) error {
	return s.repo.Update(service)
}

func (s *ServiceService) Delete(id uint) error {
	return s.repo.Delete(id)
}
