package testutil

import (
	"os"
	"testing"
	"time"

	"mouthouq/internal/handlers"
	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
	"mouthouq/internal/routes"
	"mouthouq/internal/services"
	"mouthouq/internal/utils/jwt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const TestJWTSecret = "test-secret"

func OpenTestDB(t *testing.T) *gorm.DB {
	t.Helper()
	dsn := os.Getenv("TEST_DB_DSN")
	if dsn == "" {
		t.Skip("TEST_DB_DSN not set; skipping database tests")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect to test database: %v", err)
	}

	if err := resetDB(db); err != nil {
		t.Fatalf("failed to reset test database: %v", err)
	}

	return db
}

func resetDB(db *gorm.DB) error {
	dropSQL := "DROP TABLE IF EXISTS provider_verifications, transactions, bookings, reviews, services, users CASCADE"
	if err := db.Exec(dropSQL).Error; err != nil {
		return err
	}

	return db.AutoMigrate(
		&models.User{},
		&models.Service{},
		&models.Review{},
		&models.Booking{},
		&models.Transaction{},
		&models.ProviderVerification{},
	)
}

func NewRouter(t *testing.T, db *gorm.DB) *gin.Engine {
	t.Helper()
	gin.SetMode(gin.TestMode)

	authRepo := repositories.NewAuthRepository(db)
	userRepo := repositories.NewUserRepository(db)
	serviceRepo := repositories.NewServiceRepository(db)
	bookingRepo := repositories.NewBookingRepository(db)
	transactionRepo := repositories.NewTransactionRepository(db)
	reviewRepo := repositories.NewReviewRepository(db)
	verificationRepo := repositories.NewVerificationRepository(db)

	authService := services.NewAuthService(authRepo)
	userService := services.NewUserService(userRepo)
	aiService := services.NewAIService()
	serviceService := services.NewServiceService(serviceRepo, aiService)
	bookingService := services.NewBookingService(bookingRepo, serviceRepo, transactionRepo)
	reviewService := services.NewReviewService(reviewRepo, serviceRepo, bookingRepo, aiService)
	verificationService := services.NewVerificationService(verificationRepo, userRepo)

	authHandler := handlers.NewAuthHandler(authService, TestJWTSecret, "24")
	userHandler := handlers.NewUserHandler(userService)
	serviceHandler := handlers.NewServiceHandler(serviceService)
	bookingHandler := handlers.NewBookingHandler(bookingService)
	reviewHandler := handlers.NewReviewHandler(reviewService)
	adminHandler := handlers.NewAdminHandler(userService, serviceService)
	verificationHandler := handlers.NewVerificationHandler(verificationService)
	uploadHandler := handlers.NewUploadHandler(nil)

	h := routes.NewHandlers(db, authHandler, userHandler, serviceHandler, bookingHandler, reviewHandler, adminHandler, uploadHandler, verificationHandler, TestJWTSecret)
	r := gin.New()
	routes.SetupRoutes(r, h)
	return r
}

func CreateUser(t *testing.T, db *gorm.DB, userType models.UserType, role models.UserRole) models.User {
	t.Helper()
	authRepo := repositories.NewAuthRepository(db)
	authService := services.NewAuthService(authRepo)
	userRepo := repositories.NewUserRepository(db)

	id := uuid.NewString()
	user := models.User{
		Username:    "user_" + id,
		FirstName:   "Test",
		LastName:    "User",
		Email:       id + "@example.com",
		Password:    "Password123!",
		PhoneNumber: "+212600000000",
		City:        "Rabat",
		Address:     "Address",
		UserType:    userType,
		Role:        role,
	}

	if err := authService.Register(&user); err != nil {
		t.Fatalf("failed to create user: %v", err)
	}

	if role == models.RoleAdmin {
		if err := userRepo.UpdateFields(user.ID, map[string]interface{}{"role": role}); err != nil {
			t.Fatalf("failed to set admin role: %v", err)
		}
		user.Role = role
	}

	return user
}

func AuthHeader(t *testing.T, user models.User) string {
	t.Helper()
	token, err := jwt.GenerateToken(user.ID, user.Email, string(user.Role), string(user.UserType), TestJWTSecret, time.Hour*24)
	if err != nil {
		t.Fatalf("failed to generate token: %v", err)
	}
	return "Bearer " + token
}
