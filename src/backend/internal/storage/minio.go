package storage

import (
	"context"
	"fmt"
	"io"
	"net/url"
	"strings"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioUploader struct {
	client        *minio.Client
	buckets       BucketConfig
	publicBaseURL string
	endpoint      string
	secure        bool
}

const (
	MediaTypeImages    = "images"
	MediaTypeDocuments = "documents"
	MediaTypeVideos    = "videos"
	MediaTypeAudio     = "audio"
)

type BucketConfig struct {
	Images    string
	Documents string
	Videos    string
	Audio     string
}

type UploadResult struct {
	Bucket    string `json:"bucket"`
	ObjectKey string `json:"objectKey"`
	URL       string `json:"url"`
}

func NewMinioUploader(endpoint, accessKey, secretKey string, buckets BucketConfig, secure bool, publicBaseURL string) (*MinioUploader, error) {
	if strings.TrimSpace(endpoint) == "" {
		return nil, fmt.Errorf("minio endpoint is required")
	}
	if strings.TrimSpace(accessKey) == "" || strings.TrimSpace(secretKey) == "" {
		return nil, fmt.Errorf("minio credentials are required")
	}
	buckets = normalizeBuckets(buckets)

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: secure,
	})
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	for _, bucket := range uniqueBuckets(buckets) {
		exists, err := client.BucketExists(ctx, bucket)
		if err != nil {
			return nil, err
		}
		if !exists {
			if err := client.MakeBucket(ctx, bucket, minio.MakeBucketOptions{}); err != nil {
				return nil, err
			}
		}
	}

	return &MinioUploader{
		client:        client,
		buckets:       buckets,
		publicBaseURL: strings.TrimSpace(publicBaseURL),
		endpoint:      endpoint,
		secure:        secure,
	}, nil
}

func (m *MinioUploader) Upload(ctx context.Context, mediaType, objectKey string, reader io.Reader, size int64, contentType string) (*UploadResult, error) {
	bucket, ok := bucketByMediaType(m.buckets, mediaType)
	if !ok {
		return nil, fmt.Errorf("unsupported media type: %s", mediaType)
	}

	_, err := m.client.PutObject(ctx, bucket, objectKey, reader, size, minio.PutObjectOptions{
		ContentType: contentType,
	})
	if err != nil {
		return nil, err
	}

	return &UploadResult{
		Bucket:    bucket,
		ObjectKey: objectKey,
		URL:       m.buildPublicURL(bucket, objectKey),
	}, nil
}

func (m *MinioUploader) buildPublicURL(bucket, objectKey string) string {
	if m.publicBaseURL != "" {
		return fmt.Sprintf("%s/%s/%s", strings.TrimRight(m.publicBaseURL, "/"), bucket, objectKey)
	}
	scheme := "http"
	if m.secure {
		scheme = "https"
	}
	endpoint := strings.TrimLeft(m.endpoint, "/")
	if strings.Contains(endpoint, "://") {
		if parsed, err := url.Parse(endpoint); err == nil && parsed.Host != "" {
			endpoint = parsed.Host
		}
	}
	return fmt.Sprintf("%s://%s/%s/%s", scheme, endpoint, bucket, objectKey)
}

func normalizeBuckets(buckets BucketConfig) BucketConfig {
	if strings.TrimSpace(buckets.Images) == "" {
		buckets.Images = "mouthouq-images"
	}
	if strings.TrimSpace(buckets.Documents) == "" {
		buckets.Documents = "mouthouq-documents"
	}
	if strings.TrimSpace(buckets.Videos) == "" {
		buckets.Videos = "mouthouq-videos"
	}
	if strings.TrimSpace(buckets.Audio) == "" {
		buckets.Audio = "mouthouq-audio"
	}
	return buckets
}

func uniqueBuckets(buckets BucketConfig) []string {
	seen := make(map[string]struct{})
	out := make([]string, 0, 4)
	for _, bucket := range []string{buckets.Images, buckets.Documents, buckets.Videos, buckets.Audio} {
		name := strings.TrimSpace(bucket)
		if name == "" {
			continue
		}
		if _, exists := seen[name]; exists {
			continue
		}
		seen[name] = struct{}{}
		out = append(out, name)
	}
	return out
}

func bucketByMediaType(buckets BucketConfig, mediaType string) (string, bool) {
	switch mediaType {
	case MediaTypeImages:
		return buckets.Images, true
	case MediaTypeDocuments:
		return buckets.Documents, true
	case MediaTypeVideos:
		return buckets.Videos, true
	case MediaTypeAudio:
		return buckets.Audio, true
	default:
		return "", false
	}
}
