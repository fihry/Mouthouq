package database

import (
	"fmt"
	"log"
	"mouthouq/internal/config"
	"strconv"

	"mouthouq/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB(cfg *config.Config) (*gorm.DB, error) {
	port, err := strconv.Atoi(cfg.Database.Port)
	if err != nil {
		return nil, fmt.Errorf("invalid database port: %w", err)
	}

	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		cfg.Database.Host,
		port,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
	)

	log.Println("Connecting to database:", cfg.Database.Name)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Auto Migrate the schemas
	err = db.AutoMigrate(&models.User{}, &models.Service{}, &models.Review{}, &models.Booking{}, &models.Transaction{})
	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database migration completed successfully")
	return db, nil
}
