"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Play, CheckCircle, AlertTriangle, Zap } from "lucide-react"

interface PredictionResult {
  id: string
  RISKLevel: string
  Reasons: string[]
}

export function ModelTab() {
  const [results, setResults] = useState<PredictionResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const fetchPredictions = async () => {
    setIsRunning(true)
    const response = await fetch("http://127.0.0.1:8000/predict-all", { method: "POST" })
    const data = await response.json()
    setResults(data.results)
    setIsRunning(false)
  }

  // Compute risk distribution
  const riskDistribution = [
    { name: "Low Risk", value: results.filter(r => r.RISKLevel === "Low Risk").length, color: "#22c55e" },
    { name: "Medium Risk", value: results.filter(r => r.RISKLevel === "Medium Risk").length, color: "#f59e0b" },
    { name: "High Risk", value: results.filter(r => r.RISKLevel === "High Risk").length, color: "#ef4444" },
    { name: "No Risk", value: results.filter(r => r.RISKLevel === "No Risk").length, color: "#3b82f6" },
  ]

  // Compute explainability (signals)
  const reasonCounts: Record<string, number> = {}
  results.forEach(r => {
    r.Reasons.forEach(reason => {
      if (reason !== "None") {
        reasonCounts[reason] = (reasonCounts[reason] || 0) + 1
      }
    })
  })

  const explainabilityData = Object.entries(reasonCounts).map(([factor, count]) => ({
    factor,
    contribution: count,
  }))

  return (
    <div className="space-y-6">
      {/* Run Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Risk Prediction Model
          </CardTitle>
          <CardDescription>
            Run the AI model to compute risk scores and generate explainable predictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={fetchPredictions} disabled={isRunning} size="lg" className="w-full">
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running Prediction..." : "Run Prediction"}
          </Button>
        </CardContent>
      </Card>

      {/* Charts */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Proportion of students by risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Signals</CardTitle>
              <CardDescription>Most common reasons contributing to risk</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={explainabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="contribution" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
