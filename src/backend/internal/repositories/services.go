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

func (r *ServiceRepository) Delete(id uint) error {
	return r.db.Delete(&models.Service{}, id).Error
}
