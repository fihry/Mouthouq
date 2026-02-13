package main

import (
	"log"

	"mouthouq/internal/config"
	"mouthouq/internal/database"
	"mouthouq/internal/handlers"
	"mouthouq/internal/repositories"
	"mouthouq/internal/routes"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Failed to load configuration:", err)
	}

	// Initialize database
	db, err := database.InitDB(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize Gin
	r := gin.Default()

	// Setup routes and wire dependencies
	setupServer(r, db, cfg)

	// Start server
	log.Printf("Server starting on port %s", cfg.Server.Port)
	r.Run(":" + cfg.Server.Port)
}

func setupServer(r *gin.Engine, db *gorm.DB, cfg *config.Config) {
	// Initialize Repositories
	authRepo := repositories.NewAuthRepository(db)
	userRepo := repositories.NewUserRepository(db)
	serviceRepo := repositories.NewServiceRepository(db)

	// Initialize Services
	authService := services.NewAuthService(authRepo)
	userService := services.NewUserService(userRepo)
	serviceService := services.NewServiceService(serviceRepo)

	// Initialize Handlers
	authHandler := handlers.NewAuthHandler(authService, cfg.Security.JWTSecret, cfg.Security.TokenExpiration)
	userHandler := handlers.NewUserHandler(userService)
	serviceHandler := handlers.NewServiceHandler(serviceService)

	// Create routes Handlers container
	h := routes.NewHandlers(db, authHandler, userHandler, serviceHandler, cfg.Security.JWTSecret)

	// Setup routes
	routes.SetupRoutes(r, h)
}
