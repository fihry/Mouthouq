package services

import (
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"github.com/google/uuid"
)

type UserService struct {
	repo *repositories.UserRepository
}

func NewUserService(repo *repositories.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) GetByID(id uuid.UUID) (*models.User, error) {
	return s.repo.FindByID(id)
}

func (s *UserService) List() ([]models.User, error) {
	return s.repo.List()
}

func (s *UserService) Update(user *models.User) error {
	return s.repo.Update(user)
}

func (s *UserService) UpdateFields(id uuid.UUID, updates map[string]interface{}) error {
	return s.repo.UpdateFields(id, updates)
}

func (s *UserService) IsUsernameTakenByOther(userID uuid.UUID, username string) (bool, error) {
	return s.repo.IsUsernameTakenByOther(userID, username)
}

func (s *UserService) IsEmailTakenByOther(userID uuid.UUID, email string) (bool, error) {
	return s.repo.IsEmailTakenByOther(userID, email)
}

func (s *UserService) Delete(id uuid.UUID) error {
	return s.repo.Delete(id)
}
