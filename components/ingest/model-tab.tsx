"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Play, CheckCircle, AlertTriangle, TrendingUp, Target, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PredictionStep {
  name: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
}

export function ModelTab() {
  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState<PredictionStep[]>([
    { name: "Merging Data Sources", status: "pending", progress: 0 },
    { name: "Computing Risk Signals", status: "pending", progress: 0 },
    { name: "Calibrating Model Weights", status: "pending", progress: 0 },
  ])
  const [modelMetrics, setModelMetrics] = useState({
    precision: 0.85,
    recall: 0.78,
    f1Score: 0.81,
    accuracy: 0.83,
  })
  const { toast } = useToast()

  const riskDistribution = [
    { name: "Low Risk", value: 140, color: "#22c55e" },
    { name: "Medium Risk", value: 28, color: "#f59e0b" },
    { name: "High Risk", value: 12, color: "#ef4444" },
  ]

  const explainabilityData = [
    { factor: "Attendance", contribution: 35, color: "#3b82f6" },
    { factor: "Assessments", contribution: 35, color: "#8b5cf6" },
    { factor: "Fees", contribution: 15, color: "#f59e0b" },
    { factor: "Attempts", contribution: 15, color: "#ef4444" },
  ]

  const handleRunPrediction = async () => {
    setIsRunning(true)

    // Reset steps
    setSteps((prev) => prev.map((step) => ({ ...step, status: "pending", progress: 0 })))

    // Simulate step execution
    for (let i = 0; i < steps.length; i++) {
      // Start step
      setSteps((prev) => prev.map((step, index) => (index === i ? { ...step, status: "running" } : step)))

      // Progress simulation
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setSteps((prev) => prev.map((step, index) => (index === i ? { ...step, progress } : step)))
      }

      // Complete step
      setSteps((prev) =>
        prev.map((step, index) => (index === i ? { ...step, status: "completed", progress: 100 } : step)),
      )
    }

    setIsRunning(false)
    toast({
      title: "Prediction completed",
      description: "Risk scores have been updated for all students",
    })
  }

  const getStepIcon = (status: PredictionStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
    }
  }

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
          <Button onClick={handleRunPrediction} disabled={isRunning} size="lg" className="w-full">
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running Prediction..." : "Run Prediction"}
          </Button>

          {/* Progress Steps */}
          {(isRunning || steps.some((step) => step.status === "completed")) && (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStepIcon(step.status)}
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                    <Badge variant={step.status === "completed" ? "default" : "outline"}>
                      {step.status === "completed" ? "Done" : step.status === "running" ? "Running" : "Pending"}
                    </Badge>
                  </div>
                  {step.status === "running" && <Progress value={step.progress} className="h-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Model Performance
            </CardTitle>
            <CardDescription>Evaluation metrics against historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{(modelMetrics.precision * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Precision</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{(modelMetrics.recall * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Recall</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{(modelMetrics.f1Score * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">F1 Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{(modelMetrics.accuracy * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Current risk level breakdown across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Explainability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Model Explainability
          </CardTitle>
          <CardDescription>
            Factor contributions to risk predictions - transparency in AI decision making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={explainabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factor" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Contribution"]} />
                <Bar dataKey="contribution" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Sample Risk Explanation:</p>
                <p className="text-sm">
                  "Student STU001 flagged as high risk (Score: 85) because: Attendance dropped 25 points in 2 weeks to
                  45% (35% weight), Failed last 2 assessments with scores below baseline (35% weight), Fees overdue 45
                  days (15% weight), Multiple course attempts (15% weight)."
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
