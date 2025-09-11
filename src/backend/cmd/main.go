package main

import (
	"log"

	"mouthouq/internal/config"
	"mouthouq/internal/database"
	"mouthouq/internal/routes"

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

	// Setup routes with db
	setupServer(r, db)

	// Start server
	log.Printf("Server starting on port %s", cfg.Server.Port)
	r.Run(":" + cfg.Server.Port)
}

func setupServer(r *gin.Engine, db *gorm.DB) {
	// Initialize handlers with db
	handlers := routes.NewHandlers(db)

	// Setup routes
	routes.SetupRoutes(r, handlers)
}
