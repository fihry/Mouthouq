package handlers

import (
	"math"
	"net/http"
	"strings"

	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
	var userID uuid.UUID

	idParam := c.Param("id")
	if idParam != "" {
		id, err := uuid.Parse(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}
		userID = id
	} else {
		// Try to get from authenticated context
		val, exists := c.Get("userId")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		id, ok := val.(uuid.UUID)
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
	var userID uuid.UUID

	idParam := c.Param("id")
	if idParam != "" {
		id, err := uuid.Parse(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}
		userID = id
	} else {
		val, exists := c.Get("userId")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		id, ok := val.(uuid.UUID)
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

	currentUser, err := h.service.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	updates := map[string]interface{}{}

	if req.Username != nil {
		username := strings.TrimSpace(*req.Username)
		if username == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username cannot be empty"})
			return
		}
		if username != currentUser.Username {
			taken, err := h.service.IsUsernameTakenByOther(userID, username)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate username"})
				return
			}
			if taken {
				c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
				return
			}
			updates["username"] = username
		}
	}
	if req.FirstName != nil {
		updates["first_name"] = *req.FirstName
	}
	if req.LastName != nil {
		updates["last_name"] = *req.LastName
	}
	if req.Email != nil {
		email := strings.TrimSpace(*req.Email)
		if email == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email cannot be empty"})
			return
		}
		if email != currentUser.Email {
			taken, err := h.service.IsEmailTakenByOther(userID, email)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate email"})
				return
			}
			if taken {
				c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
				return
			}
			updates["email"] = email
		}
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
		if math.IsNaN(*req.Latitude) || math.IsInf(*req.Latitude, 0) || *req.Latitude < -90 || *req.Latitude > 90 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Latitude must be between -90 and 90"})
			return
		}
		updates["latitude"] = *req.Latitude
	}
	if req.Longitude != nil {
		if math.IsNaN(*req.Longitude) || math.IsInf(*req.Longitude, 0) || *req.Longitude < -180 || *req.Longitude > 180 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Longitude must be between -180 and 180"})
			return
		}
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
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete profile"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
