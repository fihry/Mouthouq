package repositories

import (
	"mouthouq/internal/models"

	"gorm.io/gorm"
)

type BookingRepository struct {
	db *gorm.DB
}

func NewBookingRepository(db *gorm.DB) *BookingRepository {
	return &BookingRepository{db: db}
}

func (r *BookingRepository) Create(booking *models.Booking) error {
	return r.db.Create(booking).Error
}

func (r *BookingRepository) FindByID(id uint) (*models.Booking, error) {
	var booking models.Booking
	if err := r.db.Preload("Service").Preload("Customer").First(&booking, id).Error; err != nil {
		return nil, err
	}
	return &booking, nil
}

func (r *BookingRepository) Update(booking *models.Booking) error {
	return r.db.Save(booking).Error
}

func (r *BookingRepository) ListByCustomerID(customerID uint) ([]models.Booking, error) {
	var bookings []models.Booking
	if err := r.db.Where("customer_id = ?", customerID).Preload("Service").Find(&bookings).Error; err != nil {
		return nil, err
	}
	return bookings, nil
}
