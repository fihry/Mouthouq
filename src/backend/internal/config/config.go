package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"gopkg.in/yaml.v3"
)

type Config struct {
	Server struct {
		Port string `yaml:"port"`
	} `yaml:"server"`

	Database struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		Name     string `yaml:"name"`
	} `yaml:"database"`

	MinIO struct {
		Endpoint  string `yaml:"endpoint"`
		AccessKey string `yaml:"accessKey"`
		SecretKey string `yaml:"secretKey"`
		UseSSL    bool   `yaml:"useSSL"`
	} `yaml:"minio"`
}

func LoadConfig() (*Config, error) {
	// Load .env file (don't error if file doesn't exist)
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: .env file not found")
	}

	// Get config file path
	configPath := filepath.Join("internal", "config", "config.yaml")

	// Read YAML config
	yamlFile, err := os.ReadFile(configPath)
	if err != nil {
		return nil, fmt.Errorf("error reading config file: %w", err)
	}

	var cfg Config
	if err := yaml.Unmarshal(yamlFile, &cfg); err != nil {
		return nil, fmt.Errorf("error parsing config file: %w", err)
	}

	// Override with environment variables
	if envPort := os.Getenv("SERVER_PORT"); envPort != "" {
		cfg.Server.Port = envPort
	} else {
		// Default port if not set
		cfg.Server.Port = "8080"
	}

	return &cfg, nil
}
