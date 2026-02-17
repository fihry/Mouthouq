package handlers_test

import (
	"net/http"
	"testing"

	"mouthouq/internal/models"
	"mouthouq/internal/testutil"
)

func TestUpdateProfileRejectsInvalidCoordinates(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	user := testutil.CreateUser(t, db, models.TypeCustomer, models.RoleUser)
	auth := testutil.AuthHeader(t, user)

	body := map[string]interface{}{
		"latitude":  323233,
		"longitude": 103232,
	}

	resp := testutil.DoJSONRequest(t, r, http.MethodPut, "/api/v1/users/profile", body, map[string]string{
		"Authorization": auth,
	})

	if resp.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", resp.Code)
	}
}

func TestUpdateProfileRejectsDuplicateUsername(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	userA := testutil.CreateUser(t, db, models.TypeCustomer, models.RoleUser)
	userB := testutil.CreateUser(t, db, models.TypeCustomer, models.RoleUser)

	body := map[string]interface{}{
		"username": userB.Username,
	}

	resp := testutil.DoJSONRequest(t, r, http.MethodPut, "/api/v1/users/profile", body, map[string]string{
		"Authorization": testutil.AuthHeader(t, userA),
	})

	if resp.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", resp.Code)
	}
}
