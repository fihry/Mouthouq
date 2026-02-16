package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type ServiceHandler struct {
	service *services.ServiceService
}

type updateServiceRequest struct {
	Title         *string                 `json:"title"`
	Description   *string                 `json:"description"`
	Category      *models.ServiceCategory `json:"category"`
	PriceAmount   *float64                `json:"priceAmount"`
	PriceCurrency *string                 `json:"priceCurrency"`
	PriceUnit     *models.PriceUnit       `json:"priceUnit"`
	City          *string                 `json:"city"`
	Latitude      *float64                `json:"latitude"`
	Longitude     *float64                `json:"longitude"`
	Images        *[]string               `json:"images"`
	Tags          *[]string               `json:"tags"`
	IsActive      *bool                   `json:"isActive"`
}

func NewServiceHandler(service *services.ServiceService) *ServiceHandler {
	return &ServiceHandler{
		service: service,
	}
}

func (h *ServiceHandler) Create(c *gin.Context) {
	// Check if user is authenticated
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	userID, ok := userIDRaw.(uint)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
		return
	}

	// Check if user is a professional or company
	userTypeRaw, typeExists := c.Get("userType")
	if !typeExists {
		c.JSON(http.StatusForbidden, gin.H{"error": "User type is required"})
		return
	}

	userType, ok := userTypeRaw.(string)
	if !ok {
		c.JSON(http.StatusForbidden, gin.H{"error": "Invalid user type"})
		return
	}

	if userType != string(models.TypeProfessional) && userType != string(models.TypeCompany) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only professional or company accounts can create services"})
		return
	}

	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if strings.TrimSpace(service.Title) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	if service.Category == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category is required"})
		return
	}

	// Validate category
	if !models.IsValidCategory(service.Category) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category. Please choose from supported categories."})
		return
	}

	if service.PriceAmount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Price amount must be greater than zero"})
		return
	}

	if service.PriceUnit == "" {
		service.PriceUnit = models.PriceUnitJob
	}

	if !models.IsValidPriceUnit(service.PriceUnit) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price unit. Use hour, job, or day."})
		return
	}

	if service.PriceCurrency == "" {
		service.PriceCurrency = "MAD"
	}

	// Set provider ID from authenticated user
	service.ProviderID = userID

	// New services start as inactive and unverified (pending admin approval)
	service.IsActive = false
	service.IsVerified = false
	service.TrustScore = 0

	if err := h.service.Create(&service); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create service"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Service created successfully. Pending admin approval.",
		"service": service,
	})
}

func (h *ServiceHandler) List(c *gin.Context) {
	services, err := h.service.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch services"})
		return
	}
	c.JSON(http.StatusOK, services)
}

func (h *ServiceHandler) Get(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	service, err := h.service.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	c.JSON(http.StatusOK, service)
}

func (h *ServiceHandler) Update(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Ensure the service exists and capture ownership.
	existing, err := h.service.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	userID, ok := userIDRaw.(uint)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
		return
	}

	roleRaw, _ := c.Get("role")
	role, _ := roleRaw.(string)
	if role != string(models.RoleAdmin) && existing.ProviderID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to update this service"})
		return
	}

	var req updateServiceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	updates := map[string]interface{}{}

	if req.Title != nil {
		if *req.Title == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Title cannot be empty"})
			return
		}
		updates["title"] = *req.Title
	}
	if req.Description != nil {
		updates["description"] = *req.Description
	}
	if req.Category != nil {
		updates["category"] = *req.Category
	}
	if req.PriceAmount != nil {
		updates["price_amount"] = *req.PriceAmount
	}
	if req.PriceCurrency != nil {
		updates["price_currency"] = *req.PriceCurrency
	}
	if req.PriceUnit != nil {
		updates["price_unit"] = *req.PriceUnit
	}
	if req.City != nil {
		updates["city"] = *req.City
	}
	if req.Latitude != nil {
		updates["latitude"] = *req.Latitude
	}
	if req.Longitude != nil {
		updates["longitude"] = *req.Longitude
	}
	if req.Images != nil {
		updates["images"] = *req.Images
	}
	if req.Tags != nil {
		updates["tags"] = *req.Tags
	}
	if req.IsActive != nil {
		updates["is_active"] = *req.IsActive
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	if err := h.service.UpdateFields(uint(id), updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update service"})
		return
	}

	updated, err := h.service.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated service"})
		return
	}
	c.JSON(http.StatusOK, updated)
}

func (h *ServiceHandler) Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	service, err := h.service.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	userID, ok := userIDRaw.(uint)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
		return
	}

	roleRaw, _ := c.Get("role")
	role, _ := roleRaw.(string)
	if role != string(models.RoleAdmin) && service.ProviderID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to delete this service"})
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete service"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted successfully"})
}
