package storage

import "testing"

func TestNormalizeBucketsAppliesDefaults(t *testing.T) {
	got := normalizeBuckets(BucketConfig{})

	if got.Images != "mouthouq-images" {
		t.Fatalf("unexpected images bucket: %s", got.Images)
	}
	if got.Documents != "mouthouq-documents" {
		t.Fatalf("unexpected documents bucket: %s", got.Documents)
	}
	if got.Videos != "mouthouq-videos" {
		t.Fatalf("unexpected videos bucket: %s", got.Videos)
	}
	if got.Audio != "mouthouq-audio" {
		t.Fatalf("unexpected audio bucket: %s", got.Audio)
	}
}

func TestUniqueBucketsDeduplicates(t *testing.T) {
	got := uniqueBuckets(BucketConfig{
		Images:    "assets",
		Documents: "assets",
		Videos:    "media",
		Audio:     "media",
	})

	if len(got) != 2 {
		t.Fatalf("expected 2 buckets, got %d", len(got))
	}
}

func TestBucketByMediaType(t *testing.T) {
	cfg := BucketConfig{
		Images:    "img",
		Documents: "doc",
		Videos:    "vid",
		Audio:     "aud",
	}

	tests := []struct {
		mediaType string
		want      string
		ok        bool
	}{
		{mediaType: MediaTypeImages, want: "img", ok: true},
		{mediaType: MediaTypeDocuments, want: "doc", ok: true},
		{mediaType: MediaTypeVideos, want: "vid", ok: true},
		{mediaType: MediaTypeAudio, want: "aud", ok: true},
		{mediaType: "other", want: "", ok: false},
	}

	for _, tc := range tests {
		got, ok := bucketByMediaType(cfg, tc.mediaType)
		if ok != tc.ok {
			t.Fatalf("mediaType=%s expected ok=%v, got %v", tc.mediaType, tc.ok, ok)
		}
		if got != tc.want {
			t.Fatalf("mediaType=%s expected bucket=%s, got %s", tc.mediaType, tc.want, got)
		}
	}
}

func TestBuildPublicURL(t *testing.T) {
	uploader := &MinioUploader{
		publicBaseURL: "https://cdn.example.com",
	}
	url := uploader.buildPublicURL("img", "uploads/file.jpg")
	if url != "https://cdn.example.com/img/uploads/file.jpg" {
		t.Fatalf("unexpected public URL: %s", url)
	}

	uploader = &MinioUploader{
		endpoint: "http://localhost:9000",
		secure:   true,
	}
	url = uploader.buildPublicURL("img", "uploads/file.jpg")
	if url != "https://localhost:9000/img/uploads/file.jpg" {
		t.Fatalf("unexpected endpoint URL: %s", url)
	}
}
