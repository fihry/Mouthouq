package middleware

import (
	"strings"

	"mouthouq/internal/models"
	"mouthouq/internal/utils/jwt"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(401, gin.H{"error": "No authorization header"})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix
		token = strings.TrimPrefix(token, "Bearer ")

		// jwt utility already handles "Bearer " prefixing if implemented,
		// but let's be explicit if needed. My utility doesn't yet.
		// Use strings.TrimPrefix in utility or here.

		claims, err := jwt.ValidateToken(token, secret)
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Add user info to context
		c.Set("userId", claims.UserID)
		c.Set("role", claims.Role)
		c.Set("userType", claims.UserType)
		c.Next()
	}
}

func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		roleRaw, exists := c.Get("role")
		if !exists {
			c.JSON(403, gin.H{"error": "Admin role required"})
			c.Abort()
			return
		}
		role, ok := roleRaw.(string)
		if !ok || role != string(models.RoleAdmin) {
			c.JSON(403, gin.H{"error": "Admin role required"})
			c.Abort()
			return
		}
		c.Next()
	}
}
