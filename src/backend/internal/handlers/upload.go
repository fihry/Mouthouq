package handlers

import (
	"net/http"
	"path"
	"path/filepath"
	"strings"

	"mouthouq/internal/models"
	"mouthouq/internal/storage"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const maxUploadSizeBytes = 10 << 20 // 10 MB

var allowedUploadPurposes = map[string]struct{}{
	"service-image": {},
	"provider-doc":  {},
	"profile-image": {},
}

type UploadHandler struct {
	uploader *storage.MinioUploader
}

func NewUploadHandler(uploader *storage.MinioUploader) *UploadHandler {
	return &UploadHandler{uploader: uploader}
}

func (h *UploadHandler) Upload(c *gin.Context) {
	if h.uploader == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Upload service is not configured"})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}
	if _, ok := userIDRaw.(uuid.UUID); !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user identity"})
		return
	}

	purpose := strings.TrimSpace(c.PostForm("purpose"))
	if purpose == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "purpose is required"})
		return
	}
	if _, ok := allowedUploadPurposes[purpose]; !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upload purpose"})
		return
	}

	userTypeRaw, _ := c.Get("userType")
	userType, _ := userTypeRaw.(string)
	if purpose == "provider-doc" && userType != string(models.TypeProfessional) && userType != string(models.TypeCompany) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only providers can upload verification documents"})
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file is required"})
		return
	}

	if fileHeader.Size > maxUploadSizeBytes {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file exceeds maximum size"})
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read file"})
		return
	}
	defer file.Close()

	buffer := make([]byte, 512)
	n, _ := file.Read(buffer)
	contentType := http.DetectContentType(buffer[:n])
	if _, err := file.Seek(0, 0); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read file"})
		return
	}

	if !isAllowedContentType(purpose, contentType) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unsupported file type"})
		return
	}

	ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
	objectKey := buildObjectKey(purpose, ext)

	result, err := h.uploader.Upload(c.Request.Context(), objectKey, file, fileHeader.Size, contentType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload file"})
		return
	}

	c.JSON(http.StatusCreated, result)
}

func isAllowedContentType(purpose, contentType string) bool {
	switch purpose {
	case "service-image", "profile-image":
		return contentType == "image/jpeg" || contentType == "image/png" || contentType == "image/webp"
	case "provider-doc":
		return contentType == "image/jpeg" || contentType == "image/png" || contentType == "application/pdf"
	default:
		return false
	}
}

func buildObjectKey(purpose, ext string) string {
	if ext == "" {
		ext = ".bin"
	}
	return strings.TrimLeft(path.Join("uploads", purpose, uuid.New().String()+ext), "/")
}
