package handlers

import (
	"net/http"
	"strconv"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type ServiceHandler struct {
	service *services.ServiceService
}

func NewServiceHandler(service *services.ServiceService) *ServiceHandler {
	return &ServiceHandler{
		service: service,
	}
}

func (h *ServiceHandler) Create(c *gin.Context) {
	// Check if user is authenticated
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	// Check if user is a professional
	userRole, roleExists := c.Get("userRole")
	if !roleExists || userRole != "professional" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only professionals can create services"})
		return
	}

	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Validate category
	if !models.IsValidCategory(service.Category) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category. Please choose from supported categories."})
		return
	}

	// Set provider ID from authenticated user
	service.ProviderID = userID.(uint)

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
	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}
	service.ID = uint(id)
	if err := h.service.Update(&service); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update service"})
		return
	}
	c.JSON(http.StatusOK, service)
}

func (h *ServiceHandler) Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	if err := h.service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete service"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted successfully"})
}
