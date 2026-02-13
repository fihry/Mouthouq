package handlers

import (
	"net/http"
	"strconv"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(service *services.UserService) *UserHandler {
	return &UserHandler{
		service: service,
	}
}

// Get user profile by ID (e.g., /users/:id)
func (h *UserHandler) GetProfile(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	user, err := h.service.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Update user profile
func (h *UserHandler) UpdateProfile(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user.ID = uint(id)
	if err := h.service.Update(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Delete user profile
func (h *UserHandler) DeleteProfile(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	if err := h.service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete profile"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
