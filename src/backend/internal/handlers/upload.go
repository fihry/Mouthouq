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

type uploadRule struct {
	mediaType       string
	allowedByMIME   map[string]map[string]struct{}
	providerOnlyUse bool
}

var uploadRules = map[string]uploadRule{
	"service-image": {
		mediaType: storage.MediaTypeImages,
		allowedByMIME: map[string]map[string]struct{}{
			"image/jpeg": {".jpg": {}, ".jpeg": {}},
			"image/png":  {".png": {}},
			"image/webp": {".webp": {}},
		},
	},
	"profile-image": {
		mediaType: storage.MediaTypeImages,
		allowedByMIME: map[string]map[string]struct{}{
			"image/jpeg": {".jpg": {}, ".jpeg": {}},
			"image/png":  {".png": {}},
			"image/webp": {".webp": {}},
		},
	},
	"provider-doc": {
		mediaType:       storage.MediaTypeDocuments,
		providerOnlyUse: true,
		allowedByMIME: map[string]map[string]struct{}{
			"image/jpeg":      {".jpg": {}, ".jpeg": {}},
			"image/png":       {".png": {}},
			"application/pdf": {".pdf": {}},
		},
	},
	"service-video": {
		mediaType: storage.MediaTypeVideos,
		allowedByMIME: map[string]map[string]struct{}{
			"video/mp4":       {".mp4": {}},
			"video/webm":      {".webm": {}},
			"video/quicktime": {".mov": {}},
		},
	},
	"service-audio": {
		mediaType: storage.MediaTypeAudio,
		allowedByMIME: map[string]map[string]struct{}{
			"audio/mpeg": {".mp3": {}},
			"audio/mp4":  {".m4a": {}},
			"audio/wav":  {".wav": {}},
			"audio/wave": {".wav": {}},
			"audio/ogg":  {".ogg": {}},
		},
	},
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
	rule, ok := uploadRules[purpose]
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid upload purpose"})
		return
	}

	userTypeRaw, _ := c.Get("userType")
	userType, _ := userTypeRaw.(string)
	if rule.providerOnlyUse && userType != string(models.TypeProfessional) && userType != string(models.TypeCompany) {
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

	ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
	if !isAllowedFile(rule, contentType, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unsupported file type"})
		return
	}

	objectKey := buildObjectKey(purpose, ext)

	result, err := h.uploader.Upload(c.Request.Context(), rule.mediaType, objectKey, file, fileHeader.Size, normalizeContentType(contentType))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload file"})
		return
	}

	c.JSON(http.StatusCreated, result)
}

func isAllowedFile(rule uploadRule, contentType, ext string) bool {
	if ext == "" {
		return false
	}
	mime := normalizeContentType(contentType)
	allowedExts, ok := rule.allowedByMIME[mime]
	if !ok {
		return false
	}
	_, ok = allowedExts[strings.ToLower(ext)]
	return ok
}

func normalizeContentType(contentType string) string {
	return strings.ToLower(strings.TrimSpace(strings.Split(contentType, ";")[0]))
}

func buildObjectKey(purpose, ext string) string {
	if ext == "" {
		ext = ".bin"
	}
	return strings.TrimLeft(path.Join("uploads", purpose, uuid.New().String()+ext), "/")
}
