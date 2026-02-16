package handlers

import (
	"net/http"
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
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}
	if err := h.service.Register(&user); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Registration failed. Please check your details."})
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
			"id":    user.ID,
			"email": user.Email,
			"role":  user.Role,
			"userType": user.UserType,
		},
	})
}
