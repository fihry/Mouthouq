package services

import (
	"errors"
	"strings"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	repo *repositories.AuthRepository
}

func NewAuthService(repo *repositories.AuthRepository) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) Register(user *models.User) error {
	if strings.TrimSpace(user.Username) == "" ||
		strings.TrimSpace(user.FirstName) == "" ||
		strings.TrimSpace(user.LastName) == "" ||
		strings.TrimSpace(user.Email) == "" ||
		strings.TrimSpace(user.Password) == "" ||
		strings.TrimSpace(user.PhoneNumber) == "" ||
		strings.TrimSpace(user.City) == "" ||
		strings.TrimSpace(string(user.UserType)) == "" {
		return errors.New("missing required fields")
	}

	if !models.IsValidUserType(user.UserType) {
		return errors.New("invalid user type")
	}

	// Check if email exists
	existingByEmail, err := s.repo.GetUserByEmail(user.Email)
	if err == nil && existingByEmail != nil {
		return errors.New("email already exists")
	}
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	// Check if username exists
	existingByUsername, err := s.repo.GetUserByUsername(user.Username)
	if err == nil && existingByUsername != nil {
		return errors.New("username already exists")
	}
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashed)

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
