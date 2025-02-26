package config

import (
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v3"
)

// Config struct
type Config struct {
	// Server struct
	Server struct {
		// Port
		Port string `yaml:"port"`
	} `yaml:"server"`
	// Database struct
	Database struct {
		// Host
		Host string `yaml:"host"`
		// Port
		Port string `yaml:"port"`
		// User
		User string `yaml:"user"`
		// Password
		Password string `yaml:"password"`
		// Name
		Name string `yaml:"name"`
	} `yaml:"database"`

	// JWT struct
	JWT struct {
		// Secret
		Secret string `yaml:"secret"`
	} `yaml:"jwt"`

	// CORS struct
	CORS struct {
		// AllowedOrigins
		AllowedOrigins []string `yaml:"allowedOrigins"`
		// AllowedMethods
		AllowedMethods []string `yaml:"allowedMethods"`
		// AllowedHeaders
		AllowedHeaders []string `yaml:"allowedHeaders"`
		// ExposedHeaders
	} `yaml:"cors"`
}

// LoadConfig function
func LoadConfig() Config {
	// Read config file
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Fatalf("yamlFile.Get err   #%v ", err)
	}
	// Parse yaml
	var config Config
	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}
	return config
}