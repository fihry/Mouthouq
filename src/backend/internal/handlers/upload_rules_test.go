package handlers

import (
	"testing"

	"mouthouq/internal/storage"
)

func TestUploadRulesMapToExpectedMediaType(t *testing.T) {
	tests := []struct {
		purpose   string
		mediaType string
	}{
		{purpose: "service-image", mediaType: storage.MediaTypeImages},
		{purpose: "profile-image", mediaType: storage.MediaTypeImages},
		{purpose: "provider-doc", mediaType: storage.MediaTypeDocuments},
		{purpose: "service-video", mediaType: storage.MediaTypeVideos},
		{purpose: "service-audio", mediaType: storage.MediaTypeAudio},
	}

	for _, tc := range tests {
		t.Run(tc.purpose, func(t *testing.T) {
			rule, ok := uploadRules[tc.purpose]
			if !ok {
				t.Fatalf("missing upload rule for %s", tc.purpose)
			}
			if rule.mediaType != tc.mediaType {
				t.Fatalf("expected media type %s, got %s", tc.mediaType, rule.mediaType)
			}
		})
	}
}

func TestIsAllowedFile(t *testing.T) {
	tests := []struct {
		name        string
		purpose     string
		contentType string
		ext         string
		wantAllowed bool
	}{
		{
			name:        "allows jpeg image for service image",
			purpose:     "service-image",
			contentType: "image/jpeg",
			ext:         ".jpg",
			wantAllowed: true,
		},
		{
			name:        "allows jpeg with parameters",
			purpose:     "service-image",
			contentType: "image/jpeg; charset=binary",
			ext:         ".jpeg",
			wantAllowed: true,
		},
		{
			name:        "rejects mismatched extension",
			purpose:     "service-image",
			contentType: "image/jpeg",
			ext:         ".png",
			wantAllowed: false,
		},
		{
			name:        "rejects executable extension",
			purpose:     "service-image",
			contentType: "image/jpeg",
			ext:         ".exe",
			wantAllowed: false,
		},
		{
			name:        "rejects missing extension",
			purpose:     "provider-doc",
			contentType: "application/pdf",
			ext:         "",
			wantAllowed: false,
		},
		{
			name:        "allows provider pdf",
			purpose:     "provider-doc",
			contentType: "application/pdf",
			ext:         ".pdf",
			wantAllowed: true,
		},
		{
			name:        "rejects unsupported document mime",
			purpose:     "provider-doc",
			contentType: "text/plain",
			ext:         ".txt",
			wantAllowed: false,
		},
		{
			name:        "allows mp4 video",
			purpose:     "service-video",
			contentType: "video/mp4",
			ext:         ".mp4",
			wantAllowed: true,
		},
		{
			name:        "rejects wrong video extension",
			purpose:     "service-video",
			contentType: "video/mp4",
			ext:         ".avi",
			wantAllowed: false,
		},
		{
			name:        "allows mp3 audio",
			purpose:     "service-audio",
			contentType: "audio/mpeg",
			ext:         ".mp3",
			wantAllowed: true,
		},
		{
			name:        "allows wav alias mime",
			purpose:     "service-audio",
			contentType: "audio/wave",
			ext:         ".wav",
			wantAllowed: true,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			rule := uploadRules[tc.purpose]
			got := isAllowedFile(rule, tc.contentType, tc.ext)
			if got != tc.wantAllowed {
				t.Fatalf("expected allowed=%v, got %v", tc.wantAllowed, got)
			}
		})
	}
}
