package handlers

import (
	"net/http"
	"strconv"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type BookingHandler struct {
	service *services.BookingService
}

type createBookingRequest struct {
	ServiceID   uint      `json:"serviceId"`
	ScheduledAt time.Time `json:"scheduledAt"`
	Notes       string    `json:"notes"`
}

func NewBookingHandler(service *services.BookingService) *BookingHandler {
	return &BookingHandler{service: service}
}

func (h *BookingHandler) Create(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	userType, ok := getUserType(c)
	if !ok {
		return
	}

	if userType != string(models.TypeCustomer) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only customer accounts can create bookings"})
		return
	}

	var req createBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if req.ServiceID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service ID is required"})
		return
	}

	if req.ScheduledAt.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Scheduled date is required"})
		return
	}

	booking, err := h.service.CreateBooking(userID, req.ServiceID, req.ScheduledAt, req.Notes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, booking)
}

func (h *BookingHandler) List(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	userType, ok := getUserType(c)
	if !ok {
		return
	}

	var (
		bookings []models.Booking
		err      error
	)

	switch userType {
	case string(models.TypeProfessional), string(models.TypeCompany):
		bookings, err = h.service.ListByProviderID(userID)
	default:
		bookings, err = h.service.ListByCustomerID(userID)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch bookings"})
		return
	}

	c.JSON(http.StatusOK, bookings)
}

func (h *BookingHandler) Get(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	booking, err := h.service.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	if !canAccessBooking(c, booking, userID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to access this booking"})
		return
	}

	c.JSON(http.StatusOK, booking)
}

func getUserID(c *gin.Context) (uint, bool) {
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return 0, false
	}
	userID, ok := userIDRaw.(uint)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
		return 0, false
	}
	return userID, true
}

func getUserType(c *gin.Context) (string, bool) {
	userTypeRaw, exists := c.Get("userType")
	if !exists {
		c.JSON(http.StatusForbidden, gin.H{"error": "User type is required"})
		return "", false
	}
	userType, ok := userTypeRaw.(string)
	if !ok {
		c.JSON(http.StatusForbidden, gin.H{"error": "Invalid user type"})
		return "", false
	}
	return userType, true
}

func canAccessBooking(c *gin.Context, booking *models.Booking, userID uint) bool {
	roleRaw, _ := c.Get("role")
	role, _ := roleRaw.(string)
	if role == string(models.RoleAdmin) {
		return true
	}

	if booking.CustomerID == userID {
		return true
	}

	return booking.Service.ProviderID == userID
}
