package repositories

import (
	"mouthouq/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type VerificationRepository struct {
	db *gorm.DB
}

func NewVerificationRepository(db *gorm.DB) *VerificationRepository {
	return &VerificationRepository{db: db}
}

func (r *VerificationRepository) FindByUserID(userID uuid.UUID) (*models.ProviderVerification, error) {
	var verification models.ProviderVerification
	if err := r.db.Where("user_id = ?", userID).First(&verification).Error; err != nil {
		return nil, err
	}
	return &verification, nil
}

func (r *VerificationRepository) FindByID(id uuid.UUID) (*models.ProviderVerification, error) {
	var verification models.ProviderVerification
	if err := r.db.First(&verification, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &verification, nil
}

func (r *VerificationRepository) Upsert(verification *models.ProviderVerification) error {
	return r.db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}},
		UpdateAll: true,
	}).Create(verification).Error
}

func (r *VerificationRepository) Update(verification *models.ProviderVerification) error {
	return r.db.Save(verification).Error
}

func (r *VerificationRepository) ListPending() ([]models.ProviderVerification, error) {
	var items []models.ProviderVerification
	if err := r.db.Where("status = ?", models.StatusPending).Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}
