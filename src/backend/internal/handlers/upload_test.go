package handlers_test

import (
	"net/http"
	"testing"

	"mouthouq/internal/models"
	"mouthouq/internal/testutil"
)

func TestUploadReturnsServiceUnavailableWhenNotConfigured(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	user := testutil.CreateUser(t, db, models.TypeCustomer, models.RoleUser)

	resp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/uploads", nil, map[string]string{
		"Authorization": testutil.AuthHeader(t, user),
	})
	if resp.Code != http.StatusServiceUnavailable {
		t.Fatalf("expected 503, got %d", resp.Code)
	}
}
