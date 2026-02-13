package repositories

import (
	"mouthouq/internal/models"

	"gorm.io/gorm"
)

type TransactionRepository struct {
	db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) *TransactionRepository {
	return &TransactionRepository{db: db}
}

func (r *TransactionRepository) Create(tx *models.Transaction) error {
	return r.db.Create(tx).Error
}

func (r *TransactionRepository) FindByBookingID(bookingID uint) (*models.Transaction, error) {
	var tx models.Transaction
	if err := r.db.Where("booking_id = ?", bookingID).First(&tx).Error; err != nil {
		return nil, err
	}
	return &tx, nil
}

func (r *TransactionRepository) UpdateStatus(id uint, status models.TransactionStatus) error {
	return r.db.Model(&models.Transaction{}).Where("id = ?", id).Update("status", status).Error
}
