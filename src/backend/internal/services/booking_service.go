package services

import (
	"errors"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
)

type BookingService struct {
	bookingRepo     *repositories.BookingRepository
	serviceRepo     *repositories.ServiceRepository
	transactionRepo *repositories.TransactionRepository
}

const PlatformCommissionRate = 0.15 // 15% commission

func NewBookingService(
	bookingRepo *repositories.BookingRepository,
	serviceRepo *repositories.ServiceRepository,
	transactionRepo *repositories.TransactionRepository,
) *BookingService {
	return &BookingService{
		bookingRepo:     bookingRepo,
		serviceRepo:     serviceRepo,
		transactionRepo: transactionRepo,
	}
}

// CreateBooking initiates a new booking and calculates the expected commission.
func (s *BookingService) CreateBooking(customerID uint, serviceID uint, scheduledAt time.Time, notes string) (*models.Booking, error) {
	service, err := s.serviceRepo.FindByID(serviceID)
	if err != nil {
		return nil, errors.New("service not found")
	}

	if !service.IsActive {
		return nil, errors.New("service is currently inactive")
	}

	booking := &models.Booking{
		ServiceID:   serviceID,
		CustomerID:  customerID,
		Status:      models.BookingPending,
		ScheduledAt: scheduledAt,
		Notes:       notes,
	}

	if err := s.bookingRepo.Create(booking); err != nil {
		return nil, err
	}

	// Prepare the transaction (Pending)
	amount := service.PriceAmount
	commission := amount * PlatformCommissionRate

	transaction := &models.Transaction{
		BookingID:        booking.ID,
		Amount:           amount,
		CommissionAmount: commission,
		Currency:         service.PriceCurrency,
		Status:           models.TransactionPending,
	}

	if err := s.transactionRepo.Create(transaction); err != nil {
		// In a real app, we might want to use a database transaction to rollback the booking
		return nil, err
	}

	return booking, nil
}

// CompleteBooking marks a booking as completed and flags the transaction for payment processing.
func (s *BookingService) CompleteBooking(bookingID uint) error {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return err
	}

	if booking.Status != models.BookingConfirmed {
		return errors.New("only confirmed bookings can be completed")
	}

	booking.Status = models.BookingCompleted
	return s.bookingRepo.Update(booking)
}

func (s *BookingService) ConfirmBooking(bookingID uint) error {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return err
	}

	if booking.Status != models.BookingPending {
		return errors.New("only pending bookings can be confirmed")
	}

	booking.Status = models.BookingConfirmed
	return s.bookingRepo.Update(booking)
}

func (s *BookingService) CancelBooking(bookingID uint) error {
	booking, err := s.bookingRepo.FindByID(bookingID)
	if err != nil {
		return err
	}

	switch booking.Status {
	case models.BookingPending, models.BookingConfirmed:
		booking.Status = models.BookingCancelled
		return s.bookingRepo.Update(booking)
	default:
		return errors.New("only pending or confirmed bookings can be cancelled")
	}
}

func (s *BookingService) Get(id uint) (*models.Booking, error) {
	return s.bookingRepo.FindByID(id)
}

func (s *BookingService) ListAll() ([]models.Booking, error) {
	return s.bookingRepo.ListAll()
}

func (s *BookingService) ListByCustomerID(customerID uint) ([]models.Booking, error) {
	return s.bookingRepo.ListByCustomerID(customerID)
}

func (s *BookingService) ListByProviderID(providerID uint) ([]models.Booking, error) {
	return s.bookingRepo.ListByProviderID(providerID)
}
