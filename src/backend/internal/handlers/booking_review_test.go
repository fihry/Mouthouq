package handlers_test

import (
	"encoding/json"
	"net/http"
	"testing"
	"time"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
	"mouthouq/internal/testutil"
)

func TestBookingLifecycleAndReview(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	provider := testutil.CreateUser(t, db, models.TypeProfessional, models.RoleUser)
	customer := testutil.CreateUser(t, db, models.TypeCustomer, models.RoleUser)

	serviceRepo := repositories.NewServiceRepository(db)
	service := models.Service{
		ProviderID:    provider.ID,
		Title:         "Handyman",
		Description:   "Fix things",
		Category:      models.ServiceCategory("Handyman"),
		PriceAmount:   120,
		PriceCurrency: "MAD",
		PriceUnit:     models.PriceUnitJob,
		City:          "Rabat",
		Images:        []string{"http://example.com/handyman.jpg"},
		IsActive:      true,
		IsVerified:    true,
	}
	if err := serviceRepo.Create(&service); err != nil {
		t.Fatalf("failed to seed service: %v", err)
	}

	bookingBody := map[string]interface{}{
		"serviceId":   service.ID,
		"scheduledAt": time.Now().Add(24 * time.Hour).UTC().Format(time.RFC3339),
		"notes":       "Call before arriving",
	}

	bookingResp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/bookings", bookingBody, map[string]string{
		"Authorization": testutil.AuthHeader(t, customer),
	})
	if bookingResp.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d", bookingResp.Code)
	}

	var bookingPayload map[string]interface{}
	if err := json.Unmarshal(bookingResp.Body.Bytes(), &bookingPayload); err != nil {
		t.Fatalf("failed to parse booking response: %v", err)
	}
	bookingID, ok := bookingPayload["id"].(string)
	if !ok || bookingID == "" {
		t.Fatalf("expected booking id")
	}

	reviewBody := map[string]interface{}{
		"serviceId": service.ID,
		"rating":    5,
		"comment":   "Great service",
	}
	preReview := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/reviews", reviewBody, map[string]string{
		"Authorization": testutil.AuthHeader(t, customer),
	})
	if preReview.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for review before completion, got %d", preReview.Code)
	}

	confirmResp := testutil.DoJSONRequest(t, r, http.MethodPatch, "/api/v1/bookings/"+bookingID+"/confirm", nil, map[string]string{
		"Authorization": testutil.AuthHeader(t, provider),
	})
	if confirmResp.Code != http.StatusOK {
		t.Fatalf("expected 200 confirm, got %d", confirmResp.Code)
	}

	completeResp := testutil.DoJSONRequest(t, r, http.MethodPatch, "/api/v1/bookings/"+bookingID+"/complete", nil, map[string]string{
		"Authorization": testutil.AuthHeader(t, provider),
	})
	if completeResp.Code != http.StatusOK {
		t.Fatalf("expected 200 complete, got %d", completeResp.Code)
	}

	postReview := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/reviews", reviewBody, map[string]string{
		"Authorization": testutil.AuthHeader(t, customer),
	})
	if postReview.Code != http.StatusCreated {
		t.Fatalf("expected 201 review, got %d", postReview.Code)
	}
}
