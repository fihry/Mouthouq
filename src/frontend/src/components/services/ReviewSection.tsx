"use client"

import { useState, useEffect } from "react"
import { Star, Brain, ShieldCheck, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function ReviewSection() {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [aiFeedback, setAiFeedback] = useState<{ isLowQuality: boolean; message: string; score: number } | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Real-time "AI" analysis simulation
    useEffect(() => {
        const analyze = async () => {
            if (comment.length < 5) {
                setAiFeedback(null)
                return
            }

            setIsAnalyzing(true)
            await new Promise(resolve => setTimeout(resolve, 800))

            if (comment.length < 15) {
                setAiFeedback({
                    isLowQuality: true,
                    message: "Our AI suggests adding more detail to help other users.",
                    score: 0.4
                })
            } else if (comment.toLowerCase().includes("best") || comment.toLowerCase().includes("amazing")) {
                setAiFeedback({
                    isLowQuality: false,
                    message: "Positive sentiment detected. AI Trust score is high.",
                    score: 0.9
                })
            } else {
                setAiFeedback({
                    isLowQuality: false,
                    message: "Review looks genuine and natural.",
                    score: 0.8
                })
            }
            setIsAnalyzing(false)
        }

        const timer = setTimeout(analyze, 500)
        return () => clearTimeout(timer)
    }, [comment])

    return (
        <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-orange-900 border-b border-orange-100 pb-4">Customer Reviews</h2>

            {/* Write Review Section */}
            <Card className="border-orange-100 shadow-sm bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <h3 className="font-semibold text-orange-950">Write a Review</h3>
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Verified
                        </Badge>
                    </div>

                    <div className="flex space-x-1 mb-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <button
                                key={s}
                                onClick={() => setRating(s)}
                                className="focus:outline-none transition-transform active:scale-95"
                            >
                                <Star
                                    className={`h-8 w-8 ${s <= rating ? "text-yellow-400 fill-current" : "text-gray-200"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about your experience..."
                            className="bg-white border-orange-100 focus:ring-orange-500 min-h-[120px] transition-all"
                        />
                        {isAnalyzing && (
                            <div className="absolute bottom-3 right-3 flex items-center text-xs text-orange-400 animate-pulse">
                                <Brain className="h-3 w-3 mr-1" />
                                AI is analyzing...
                            </div>
                        )}
                    </div>

                    {/* AI Feedback Display */}
                    {aiFeedback && (
                        <div className={`mt-4 p-3 rounded-lg flex items-start space-x-3 text-sm animate-fade-in ${aiFeedback.isLowQuality ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700"
                            }`}>
                            {aiFeedback.isLowQuality ? (
                                <AlertCircle className="h-5 w-5 shrink-0" />
                            ) : (
                                <ShieldCheck className="h-5 w-5 shrink-0" />
                            )}
                            <p>{aiFeedback.message}</p>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 h-11"
                            disabled={rating === 0 || comment.length < 10}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Post AI-Verified Review
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Review List Mock */}
            <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            AI Verified
                        </Badge>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">YK</div>
                        <div>
                            <div className="font-bold text-orange-950">Youssef K.</div>
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />)}
                            </div>
                        </div>
                    </div>
                    <p className="text-orange-900 leading-relaxed">Excellent service! The AC repair was quick and the technician was very professional. Highly recommend Mouthouq for finding reliable people.</p>
                    <div className="mt-4 text-xs text-orange-400">Posted 2 days ago</div>
                </div>
            </div>
        </div>
    )
}
