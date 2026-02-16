package handlers_test

import (
	"encoding/json"
	"net/http"
	"testing"

	"mouthouq/internal/models"
	"mouthouq/internal/repositories"
	"mouthouq/internal/testutil"

	"github.com/lib/pq"
)

func TestServiceCreateRequiresImage(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	provider := testutil.CreateUser(t, db, models.TypeProfessional, models.RoleUser)
	auth := testutil.AuthHeader(t, provider)

	body := map[string]interface{}{
		"title":         "Electrical Repair",
		"description":   "Fix wiring issues",
		"priceAmount":   150,
		"priceCurrency": "MAD",
		"priceUnit":     "job",
		"category":      "Electrical",
		"city":          "Rabat",
	}

	resp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/services", body, map[string]string{"Authorization": auth})
	if resp.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", resp.Code)
	}
}

func TestServiceListFilters(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	provider := testutil.CreateUser(t, db, models.TypeProfessional, models.RoleUser)
	serviceRepo := repositories.NewServiceRepository(db)

	services := []models.Service{
		{
			ProviderID:    provider.ID,
			Title:         "Plumbing Basics",
			Description:   "Fix leaks",
			Category:      models.ServiceCategory("Plumbing"),
			PriceAmount:   100,
			PriceCurrency: "MAD",
			PriceUnit:     models.PriceUnitJob,
			City:          "Rabat",
			Images:        pq.StringArray{"http://example.com/plumbing.jpg"},
			IsActive:      true,
			IsVerified:    true,
		},
		{
			ProviderID:    provider.ID,
			Title:         "Cleaning Service",
			Description:   "Home cleaning",
			Category:      models.ServiceCategory("Cleaning"),
			PriceAmount:   200,
			PriceCurrency: "MAD",
			PriceUnit:     models.PriceUnitJob,
			City:          "Rabat",
			Images:        pq.StringArray{"http://example.com/clean.jpg"},
			IsActive:      true,
			IsVerified:    true,
		},
	}

	for i := range services {
		if err := serviceRepo.Create(&services[i]); err != nil {
			t.Fatalf("failed to seed service: %v", err)
		}
	}

	resp := testutil.DoJSONRequest(t, r, http.MethodGet, "/api/v1/services?category=Plumbing", nil, nil)
	if resp.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.Code)
	}

	var payload map[string]interface{}
	if err := json.Unmarshal(resp.Body.Bytes(), &payload); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	data, ok := payload["data"].([]interface{})
	if !ok {
		t.Fatalf("expected data array in response")
	}
	if len(data) != 1 {
		t.Fatalf("expected 1 service, got %d", len(data))
	}
}
