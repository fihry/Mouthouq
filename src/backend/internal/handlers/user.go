package handlers

import (
	"net/http"
	"strconv"

	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *services.UserService
}

type updateProfileRequest struct {
	Username     *string  `json:"username"`
	FirstName    *string  `json:"firstName"`
	LastName     *string  `json:"lastName"`
	Email        *string  `json:"email"`
	PhoneNumber  *string  `json:"phoneNumber"`
	City         *string  `json:"city"`
	Address      *string  `json:"address"`
	Latitude     *float64 `json:"latitude"`
	Longitude    *float64 `json:"longitude"`
	ProfileImage *string  `json:"profileImage"`
}

func NewUserHandler(service *services.UserService) *UserHandler {
	return &UserHandler{
		service: service,
	}
}

// Get user profile (either by ID param or from authenticated context)
func (h *UserHandler) GetProfile(c *gin.Context) {
	var userID uint

	idParam := c.Param("id")
	if idParam != "" {
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}
		userID = uint(id)
	} else {
		// Try to get from authenticated context
		val, exists := c.Get("userId")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		id, ok := val.(uint)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
			return
		}
		userID = id
	}

	user, err := h.service.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Update user profile
func (h *UserHandler) UpdateProfile(c *gin.Context) {
	var userID uint

	idParam := c.Param("id")
	if idParam != "" {
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}
		userID = uint(id)
	} else {
		val, exists := c.Get("userId")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		id, ok := val.(uint)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
			return
		}
		userID = id
	}

	var req updateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := map[string]interface{}{}

	if req.Username != nil {
		if *req.Username == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username cannot be empty"})
			return
		}
		updates["username"] = *req.Username
	}
	if req.FirstName != nil {
		updates["first_name"] = *req.FirstName
	}
	if req.LastName != nil {
		updates["last_name"] = *req.LastName
	}
	if req.Email != nil {
		if *req.Email == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email cannot be empty"})
			return
		}
		updates["email"] = *req.Email
	}
	if req.PhoneNumber != nil {
		updates["phone_number"] = *req.PhoneNumber
	}
	if req.City != nil {
		updates["city"] = *req.City
	}
	if req.Address != nil {
		updates["address"] = *req.Address
	}
	if req.Latitude != nil {
		updates["latitude"] = *req.Latitude
	}
	if req.Longitude != nil {
		updates["longitude"] = *req.Longitude
	}
	if req.ProfileImage != nil {
		updates["profile_image"] = *req.ProfileImage
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	if err := h.service.UpdateFields(userID, updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	user, err := h.service.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated profile"})
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
