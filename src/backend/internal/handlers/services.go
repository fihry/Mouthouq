package handlers

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
	userID, ok := userIDRaw.(uuid.UUID)
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

	if len(service.Images) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one service image is required"})
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
	page := 1
	limit := 20
	if pageParam := c.Query("page"); pageParam != "" {
		value, err := strconv.Atoi(pageParam)
		if err != nil || value < 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page"})
			return
		}
		page = value
	}
	if limitParam := c.Query("limit"); limitParam != "" {
		value, err := strconv.Atoi(limitParam)
		if err != nil || value < 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit"})
			return
		}
		if value > 100 {
			value = 100
		}
		limit = value
	}

	filters := models.ServiceFilters{
		Query: strings.TrimSpace(c.Query("q")),
		City:  strings.TrimSpace(c.Query("city")),
	}

	if categoryParam := strings.TrimSpace(c.Query("category")); categoryParam != "" {
		category := models.ServiceCategory(categoryParam)
		if !models.IsValidCategory(category) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category"})
			return
		}
		filters.Category = category
	}

	if unitParam := strings.TrimSpace(c.Query("priceUnit")); unitParam != "" {
		unit := models.PriceUnit(unitParam)
		if !models.IsValidPriceUnit(unit) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid price unit"})
			return
		}
		filters.PriceUnit = unit
	}

	if minPriceParam := strings.TrimSpace(c.Query("minPrice")); minPriceParam != "" {
		value, err := strconv.ParseFloat(minPriceParam, 64)
		if err != nil || value < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid minPrice"})
			return
		}
		filters.MinPrice = &value
	}
	if maxPriceParam := strings.TrimSpace(c.Query("maxPrice")); maxPriceParam != "" {
		value, err := strconv.ParseFloat(maxPriceParam, 64)
		if err != nil || value < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid maxPrice"})
			return
		}
		filters.MaxPrice = &value
	}

	if providerParam := strings.TrimSpace(c.Query("providerId")); providerParam != "" {
		value, err := uuid.Parse(providerParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid providerId"})
			return
		}
		filters.ProviderID = &value
	}

	isActive := true
	isVerified := true
	filters.IsActive = &isActive
	filters.IsVerified = &isVerified

	order := "created_at desc"
	switch strings.TrimSpace(c.Query("sort")) {
	case "price_asc":
		order = "price_amount asc"
	case "price_desc":
		order = "price_amount desc"
	case "rating_desc":
		order = "rating_average desc"
	case "oldest":
		order = "created_at asc"
	case "", "newest":
		order = "created_at desc"
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid sort"})
		return
	}

	offset := (page - 1) * limit
	services, total, err := h.service.List(filters, limit, offset, order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch services"})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	c.JSON(http.StatusOK, gin.H{
		"data": services,
		"meta": gin.H{
			"page":       page,
			"limit":      limit,
			"total":      total,
			"totalPages": totalPages,
		},
	})
}

func (h *ServiceHandler) Get(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	service, err := h.service.Get(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	c.JSON(http.StatusOK, service)
}

func (h *ServiceHandler) Update(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Ensure the service exists and capture ownership.
	existing, err := h.service.Get(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	userID, ok := userIDRaw.(uuid.UUID)
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
		if len(*req.Images) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Service images cannot be empty"})
			return
		}
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

	if err := h.service.UpdateFields(id, updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update service"})
		return
	}

	updated, err := h.service.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated service"})
		return
	}
	c.JSON(http.StatusOK, updated)
}

func (h *ServiceHandler) Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	service, err := h.service.Get(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	userID, ok := userIDRaw.(uuid.UUID)
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

	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete service"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted successfully"})
}
