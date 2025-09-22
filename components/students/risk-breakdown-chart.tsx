"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { AlertTriangle } from "lucide-react"
import type { Student } from "@/lib/types"

interface RiskBreakdownChartProps {
  student: Student
}

export function RiskBreakdownChart({ student }: RiskBreakdownChartProps) {
  // Calculate risk contributions based on student data
  const riskBreakdown = [
    {
      name: "Attendance",
      value: 35,
      color: "#ef4444",
      description: `${student.attendancePercent}% attendance`,
    },
    {
      name: "Assessments",
      value: 35,
      color: "#f59e0b",
      description: `${student.avgScore}% average score`,
    },
    {
      name: "Fees",
      value: 15,
      color: "#8b5cf6",
      description: `${student.feeStatus} status`,
    },
    {
      name: "Attempts",
      value: 15,
      color: "#06b6d4",
      description: `${student.attemptsCount} attempts, ${student.backlogsCount} backlogs`,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Risk Breakdown
        </CardTitle>
        <CardDescription>
          Contribution of each factor to overall risk score ({student.compositeRiskScore})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Contribution"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {riskBreakdown.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">
                  {item.name} ({item.value}%)
                </div>
                <div className="text-xs text-muted-foreground truncate">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
