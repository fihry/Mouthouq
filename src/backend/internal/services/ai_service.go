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
