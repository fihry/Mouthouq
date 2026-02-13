package services

import (
	"math/rand"
	"strings"
	"time"
)

type AIService struct{}

func NewAIService() *AIService {
	return &AIService{}
}

// AnalyzeReview simulates an AI analysis of a review comment to detect fake or fraudulent content.
// In a real implementation, this would call an external AI API (like Gemini or OpenAI).
func (s *AIService) AnalyzeReview(comment string) (isFake bool, confidence float64, feedback string) {
	// Seed for mock variability
	rand.Seed(time.Now().UnixNano())

	commentLower := strings.ToLower(comment)

	// Rule 1: Very short comments are suspicious
	if len(comment) < 10 {
		return true, 0.85, "Review is too short to be meaningful."
	}

	// Rule 2: Detecting common "fake" patterns or excessive spammy keywords
	spamKeywords := []string{"best ever", "click here", "amazing prize", "cheap services", "guaranteed"}
	for _, word := range spamKeywords {
		if strings.Contains(commentLower, word) {
			return true, 0.75, "Found suspicious promotional language."
		}
	}

	// Rule 3: Random mock check for "AI Match" feel
	// If the comment is long and doesn't contain spam, it's likely verified.
	if len(comment) > 50 {
		return false, 0.95, "Detailed and relevant feedback detected."
	}

	// Default: 20% chance of being flagged for manual review in this mock
	if rand.Intn(100) < 20 {
		return true, 0.60, "Potential pattern matching generic fake reviews."
	}

	return false, 0.90, "Review appears genuine based on content analysis."
}

// AnalyzeService analyzes a service listing to provide a trust score and verification status.
func (s *AIService) AnalyzeService(title, description string) (score float64, isVerified bool, tags []string) {
	rand.Seed(time.Now().UnixNano())

	score = 0.5 // Default base score
	tags = []string{}

	// Basic quality checks
	if len(title) > 10 {
		score += 0.1
	}
	if len(description) > 50 {
		score += 0.2
	}

	// Keyword-based tag generation (Mock AI logic)
	descriptionLower := strings.ToLower(description)
	if strings.Contains(descriptionLower, "eco") || strings.Contains(descriptionLower, "green") {
		tags = append(tags, "Eco-Friendly")
		score += 0.05
	}
	if strings.Contains(descriptionLower, "insured") || strings.Contains(descriptionLower, "guaranteed") {
		tags = append(tags, "Insured")
		score += 0.05
	}
	if strings.Contains(descriptionLower, "same day") || strings.Contains(descriptionLower, "emergency") {
		tags = append(tags, "Fast Response")
		score += 0.05
	}

	// Verification logic (Simulated AI trust threshold)
	if score >= 0.75 {
		isVerified = true
	}

	// Final clamping
	if score > 1.0 {
		score = 1.0
	}

	return score, isVerified, tags
}
