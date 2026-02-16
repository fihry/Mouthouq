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
	bucket        string
	publicBaseURL string
	endpoint      string
	secure        bool
}

type UploadResult struct {
	ObjectKey string `json:"objectKey"`
	URL       string `json:"url"`
}

func NewMinioUploader(endpoint, accessKey, secretKey, bucket string, secure bool, publicBaseURL string) (*MinioUploader, error) {
	if strings.TrimSpace(endpoint) == "" {
		return nil, fmt.Errorf("minio endpoint is required")
	}
	if strings.TrimSpace(accessKey) == "" || strings.TrimSpace(secretKey) == "" {
		return nil, fmt.Errorf("minio credentials are required")
	}
	if strings.TrimSpace(bucket) == "" {
		bucket = "mouthouq"
	}

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: secure,
	})
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	exists, err := client.BucketExists(ctx, bucket)
	if err != nil {
		return nil, err
	}
	if !exists {
		if err := client.MakeBucket(ctx, bucket, minio.MakeBucketOptions{}); err != nil {
			return nil, err
		}
	}

	return &MinioUploader{
		client:        client,
		bucket:        bucket,
		publicBaseURL: strings.TrimSpace(publicBaseURL),
		endpoint:      endpoint,
		secure:        secure,
	}, nil
}

func (m *MinioUploader) Upload(ctx context.Context, objectKey string, reader io.Reader, size int64, contentType string) (*UploadResult, error) {
	_, err := m.client.PutObject(ctx, m.bucket, objectKey, reader, size, minio.PutObjectOptions{
		ContentType: contentType,
	})
	if err != nil {
		return nil, err
	}

	return &UploadResult{
		ObjectKey: objectKey,
		URL:       m.buildPublicURL(objectKey),
	}, nil
}

func (m *MinioUploader) buildPublicURL(objectKey string) string {
	if m.publicBaseURL != "" {
		return fmt.Sprintf("%s/%s/%s", strings.TrimRight(m.publicBaseURL, "/"), m.bucket, objectKey)
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
	return fmt.Sprintf("%s://%s/%s/%s", scheme, endpoint, m.bucket, objectKey)
}
