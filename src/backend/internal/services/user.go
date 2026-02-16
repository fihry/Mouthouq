package services

import (
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
)

type UserService struct {
	repo *repositories.UserRepository
}

func NewUserService(repo *repositories.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) GetByID(id uint) (*models.User, error) {
	return s.repo.FindByID(id)
}

func (s *UserService) Update(user *models.User) error {
	return s.repo.Update(user)
}

func (s *UserService) UpdateFields(id uint, updates map[string]interface{}) error {
	return s.repo.UpdateFields(id, updates)
}

func (s *UserService) Delete(id uint) error {
	return s.repo.Delete(id)
}
