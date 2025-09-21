"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { GraduationCap, TrendingDown } from "lucide-react"

interface SubjectScoresChartProps {
  studentId: string
}

export function SubjectScoresChart({ studentId }: SubjectScoresChartProps) {
  // Mock subject scores data
  const subjectData = [
    { subject: "Mathematics", current: 52, previous: 68, decline: true },
    { subject: "Physics", current: 58, previous: 62, decline: true },
    { subject: "Chemistry", current: 45, previous: 72, decline: true },
    { subject: "Programming", current: 48, previous: 55, decline: true },
    { subject: "English", current: 65, previous: 68, decline: true },
    { subject: "Electronics", current: 42, previous: 58, decline: true },
  ]

  const decliningSubjects = subjectData.filter((s) => s.decline).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Subject Scores
        </CardTitle>
        <CardDescription>
          Current vs previous assessment scores
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-sm text-red-600">
              <TrendingDown className="h-3 w-3" />
              {decliningSubjects} subjects showing decline
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value, name) => [`${value}%`, name === "current" ? "Current" : "Previous"]} />
              <Bar dataKey="previous" fill="#94a3b8" name="previous" />
              <Bar dataKey="current" fill="#ef4444" name="current" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
