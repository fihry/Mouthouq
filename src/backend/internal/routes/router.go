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
	bookings  *handlers.BookingHandler
	reviews   *handlers.ReviewHandler
	admin     *handlers.AdminHandler
	uploads   *handlers.UploadHandler
	verify    *handlers.VerificationHandler
	jwtSecret string
}

func NewHandlers(db *gorm.DB, auth *handlers.AuthHandler, users *handlers.UserHandler, service *handlers.ServiceHandler, bookings *handlers.BookingHandler, reviews *handlers.ReviewHandler, admin *handlers.AdminHandler, uploads *handlers.UploadHandler, verify *handlers.VerificationHandler, jwtSecret string) *Handlers {
	return &Handlers{
		db:        db,
		auth:      auth,
		users:     users,
		service:   service,
		bookings:  bookings,
		reviews:   reviews,
		admin:     admin,
		uploads:   uploads,
		verify:    verify,
		jwtSecret: jwtSecret,
	}
}

func SetupRoutes(r *gin.Engine, h *Handlers) {
	api := r.Group("/api/v1")

	// Health check
	api.GET("/health", h.HealthCheck)

	// Public routes
	auth := api.Group("/auth")
	auth.POST("/register", h.auth.Register)
	auth.POST("/login", h.auth.Login)

	servicesPublic := api.Group("/services")
	servicesPublic.GET("", h.service.List)
	servicesPublic.GET("/:id", h.service.Get)

	reviewsPublic := api.Group("/reviews")
	reviewsPublic.GET("/:serviceId", h.reviews.ListByService)

	// Protected routes
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware(h.jwtSecret))
	{
		users := protected.Group("/users")
		users.GET("/profile", h.users.GetProfile)
		users.PUT("/profile", h.users.UpdateProfile)

		services := protected.Group("/services")
		services.POST("", h.service.Create)
		services.PUT("/:id", h.service.Update)
		services.DELETE("/:id", h.service.Delete)

		bookings := protected.Group("/bookings")
		bookings.POST("", h.bookings.Create)
		bookings.GET("", h.bookings.List)
		bookings.GET("/:id", h.bookings.Get)
		bookings.PATCH("/:id/confirm", h.bookings.Confirm)
		bookings.PATCH("/:id/complete", h.bookings.Complete)
		bookings.PATCH("/:id/cancel", h.bookings.Cancel)

		reviews := protected.Group("/reviews")
		reviews.POST("", h.reviews.Create)

		verification := protected.Group("/providers/verification")
		verification.POST("", h.verify.Submit)
		verification.GET("", h.verify.GetStatus)

		uploads := protected.Group("/uploads")
		uploads.POST("", h.uploads.Upload)
	}

	// Admin routes
	admin := api.Group("/admin")
	admin.Use(middleware.AuthMiddleware(h.jwtSecret), middleware.AdminMiddleware())
	admin.GET("/users", h.admin.ListUsers)
	admin.PATCH("/users/:id/role", h.admin.UpdateUserRole)
	admin.GET("/services/pending", h.admin.ListPendingServices)
	admin.PATCH("/services/:id/verify", h.admin.VerifyService)
	admin.GET("/providers/verification/pending", h.verify.ListPending)
	admin.PATCH("/providers/verification/:id", h.verify.Review)
}

func (h *Handlers) HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status":  "OK",
		"message": "the api is healthy",
	})
}
