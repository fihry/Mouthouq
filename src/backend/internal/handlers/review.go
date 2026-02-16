package handlers

import (
	"net/http"
	"strconv"

	"mouthouq/internal/models"
	"mouthouq/internal/services"

	"github.com/gin-gonic/gin"
)

type ReviewHandler struct {
	service *services.ReviewService
}

type createReviewRequest struct {
	ServiceID uint    `json:"serviceId"`
	Rating    float64 `json:"rating"`
	Comment   string  `json:"comment"`
}

func NewReviewHandler(service *services.ReviewService) *ReviewHandler {
	return &ReviewHandler{service: service}
}

func (h *ReviewHandler) Create(c *gin.Context) {
	userID, ok := getUserID(c)
	if !ok {
		return
	}

	userType, ok := getUserType(c)
	if !ok {
		return
	}

	if userType != string(models.TypeCustomer) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only customer accounts can submit reviews"})
		return
	}

	var req createReviewRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if req.ServiceID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service ID is required"})
		return
	}

	if req.Rating < 1 || req.Rating > 5 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be between 1 and 5"})
		return
	}

	review, err := h.service.Create(req.ServiceID, userID, req.Rating, req.Comment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, review)
}

func (h *ReviewHandler) ListByService(c *gin.Context) {
	idParam := c.Param("serviceId")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid service ID"})
		return
	}

	reviews, err := h.service.ListByServiceID(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch reviews"})
		return
	}

	c.JSON(http.StatusOK, reviews)
}
