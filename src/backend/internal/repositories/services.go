package repositories

import (
	"mouthouq/internal/models"

	"github.com/google/uuid"
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

func (r *ServiceRepository) ListWithFilters(filters models.ServiceFilters, limit, offset int, order string) ([]models.Service, int64, error) {
	query := r.db.Model(&models.Service{})

	if filters.IsActive != nil {
		query = query.Where("is_active = ?", *filters.IsActive)
	}
	if filters.IsVerified != nil {
		query = query.Where("is_verified = ?", *filters.IsVerified)
	}
	if filters.Category != "" {
		query = query.Where("category = ?", filters.Category)
	}
	if filters.City != "" {
		query = query.Where("city ILIKE ?", filters.City)
	}
	if filters.MinPrice != nil {
		query = query.Where("price_amount >= ?", *filters.MinPrice)
	}
	if filters.MaxPrice != nil {
		query = query.Where("price_amount <= ?", *filters.MaxPrice)
	}
	if filters.PriceUnit != "" {
		query = query.Where("price_unit = ?", filters.PriceUnit)
	}
	if filters.ProviderID != nil {
		query = query.Where("provider_id = ?", *filters.ProviderID)
	}
	if filters.Query != "" {
		like := "%" + filters.Query + "%"
		query = query.Where("title ILIKE ? OR description ILIKE ?", like, like)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if order != "" {
		query = query.Order(order)
	}

	if limit > 0 {
		query = query.Limit(limit).Offset(offset)
	}

	var services []models.Service
	if err := query.Find(&services).Error; err != nil {
		return nil, 0, err
	}

	return services, total, nil
}

func (r *ServiceRepository) ListPending() ([]models.Service, error) {
	var services []models.Service
	err := r.db.Where("is_verified = ? OR is_active = ?", false, false).Find(&services).Error
	return services, err
}

func (r *ServiceRepository) FindByID(id uuid.UUID) (*models.Service, error) {
	var service models.Service
	err := r.db.First(&service, "id = ?", id).Error
	return &service, err
}

func (r *ServiceRepository) Update(service *models.Service) error {
	return r.db.Save(service).Error
}

func (r *ServiceRepository) UpdateFields(id uuid.UUID, updates map[string]interface{}) error {
	return r.db.Model(&models.Service{}).Where("id = ?", id).Updates(updates).Error
}

func (r *ServiceRepository) UpdateRating(serviceID uuid.UUID) error {
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

func (r *ServiceRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Service{}, "id = ?", id).Error
}
