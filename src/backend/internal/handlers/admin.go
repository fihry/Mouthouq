package handlers

import (
	"net/http"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AdminHandler struct {
	users    *services.UserService
	services *services.ServiceService
}

type updateUserRoleRequest struct {
	Role models.UserRole `json:"role"`
}

type verifyServiceRequest struct {
	IsVerified *bool `json:"isVerified"`
	IsActive   *bool `json:"isActive"`
}

func NewAdminHandler(users *services.UserService, services *services.ServiceService) *AdminHandler {
	return &AdminHandler{
		users:    users,
		services: services,
	}
}

func (h *AdminHandler) ListUsers(c *gin.Context) {
	users, err := h.users.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (h *AdminHandler) UpdateUserRole(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var req updateUserRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !models.IsValidUserRole(req.Role) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid role"})
		return
	}

	if err := h.users.UpdateFields(id, map[string]interface{}{"role": req.Role}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user role"})
		return
	}

	user, err := h.users.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *AdminHandler) ListPendingServices(c *gin.Context) {
	services, err := h.services.ListPending()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch services"})
		return
	}
	c.JSON(http.StatusOK, services)
}

func (h *AdminHandler) VerifyService(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid service ID"})
		return
	}

	var req verifyServiceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	updates := map[string]interface{}{}
	if req.IsVerified != nil {
		updates["is_verified"] = *req.IsVerified
	}
	if req.IsActive != nil {
		updates["is_active"] = *req.IsActive
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	if err := h.services.UpdateFields(id, updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update service"})
		return
	}

	service, err := h.services.Get(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated service"})
		return
	}

	c.JSON(http.StatusOK, service)
}
