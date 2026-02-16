package handlers_test

import (
	"encoding/json"
	"net/http"
	"testing"

	"mouthouq/internal/models"
	"mouthouq/internal/testutil"
)

func TestProviderVerificationFlow(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	provider := testutil.CreateUser(t, db, models.TypeProfessional, models.RoleUser)
	admin := testutil.CreateUser(t, db, models.TypeProfessional, models.RoleAdmin)

	submitBody := map[string]interface{}{
		"documentType": "id_card",
		"documentUrls": []string{"http://example.com/doc.png"},
		"notes":        "Please verify",
	}

	submitResp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/providers/verification", submitBody, map[string]string{
		"Authorization": testutil.AuthHeader(t, provider),
	})
	if submitResp.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d", submitResp.Code)
	}

	var submitPayload map[string]interface{}
	if err := json.Unmarshal(submitResp.Body.Bytes(), &submitPayload); err != nil {
		t.Fatalf("failed to parse submit response: %v", err)
	}
	verificationID, ok := submitPayload["id"].(string)
	if !ok || verificationID == "" {
		t.Fatalf("expected verification id")
	}

	statusResp := testutil.DoJSONRequest(t, r, http.MethodGet, "/api/v1/providers/verification", nil, map[string]string{
		"Authorization": testutil.AuthHeader(t, provider),
	})
	if statusResp.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", statusResp.Code)
	}

	pendingResp := testutil.DoJSONRequest(t, r, http.MethodGet, "/api/v1/admin/providers/verification/pending", nil, map[string]string{
		"Authorization": testutil.AuthHeader(t, admin),
	})
	if pendingResp.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", pendingResp.Code)
	}

	reviewBody := map[string]interface{}{
		"status":      "verified",
		"reviewNotes": "Approved",
	}
	reviewResp := testutil.DoJSONRequest(t, r, http.MethodPatch, "/api/v1/admin/providers/verification/"+verificationID, reviewBody, map[string]string{
		"Authorization": testutil.AuthHeader(t, admin),
	})
	if reviewResp.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", reviewResp.Code)
	}
}
