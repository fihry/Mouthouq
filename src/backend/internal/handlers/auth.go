package handlers

import (
	"net/http"
	"strings"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/services"
	"mouthouq/internal/utils/jwt"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	service     *services.AuthService
	jwtSecret   string
	jwtDuration time.Duration
}

type registerRequest struct {
	Username    string          `json:"username"`
	FirstName   string          `json:"firstName"`
	LastName    string          `json:"lastName"`
	Email       string          `json:"email"`
	Password    string          `json:"password"`
	PhoneNumber string          `json:"phoneNumber"`
	City        string          `json:"city"`
	Address     string          `json:"address"`
	UserType    models.UserType `json:"userType"`
}

func NewAuthHandler(service *services.AuthService, jwtSecret string, expiration string) *AuthHandler {
	duration, err := time.ParseDuration(expiration + "h")
	if err != nil {
		duration = time.Hour * 24 // Fallback
	}
	return &AuthHandler{
		service:     service,
		jwtSecret:   jwtSecret,
		jwtDuration: duration,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if strings.TrimSpace(req.Username) == "" ||
		strings.TrimSpace(req.FirstName) == "" ||
		strings.TrimSpace(req.LastName) == "" ||
		strings.TrimSpace(req.Email) == "" ||
		strings.TrimSpace(req.Password) == "" ||
		strings.TrimSpace(req.PhoneNumber) == "" ||
		strings.TrimSpace(req.City) == "" ||
		req.UserType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	if !models.IsValidUserType(req.UserType) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user type"})
		return
	}

	user := models.User{
		Username:    req.Username,
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		Email:       req.Email,
		Password:    req.Password,
		PhoneNumber: req.PhoneNumber,
		City:        req.City,
		Address:     req.Address,
		UserType:    req.UserType,
		Role:        models.RoleUser,
	}

	if err := h.service.Register(&user); err != nil {
		msg := err.Error()
		switch {
		case strings.Contains(msg, "already exists"):
			c.JSON(http.StatusConflict, gin.H{"error": msg})
		case strings.Contains(msg, "missing required fields"), strings.Contains(msg, "invalid user type"):
			c.JSON(http.StatusBadRequest, gin.H{"error": msg})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Registration failed"})
		}
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := h.service.Login(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	token, err := jwt.GenerateToken(user.ID, user.Email, string(user.Role), string(user.UserType), h.jwtSecret, h.jwtDuration)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   token,
		"user": gin.H{
			"id":       user.ID,
			"email":    user.Email,
			"role":     user.Role,
			"userType": user.UserType,
		},
	})
}
