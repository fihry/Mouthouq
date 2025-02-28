package database

import (
    "fmt"
    "log"
    "mouthouq/internal/config"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "mouthouq/internal/models"
)

func InitDB(cfg *config.Config) (*gorm.DB, error) {
    dsn := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        cfg.Database.Host,
        cfg.Database.Port,
        cfg.Database.User,
        cfg.Database.Password,
        cfg.Database.Name,
    )
    
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, fmt.Errorf("failed to connect to database: %w", err)
    }

    // Auto Migrate the schemas
    err = db.AutoMigrate(&models.User{}, &models.Service{})
    if err != nil {
        return nil, fmt.Errorf("failed to migrate database: %w", err)
    }

    log.Println("Database migration completed successfully")
    return db, nil
}