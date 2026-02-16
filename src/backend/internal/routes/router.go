package routes

import (
	"mouthouq/internal/handlers"
	"mouthouq/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Handlers struct {
	db        *gorm.DB
	auth      *handlers.AuthHandler
	users     *handlers.UserHandler
	service   *handlers.ServiceHandler
	jwtSecret string
}

func NewHandlers(db *gorm.DB, auth *handlers.AuthHandler, users *handlers.UserHandler, service *handlers.ServiceHandler, jwtSecret string) *Handlers {
	return &Handlers{
		db:        db,
		auth:      auth,
		users:     users,
		service:   service,
		jwtSecret: jwtSecret,
	}
}

func SetupRoutes(r *gin.Engine, h *Handlers) {
	// Health check
	r.GET("/health", h.HealthCheck)

	// API routes
	api := r.Group("/api/v1")
	{
		// Public routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", h.auth.Register)
			auth.POST("/login", h.auth.Login)
		}

		servicesPublic := api.Group("/services")
		{
			servicesPublic.GET("", h.service.List)
			servicesPublic.GET("/:id", h.service.Get)
		}

		// Protected routes
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware(h.jwtSecret))
		{
			// User routes
			users := protected.Group("/users")
			{
				users.GET("/profile", h.users.GetProfile)
				users.PUT("/profile", h.users.UpdateProfile)
			}

			// Service routes
			services := protected.Group("/services")
			{
				services.POST("", h.service.Create)
				services.PUT("/:id", h.service.Update)
				services.DELETE("/:id", h.service.Delete)
			}
		}
	}
}

func (h *Handlers) HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "ok",
		"db":     h.db.Name(),
	})
}
