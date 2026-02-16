package repositories

import (
	"mouthouq/internal/models"

	"gorm.io/gorm"
)

type ServiceRepository struct {
	db *gorm.DB
}

func NewServiceRepository(db *gorm.DB) *ServiceRepository {
	return &ServiceRepository{db: db}
}

func (r *ServiceRepository) Create(service *models.Service) error {
	return r.db.Create(service).Error
}

func (r *ServiceRepository) List() ([]models.Service, error) {
	var services []models.Service
	err := r.db.Find(&services).Error
	return services, err
}

func (r *ServiceRepository) ListPending() ([]models.Service, error) {
	var services []models.Service
	err := r.db.Where("is_verified = ? OR is_active = ?", false, false).Find(&services).Error
	return services, err
}

func (r *ServiceRepository) FindByID(id uint) (*models.Service, error) {
	var service models.Service
	err := r.db.First(&service, id).Error
	return &service, err
}

func (r *ServiceRepository) Update(service *models.Service) error {
	return r.db.Save(service).Error
}

func (r *ServiceRepository) UpdateFields(id uint, updates map[string]interface{}) error {
	return r.db.Model(&models.Service{}).Where("id = ?", id).Updates(updates).Error
}

func (r *ServiceRepository) UpdateRating(serviceID uint) error {
	var count int64
	if err := r.db.Model(&models.Review{}).Where("service_id = ?", serviceID).Count(&count).Error; err != nil {
		return err
	}

	var avg float64
	if err := r.db.Model(&models.Review{}).Where("service_id = ?", serviceID).Select("COALESCE(AVG(rating), 0)").Scan(&avg).Error; err != nil {
		return err
	}

	return r.db.Model(&models.Service{}).Where("id = ?", serviceID).Updates(map[string]interface{}{
		"rating_average": avg,
		"rating_count":   count,
	}).Error
}

func (r *ServiceRepository) Delete(id uint) error {
	return r.db.Delete(&models.Service{}, id).Error
}
