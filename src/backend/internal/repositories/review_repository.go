package repositories

import (
	"mouthouq/internal/models"

	"gorm.io/gorm"
)

type ReviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(db *gorm.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

func (r *ReviewRepository) Create(review *models.Review) error {
	return r.db.Create(review).Error
}

func (r *ReviewRepository) ListByServiceID(serviceID uint) ([]models.Review, error) {
	var reviews []models.Review
	if err := r.db.Where("service_id = ?", serviceID).Preload("User").Find(&reviews).Error; err != nil {
		return nil, err
	}
	return reviews, nil
}

func (r *ReviewRepository) ExistsByServiceAndUser(serviceID, userID uint) (bool, error) {
	var count int64
	if err := r.db.Model(&models.Review{}).
		Where("service_id = ? AND user_id = ?", serviceID, userID).
		Count(&count).Error; err != nil {
		return false, err
	}
	return count > 0, nil
}
