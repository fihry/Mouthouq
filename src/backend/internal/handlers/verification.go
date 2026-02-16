package handlers

import (
	"net/http"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type VerificationHandler struct {
	service *services.VerificationService
}

type submitVerificationRequest struct {
	DocumentType models.VerificationDocumentType `json:"documentType"`
	DocumentURLs []string                       `json:"documentUrls"`
	Notes         string                         `json:"notes"`
}

func NewVerificationHandler(service *services.VerificationService) *VerificationHandler {
	return &VerificationHandler{service: service}
}

func (h *VerificationHandler) Submit(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	userType, ok := getUserType(c)
	if !ok {
		return
	}

	if userType != string(models.TypeProfessional) && userType != string(models.TypeCompany) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only providers can request verification"})
		return
	}

	var req submitVerificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !models.IsValidVerificationDocumentType(req.DocumentType) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid document type"})
		return
	}

	if len(req.DocumentURLs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentUrls are required"})
		return
	}

	verification, err := h.service.Submit(userID, req.DocumentType, req.DocumentURLs, req.Notes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, verification)
}

func (h *VerificationHandler) GetStatus(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	verification, err := h.service.GetByUserID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Verification not found"})
		return
	}

	c.JSON(http.StatusOK, verification)
}

type reviewVerificationRequest struct {
	Status      models.VerificationStatus `json:"status"`
	ReviewNotes string                    `json:"reviewNotes"`
}

func (h *VerificationHandler) Review(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid verification ID"})
		return
	}

	reviewerID, ok := getUserID(c)
	if !ok {
		return
	}

	var req reviewVerificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if req.Status != models.StatusVerified && req.Status != models.StatusRejected {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status must be verified or rejected"})
		return
	}

	verification, err := h.service.Review(id, req.Status, reviewerID, req.ReviewNotes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, verification)
}

func (h *VerificationHandler) ListPending(c *gin.Context) {
	verifications, err := h.service.ListPending()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch verifications"})
		return
	}
	c.JSON(http.StatusOK, verifications)
}
