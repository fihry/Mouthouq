package handlers_test

import (
	"encoding/json"
	"net/http"
	"testing"

	"mouthouq/internal/testutil"
)

func TestRegisterRequiresFields(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	resp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/auth/register", map[string]string{
		"email":    "user@example.com",
		"password": "Password123!",
	}, nil)

	if resp.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", resp.Code)
	}
}

func TestRegisterAndLogin(t *testing.T) {
	db := testutil.OpenTestDB(t)
	r := testutil.NewRouter(t, db)

	registerBody := map[string]string{
		"username":    "user_one",
		"firstName":   "Test",
		"lastName":    "User",
		"email":       "user1@example.com",
		"password":    "Password123!",
		"phoneNumber": "+212600000111",
		"city":        "Rabat",
		"address":     "Street 1",
		"userType":    "customer",
	}

	resp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/auth/register", registerBody, nil)
	if resp.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d", resp.Code)
	}

	loginBody := map[string]string{
		"email":    "user1@example.com",
		"password": "Password123!",
	}

	loginResp := testutil.DoJSONRequest(t, r, http.MethodPost, "/api/v1/auth/login", loginBody, nil)
	if loginResp.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", loginResp.Code)
	}

	var payload map[string]interface{}
	if err := json.Unmarshal(loginResp.Body.Bytes(), &payload); err != nil {
		t.Fatalf("failed to parse login response: %v", err)
	}
	if payload["token"] == "" {
		t.Fatalf("expected token in response")
	}
}
