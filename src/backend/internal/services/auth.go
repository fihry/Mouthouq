package services

import (
	"errors"
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo *repositories.AuthRepository
}

func NewAuthService(repo *repositories.AuthRepository) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) Register(user *models.User) error {
	// Check if user exists
	existing, _ := s.repo.GetUserByEmail(user.Email)
	if existing.ID != 0 {
		return errors.New("user already exists")
	}
	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashed)

	// Set username if empty
	if user.Username == "" {
		user.Username = user.Email
	}

	// Map UserType from role if not already set
	if user.UserType == "" {
		if user.Role == "professional" {
			user.UserType = models.TypeProfessional
		} else {
			user.UserType = models.TypeCustomer
		}
	}

	return s.repo.CreateUser(user)
}

func (s *AuthService) Login(email, password string) (*models.User, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid credentials")
	}
	return user, nil
}
