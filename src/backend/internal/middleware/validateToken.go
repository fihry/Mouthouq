package middleware

import (
	"fmt"
	"strings"

	jwt "github.com/golang-jwt/jwt/v5"
)

// Add this type for JWT claims
type Claims struct {
	UserId uint   `json:"userId"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// Add your JWT secret key
var jwtSecret = []byte("secret-key") // TODO: Move this to environment variables
// var jwtSecret = []byte(os.Getenv("JWT_SECRET"))  //export JWT_SECRET="your-secure-secret-key"
func ValidateToken(tokenString string) (*Claims, error) {
	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	// Parse and validate the token
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	// Extract claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("invalid token claims")
}
